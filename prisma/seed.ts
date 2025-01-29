import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const sellers = [
  { id: "d13f6b22-d7ea-43ad-8474-6230805bc956", userId: "1" },
  { id: "cb8ddfe2-d30f-43a0-8018-e47dc2c0791e", userId: "2" },
  { id: "f2b9e965-4b18-40b2-b869-cb4166df9a90", userId: "3" },
  { id: "c7dda216-ea2f-446d-b785-b78acbb32b7e", userId: "4" },
  { id: "69165416-10e1-47a6-b7b3-07ddc535aa27", userId: "5" },
  { id: "81263960-241f-4a85-b6a9-0151a11763ca", userId: "6" },
  { id: "3e1f034a-dca0-4fe0-b4ca-19c1a12b527e", userId: "7" },
  { id: "d25d593c-ba4d-4154-83ef-505033705f8c", userId: "8" },
  { id: "a75dca63-8be1-47dc-a7bb-7d459e75ddd1", userId: "9" },
  { id: "f1864a40-bdbe-431c-8f44-f1ae5c22b2b8", userId: "10" },
  { id: "4fca7b0f-2f50-48db-8ddc-9838f6f02b51", userId: "11" },
  { id: "64071fc5-f7c2-4daa-b328-8be7a10707ee", userId: "12" },
  { id: "3fa5e051-9e42-4fbd-bcac-2744803468c9", userId: "13" },
  { id: "f9dd9c70-21a2-44f3-a84c-829796d07d6d", userId: "14" },
  { id: "32410ebf-64bc-4d74-b4cb-fa163080ba22", userId: "15" },
];

// List of business models for variation
const businessModels = [
  "E-Commerce",
  "Subscription Service",
  "SaaS",
  "Brick & Mortar",
  "Dropshipping",
  "Consulting",
  "Marketplace",
  "Agency",
  "Freemium",
];

// Function to generate random listings
function generateListings(sellerId: string, userId: string) {
  return Array.from({ length: 3 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    subdirectory:
      faker.internet.domainWord() +
      "-" +
      faker.number.int({ min: 1000, max: 9999 }),
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: faker.image.urlPicsumPhotos(),
    userId,
    sellerId,
    businessModel: faker.helpers.arrayElement(businessModels),
    location: faker.location.city() + ", " + faker.location.country(),
    maturity: faker.helpers.arrayElement(["Startup", "Growing", "Established"]),
    price: faker.commerce.price({
      min: 10000,
      max: 500000,
      dec: 0,
      symbol: "$",
    }),
    profitMultiple: faker.number.float({ min: 1.5, max: 6 }).toString(),
    revenueMultiple: faker.number.float({ min: 2, max: 8 }).toString(),
    scale: faker.helpers.arrayElement(["Local", "National", "Global"]),
    trailing12MonthProfit: faker.commerce.price({
      min: 20000,
      max: 200000,
      dec: 0,
      symbol: "$",
    }),
    trailing12MonthRevenue: faker.commerce.price({
      min: 50000,
      max: 500000,
      dec: 0,
      symbol: "$",
    }),
  }));
}

async function seed() {
  console.log("Seeding listings...");

  for (const seller of sellers) {
    const listings = generateListings(seller.id, seller.userId);

    for (const listing of listings) {
      await prisma.listing.create({
        data: listing,
      });
    }
  }

  console.log("Seeding complete!");
}

seed()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
