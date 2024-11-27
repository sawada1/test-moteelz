export interface WalletCategoryResponse {
  data: Category[];
  links: PaginationLink[];
  meta: PaginationMeta;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  wallets: WalletData;
}

export  interface WalletResponse {
  data: WalletData;
}

export interface WalletData {
  id: number;
  wallet_category_id: number;
  name: string;
  order: number;
  days: number;
  available_days: number;
  numbers_of_days: string[];
  periodInMonth: number;
  price: number;
  min_unit_price: number;
  max_unit_price: number;
  currency: string;
  tax_percent: number;
  active: boolean;
  type: number;
  description: string;
  wallet_image: string;
  hotel_stars: number | null;
  wallet_category: WalletCategory;
  features_favorites: Feature[];
  Wallet_features: Feature[];
  Wallet_policies: Policy[];
  countries: Country[];
  cities: City[];
  hotels: Hotel[];
}

interface WalletCategory {
  id: number;
  name: string;
  icon: string;
}

export interface Feature {
  id: number;
  name: string;
}

export interface Policy {
  id: number;
  name: string;
}

export interface Country {
  apiId: number;
  name: string;
  iso: string;
}

interface City {
  apiId: number;
  name: string;
  code: string;
}

export interface Hotel {
  // Assuming a hotel structure; empty since no data was provided.
}


export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationMeta {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface SliderResponse {
  data: Slider[];
}

export interface Slider {
  id: number;
  title: string;
  order: number;
  slider_image: string;
  slider_mobile_image: string;
}
