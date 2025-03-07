from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any
from sqlalchemy.orm import Session

from backend.db.models import get_db
from backend.services.marketplace_service import marketplace_service, MarketplaceListingCreate

# Create router
router = APIRouter(prefix="/marketplace", tags=["marketplace"])

@router.get("/listings", response_model=List[Dict[str, Any]])
def get_all_listings(db: Session = Depends(get_db)):
    """Get all marketplace listings"""
    return marketplace_service.get_listings(db)

@router.get("/listings/{listing_id}", response_model=Dict[str, Any])
def get_listing(listing_id: int, db: Session = Depends(get_db)):
    """Get a specific marketplace listing by ID"""
    listing = marketplace_service.get_listing(db, listing_id)
    if not listing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Marketplace listing with id {listing_id} not found"
        )
    return listing

@router.post("/listings", response_model=Dict[str, Any], status_code=status.HTTP_201_CREATED)
def create_listing(listing_data: MarketplaceListingCreate, db: Session = Depends(get_db)):
    """Create a new marketplace listing"""
    try:
        return marketplace_service.create_listing(db, listing_data)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create listing: {str(e)}"
        )

@router.put("/listings/{listing_id}", response_model=Dict[str, Any])
def update_listing(listing_id: int, listing_data: Dict[str, Any], db: Session = Depends(get_db)):
    """Update a marketplace listing"""
    updated_listing = marketplace_service.update_listing(db, listing_id, listing_data)
    if not updated_listing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Marketplace listing with id {listing_id} not found"
        )
    return updated_listing

@router.delete("/listings/{listing_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_listing(listing_id: int, db: Session = Depends(get_db)):
    """Delete a marketplace listing"""
    success = marketplace_service.delete_listing(db, listing_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Marketplace listing with id {listing_id} not found"
        )
    return None

@router.post("/listings/{listing_id}/install", status_code=status.HTTP_200_OK)
def install_agent(listing_id: int, db: Session = Depends(get_db)):
    """Install an agent from the marketplace"""
    success = marketplace_service.install_agent(db, listing_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Failed to install agent from listing {listing_id}"
        )
    return {"success": True, "message": "Agent successfully installed"}
