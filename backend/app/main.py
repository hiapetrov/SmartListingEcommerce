from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth import router as auth_router
from app.api.products import router as products_router
from app.api.optimizations import router as optimizations_router
from app.api.publishing import router as publishing_router

app = FastAPI(
    title="AI Listing Optimizer API",
    description="API for optimizing product listings across multiple e-commerce platforms",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with actual frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(products_router.router, prefix="/api/products", tags=["Products"])
app.include_router(optimizations_router.router, prefix="/api/optimizations", tags=["Optimizations"])
app.include_router(publishing_router.router, prefix="/api/publishing", tags=["Publishing"])

@app.get("/", tags=["Root"])
async def root():
    return {"message": "Welcome to AI Listing Optimizer API"}
