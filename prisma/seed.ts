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
const businessModels = ["retail", "online", "b2b"];

const growthOpportunities = [
  "Online expansion",
  "Franchising potential",
  "New product lines",
  "Increased marketing",
  "Higher pricing strategy",
  "Additional locations",
  "Customer retention",
  "Operational efficiency",
  "Social media growth",
  "Subscription model",
  "Strategic partnerships",
  "Improved customer service",
  "Automation upgrades",
  "Delivery expansion",
  "New demographics",
];

const assets = [
  "Inventory",
  "Equipment",
  "Furniture",
  "Customer list",
  "Supplier contracts",
  "Brand name",
  "Website & domain",
  "Social media accounts",
  "Email database",
  "Trademarks",
  "Patents",
  "Business phone number",
  "POS system",
  "Lease agreement",
  "Company vehicle",
  "Machinery",
  "Signage",
  "Marketing materials",
  "Software licenses",
  "Loyalty program",
  "Trade secrets",
  "Training manuals",
  "Employee agreements",
  "Operational procedures",
  "Vendor relationships",
  "Franchise rights",
  "Warehouse stock",
  "Licenses & permits",
  "Security system",
  "Real estate (if owned)",
  "Customer testimonials",
  "Copyrights",
  "Business reputation",
  "Client contracts",
  "Sales reports",
  "Insurance policies",
  "Exclusive supplier deals",
  "Utility accounts",
  "Existing warranties",
  "Shipping agreements",
];

// Function to generate random listings
function generateListings(sellerId: string, userId: string) {
  return Array.from({ length: 3 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    shortDescription: faker.company.buzzPhrase(),
    description: faker.lorem.paragraph(),
    longDescription: faker.lorem.paragraphs(3),
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

    maturity: faker.helpers.arrayElement(["startup", "growing", "established"]),
    location: faker.location.city() + ", " + faker.location.country(),
    foundedDate: faker.date.past(),
    numEmployees: faker.number.int({ min: 1, max: 500 }),
    competitors: [
      faker.company.name(),
      faker.company.name(),
      faker.company.name(),
    ],
    growthOpportunities: faker.helpers.uniqueArray(growthOpportunities, 3),
    assets: faker.helpers.uniqueArray(assets, 10),
    sellingReason: faker.lorem.sentence(),
    financing: faker.lorem.sentence(),

    price: faker.number.float({
      min: 10000,
      max: 500000,
    }),
    profitMultiple: faker.number.float({ min: 1.5, max: 6 }),
    revenueMultiple: faker.number.float({ min: 2, max: 8 }),
    scale: faker.helpers.arrayElement(["local", "national", "global"]),
    trailing12MonthProfit: faker.number.float({
      min: 20000,
      max: 200000,
    }),
    trailing12MonthRevenue: faker.number.float({
      min: 50000,
      max: 500000,
    }),
    lastMonthProfit: faker.number.float({
      min: -20000,
      max: 50000,
    }),
    lastMonthRevenue: faker.number.float({
      min: 0,
      max: 100000,
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
