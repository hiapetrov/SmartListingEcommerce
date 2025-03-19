import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Generic type for database entities
interface Entity {
  id: string;
  [key: string]: any;
}

export class JsonStorage<T extends Entity> {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(process.cwd(), 'data', fileName);
    this.ensureFileExists();
  }

  private ensureFileExists(): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '[]', 'utf8');
    }
  }

  private read(): T[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading from ${this.filePath}:`, error);
      return [];
    }
  }

  private write(data: T[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error(`Error writing to ${this.filePath}:`, error);
    }
  }

  getAll(): T[] {
    return this.read();
  }

  getById(id: string): T | null {
    const items = this.read();
    return items.find(item => item.id === id) || null;
  }

  create(item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
    const items = this.read();
    const now = new Date().toISOString();
    
    const newItem = {
      ...item,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    } as T;
    
    items.push(newItem);
    this.write(items);
    
    return newItem;
  }

  update(id: string, updates: Partial<T>): T | null {
    const items = this.read();
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    const updatedItem = {
      ...items[index],
      ...updates,
      id, // Ensure ID can't be changed
      updatedAt: new Date().toISOString(),
    };
    
    items[index] = updatedItem;
    this.write(items);
    
    return updatedItem;
  }

  delete(id: string): boolean {
    const items = this.read();
    const initialLength = items.length;
    
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length < initialLength) {
      this.write(filteredItems);
      return true;
    }
    
    return false;
  }

  search(query: Partial<T>): T[] {
    const items = this.read();
    
    return items.filter(item => {
      for (const [key, value] of Object.entries(query)) {
        if (item[key] !== value) {
          return false;
        }
      }
      return true;
    });
  }
}
