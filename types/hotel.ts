export interface Hotel {
  mainImage: string;
  url: string;
  id: number;
  name: string;
  stars: number;
  type: { id: number; name: string };
  address: string;
  zipCode: string;
  city: { id: number; name: string; countryId: number };
  country: { id: number; name: string; iso: string };
  geolocation: { latitude: string; longitude: string };
  recommended: boolean;
  specialDeal: boolean;
  rateTags: [];
  minPrice: { value: number; currency: string };
  boardBasis: [{ code: string; price: { value: number; currency: string } }];
  cancelaition_policy: [
    { code: string; price: { value: number; currency: string } }
  ];
}
export interface Filter {
  excludeNonRefundable?: number;
  page?: number;
  perPage?: number;
  hotelCategoryIds?: string;
  hotelTypeIds?: string;
  hotelFacilityIds?: string;
  boardBasis?: [];
  hotelName?: string;
  sort?: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
  geofence?: {
    latitude?: number;
    longitude?: number;
    radius?: number;
  };
  stars?: [];
}
export interface Meta {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}
