export interface MarketplaceListing {
  id: number;
  name: string;
  description: string;
  price: number;
  author: string;
  capabilities: string[];
  rating: number;
  downloads: number;
  created_at: string;
  updated_at: string;
}

export interface CreateMarketplaceListingDto {
  name: string;
  description?: string;
  price?: number;
  author: string;
  capabilities?: string[];
}
