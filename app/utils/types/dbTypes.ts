export interface ListingType {
  id: string;
  name: string;
  description: string;
  shortDescription?: string | null;
  longDescription?: string | null;
  subdirectory: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string | null;
  userId?: string | null;
  sellerId?: string | null;
  businessModel: string;
  scale?: string | null;
  maturity: string;
  location: string;
  foundedDate?: Date | null;
  numEmployees?: number | null;
  competitors: string[];
  growthOpportunities: string[];
  assets: string[];
  sellingReason?: string | null;
  financing?: string | null;
  price?: number | null;
  profitMultiple?: number | null;
  revenueMultiple?: number | null;
  trailing12MonthProfit?: number | null;
  trailing12MonthRevenue?: number | null;
  lastMonthRevenue?: number | null;
  lastMonthProfit?: number | null;
  Seller?: SellerType | null;
  User?: UserType | null;
  posts: PostType[];
  BuyerListingPreference: BuyerListingPreferenceType[];
}

interface UserType {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  createdAt: Date;
  onboardingCompleted: boolean;
  buyerProfile?: BuyerType;
  sellerProfile?: SellerType;
  listings: ListingType[];
  posts: PostType[];
}

interface BuyerType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  onboardingStep: string;
  onboardingSkipped: boolean;
  user: UserType;
  inquiries: InquiryType[];
  listingPreferences: BuyerListingPreferenceType[];
  scale?: string;
  maturity?: string;
  businessModel?: string;
  location?: string;
  minPriceRange?: number;
  maxPriceRange?: number;
  minProfitMultiple?: number;
  maxProfitMultiple?: number;
  minRevenueMultiple?: number;
  maxRevenueMultiple?: number;
  minTrailing12MonthProfit?: number;
  maxTrailing12MonthProfit?: number;
  minTrailing12MonthRevenue?: number;
  maxTrailing12MonthRevenue?: number;
}

interface BuyerListingPreferenceType {
  id: string;
  buyerId: string;
  listingId: string;
  status: PreferenceStatusType;
  buyer: BuyerType;
  listing: ListingType;
}

enum PreferenceStatusType {
  LIKED = "LIKED",
  HIDDEN = "HIDDEN",
}

interface SellerType {
  id: string;
  companyName: string;
  phoneNumber: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  inquiries: InquiryType[];
  listings: ListingType[];
  user: UserType;
}

interface InquiryType {
  id: string;
  message: string;
  status: string; // Consider using an enum for status if you have predefined values
  createdAt: Date;
  updatedAt: Date;
  buyerId: string;
  sellerId: string;
  buyer: BuyerType;
  seller: SellerType;
}

interface PostType {
  id: string;
  title: string;
  articleContent: string; // Use `any` or define a more specific type depending on your JSON structure
  smallDescription: string;
  image: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  listingId?: string;
  listing?: ListingType;
  user?: UserType;
}
