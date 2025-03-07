from typing import List, Optional, Dict, Any
import json
from sqlalchemy.orm import Session
from backend.db.models import MarketplaceListing
from pydantic import BaseModel

class MarketplaceListingCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float = 0.0
    author: str
    capabilities: List[str] = []

class MarketplaceListingResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    author: str
    capabilities: List[str]
    rating: float
    downloads: int
    created_at: str
    updated_at: str

class MarketplaceService:
    def get_listings(self, db: Session) -> List[Dict[str, Any]]:
        """Get all marketplace listings"""
        listings = db.query(MarketplaceListing).all()
        return [self._format_listing(listing) for listing in listings]
    
    def get_listing(self, db: Session, listing_id: int) -> Optional[Dict[str, Any]]:
        """Get a specific marketplace listing by ID"""
        listing = db.query(MarketplaceListing).filter(MarketplaceListing.id == listing_id).first()
        if not listing:
            return None
        return self._format_listing(listing)
    
    def create_listing(self, db: Session, listing_data: MarketplaceListingCreate) -> Dict[str, Any]:
        """Create a new marketplace listing"""
        # Convert capabilities list to JSON string
        data_dict = listing_data.dict()
        data_dict["capabilities"] = json.dumps(data_dict["capabilities"])
        
        # Create new listing
        db_listing = MarketplaceListing(**data_dict)
        db.add(db_listing)
        db.commit()
        db.refresh(db_listing)
        
        return self._format_listing(db_listing)
    
    def update_listing(self, db: Session, listing_id: int, listing_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update an existing marketplace listing"""
        listing = db.query(MarketplaceListing).filter(MarketplaceListing.id == listing_id).first()
        if not listing:
            return None
            
        # Handle capabilities specially
        if "capabilities" in listing_data:
            listing_data["capabilities"] = json.dumps(listing_data["capabilities"])
            
        # Update fields
        for key, value in listing_data.items():
            setattr(listing, key, value)
            
        db.commit()
        db.refresh(listing)
        return self._format_listing(listing)
    
    def delete_listing(self, db: Session, listing_id: int) -> bool:
        """Delete a marketplace listing"""
        listing = db.query(MarketplaceListing).filter(MarketplaceListing.id == listing_id).first()
        if not listing:
            return False
            
        db.delete(listing)
        db.commit()
        return True
    
    def install_agent(self, db: Session, listing_id: int) -> bool:
        """Install a marketplace agent (convert to user's agent)"""
        listing = db.query(MarketplaceListing).filter(MarketplaceListing.id == listing_id).first()
        if not listing:
            return False
            
        # Increment download count
        listing.downloads += 1
        db.commit()
        
        # In a real implementation, we would create a new agent based on this listing
        # and associate it with the current user
        return True
    
    def _format_listing(self, listing: MarketplaceListing) -> Dict[str, Any]:
        """Format a listing model for API response"""
        return {
            "id": listing.id,
            "name": listing.name,
            "description": listing.description,
            "price": listing.price,
            "author": listing.author,
            "capabilities": json.loads(listing.capabilities) if listing.capabilities else [],
            "rating": listing.rating,
            "downloads": listing.downloads,
            "created_at": listing.created_at.isoformat(),
            "updated_at": listing.updated_at.isoformat()
        }

# Create service instance
marketplace_service = MarketplaceService()
