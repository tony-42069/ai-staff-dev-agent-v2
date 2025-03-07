import { useState, useEffect, useCallback } from 'react';
import marketplaceService from '../services/marketplace';
import { MarketplaceListing, CreateMarketplaceListingDto } from '../types/Marketplace';

export function useMarketplace() {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all marketplace listings
  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await marketplaceService.getListings();
      setListings(data);
    } catch (err) {
      console.error('Error fetching marketplace listings:', err);
      setError('Failed to fetch marketplace listings');
    } finally {
      setLoading(false);
    }
  }, []);

  // Get a specific listing by ID
  const getListing = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const listing = await marketplaceService.getListing(id);
      return listing;
    } catch (err) {
      console.error(`Error fetching listing ${id}:`, err);
      setError(`Failed to fetch listing ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new marketplace listing
  const createListing = useCallback(async (listing: CreateMarketplaceListingDto) => {
    setLoading(true);
    setError(null);
    try {
      const newListing = await marketplaceService.createListing(listing);
      setListings(prev => [...prev, newListing]);
      return newListing;
    } catch (err) {
      console.error('Error creating listing:', err);
      setError('Failed to create marketplace listing');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an existing marketplace listing
  const updateListing = useCallback(async (id: number, listing: Partial<CreateMarketplaceListingDto>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedListing = await marketplaceService.updateListing(id, listing);
      setListings(prev => prev.map(item => item.id === id ? updatedListing : item));
      return updatedListing;
    } catch (err) {
      console.error(`Error updating listing ${id}:`, err);
      setError(`Failed to update listing ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a marketplace listing
  const deleteListing = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await marketplaceService.deleteListing(id);
      setListings(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (err) {
      console.error(`Error deleting listing ${id}:`, err);
      setError(`Failed to delete listing ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Install an agent from the marketplace
  const installAgent = useCallback(async (listingId: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await marketplaceService.installAgent(listingId);
      
      // Update the downloads count in our local state
      if (result.success) {
        setListings(prev => 
          prev.map(item => 
            item.id === listingId 
              ? { ...item, downloads: item.downloads + 1 } 
              : item
          )
        );
      }
      
      return result;
    } catch (err) {
      console.error(`Error installing agent from listing ${listingId}:`, err);
      setError(`Failed to install agent from listing ${listingId}`);
      return { success: false, message: 'Installation failed' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch listings on component mount
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return {
    listings,
    loading,
    error,
    fetchListings,
    getListing,
    createListing,
    updateListing,
    deleteListing,
    installAgent
  };
}

export default useMarketplace;
