import json
import os
import uuid
from typing import Dict, List, Optional, TypeVar, Generic, Type
from pydantic import BaseModel
from datetime import datetime
import fcntl  # File locking to prevent race conditions

T = TypeVar('T', bound=BaseModel)

class JsonStorage(Generic[T]):
    """JSON file-based storage system with CRUD operations"""
    
    def __init__(self, file_path: str, model_class: Type[T]):
        self.file_path = file_path
        self.model_class = model_class
        self._ensure_file_exists()
    
    def _ensure_file_exists(self):
        os.makedirs(os.path.dirname(self.file_path), exist_ok=True)
        if not os.path.exists(self.file_path):
            with open(self.file_path, 'w') as f:
                json.dump([], f)
    
    def create(self, item: T) -> T:
        """Create new item with auto-generated ID and timestamps"""
        data = []
        
        with open(self.file_path, 'r+') as f:
            # Lock file to prevent race conditions
            fcntl.flock(f, fcntl.LOCK_EX)
            
            try:
                data = json.load(f)
                
                # Convert item to dict and add metadata
                item_dict = item.dict()
                item_dict["id"] = str(uuid.uuid4())
                item_dict["created_at"] = datetime.now().isoformat()
                item_dict["updated_at"] = item_dict["created_at"]
                
                # Add to data
                data.append(item_dict)
                
                # Write back to file
                f.seek(0)
                f.truncate()
                json.dump(data, f, indent=2)
                
                # Return created item
                return self.model_class(**item_dict)
            
            finally:
                # Release lock
                fcntl.flock(f, fcntl.LOCK_UN)
    
    def get_all(self) -> List[T]:
        """Retrieve all items"""
        with open(self.file_path, 'r') as f:
            fcntl.flock(f, fcntl.LOCK_SH)
            try:
                data = json.load(f)
                return [self.model_class(**item) for item in data]
            finally:
                fcntl.flock(f, fcntl.LOCK_UN)
    
    def get_by_id(self, item_id: str) -> Optional[T]:
        """Get item by ID"""
        with open(self.file_path, 'r') as f:
            fcntl.flock(f, fcntl.LOCK_SH)
            try:
                data = json.load(f)
                for item in data:
                    if item.get("id") == item_id:
                        return self.model_class(**item)
                return None
            finally:
                fcntl.flock(f, fcntl.LOCK_UN)
    
    def update(self, item_id: str, item: T) -> Optional[T]:
        """Update existing item"""
        with open(self.file_path, 'r+') as f:
            fcntl.flock(f, fcntl.LOCK_EX)
            try:
                data = json.load(f)
                
                for i, existing_item in enumerate(data):
                    if existing_item.get("id") == item_id:
                        # Update the item
                        item_dict = item.dict(exclude={"id", "created_at"})
                        item_dict["id"] = item_id
                        item_dict["created_at"] = existing_item["created_at"]
                        item_dict["updated_at"] = datetime.now().isoformat()
                        
                        data[i] = item_dict
                        
                        # Write back to file
                        f.seek(0)
                        f.truncate()
                        json.dump(data, f, indent=2)
                        
                        return self.model_class(**item_dict)
                
                return None
            finally:
                fcntl.flock(f, fcntl.LOCK_UN)
    
    def delete(self, item_id: str) -> bool:
        """Delete item by ID"""
        with open(self.file_path, 'r+') as f:
            fcntl.flock(f, fcntl.LOCK_EX)
            try:
                data = json.load(f)
                initial_length = len(data)
                
                data = [item for item in data if item.get("id") != item_id]
                
                if len(data) < initial_length:
                    # Item was found and removed
                    f.seek(0)
                    f.truncate()
                    json.dump(data, f, indent=2)
                    return True
                
                return False
            finally:
                fcntl.flock(f, fcntl.LOCK_UN)
    
    def search(self, query: Dict) -> List[T]:
        """Search items by query parameters"""
        with open(self.file_path, 'r') as f:
            fcntl.flock(f, fcntl.LOCK_SH)
            try:
                data = json.load(f)
                results = []
                
                for item in data:
                    match = True
                    for key, value in query.items():
                        if key not in item or item[key] != value:
                            match = False
                            break
                    
                    if match:
                        results.append(self.model_class(**item))
                
                return results
            finally:
                fcntl.flock(f, fcntl.LOCK_UN)
