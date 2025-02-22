-- CreateEnum
CREATE TYPE "PreferenceStatus" AS ENUM ('LIKED', 'HIDDEN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "profileImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "buyerOnboardingStep" TEXT NOT NULL DEFAULT 'intro',
    "buyerOnboardingSkipped" BOOLEAN NOT NULL DEFAULT false,
    "buyerScale" TEXT,
    "buyerMaturity" TEXT,
    "buyerBusinessModel" TEXT,
    "buyerLocation" TEXT,
    "buyerMinPriceRange" DOUBLE PRECISION,
    "buyerMaxPriceRange" DOUBLE PRECISION,
    "buyerMinProfitMultiple" DOUBLE PRECISION,
    "buyerMaxProfitMultiple" DOUBLE PRECISION,
    "buyerMinRevenueMultiple" DOUBLE PRECISION,
    "buyerMaxRevenueMultiple" DOUBLE PRECISION,
    "buyerMinTrailing12MonthProfit" DOUBLE PRECISION,
    "buyerMaxTrailing12MonthProfit" DOUBLE PRECISION,
    "buyerMinTrailing12MonthRevenue" DOUBLE PRECISION,
    "buyerMaxTrailing12MonthRevenue" DOUBLE PRECISION,
    "sellerBusinessNames" TEXT[],
    "sellerOnboardingStep" TEXT NOT NULL DEFAULT 'intro',
    "sellerOnboardingSkipped" BOOLEAN NOT NULL DEFAULT false,
    "sellerPhoneNumber" TEXT NOT NULL,
    "sellerWebsite" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "longDescription" TEXT,
    "subdirectory" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,
    "userId" TEXT NOT NULL,
    "businessModel" TEXT NOT NULL,
    "scale" TEXT,
    "maturity" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "foundedDate" TIMESTAMP(3),
    "numEmployees" INTEGER,
    "competitors" TEXT[],
    "growthOpportunities" TEXT[],
    "assets" TEXT[],
    "sellingReason" TEXT,
    "financing" TEXT,
    "price" DOUBLE PRECISION,
    "profitMultiple" DOUBLE PRECISION,
    "revenueMultiple" DOUBLE PRECISION,
    "trailing12MonthProfit" DOUBLE PRECISION,
    "trailing12MonthRevenue" DOUBLE PRECISION,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyerListingPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "status" "PreferenceStatus" NOT NULL,

    CONSTRAINT "BuyerListingPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "articleContent" JSONB NOT NULL,
    "smallDescription" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "listingId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Listing_subdirectory_key" ON "Listing"("subdirectory");

-- CreateIndex
CREATE UNIQUE INDEX "BuyerListingPreference_userId_listingId_key" ON "BuyerListingPreference"("userId", "listingId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Inquiry_id_key" ON "Inquiry"("id");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyerListingPreference" ADD CONSTRAINT "BuyerListingPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyerListingPreference" ADD CONSTRAINT "BuyerListingPreference_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
