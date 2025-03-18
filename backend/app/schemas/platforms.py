from pydantic import BaseModel

class ShopifyCredentials(BaseModel):
    shop_name: str
    access_token: str

class EtsyCredentials(BaseModel):
    shop_id: str
    access_token: str

class AmazonCredentials(BaseModel):
    seller_id: str
    access_token: str

class PlatformCredentials(BaseModel):
    platform: str
    credentials: dict
