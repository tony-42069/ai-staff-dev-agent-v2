import api from './api';
import { MarketplaceListing, CreateMarketplaceListingDto } from '../types/Marketplace';

class MarketplaceService {
  async getListings(): Promise<MarketplaceListing[]> {
    const response = await api.get('/marketplace/listings');
    return response.data;
  }

  async getListing(id: number): Promise<MarketplaceListing> {
    const response = await api.get(`/marketplace/listings/${id}`);
    return response.data;
  }

  async createListing(listing: CreateMarketplaceListingDto): Promise<MarketplaceListing> {
    const response = await api.post('/marketplace/listings', listing);
    return response.data;
  }

  async updateListing(id: number, listing: Partial<CreateMarketplaceListingDto>): Promise<MarketplaceListing> {
    const response = await api.put(`/marketplace/listings/${id}`, listing);
    return response.data;
  }

  async deleteListing(id: number): Promise<void> {
    await api.delete(`/marketplace/listings/${id}`);
  }

  async installAgent(listingId: number): Promise<{ success: boolean; message: string }> {
    const response = await api.post(`/marketplace/listings/${listingId}/install`);
    return response.data;
  }
}

export default new MarketplaceService();
