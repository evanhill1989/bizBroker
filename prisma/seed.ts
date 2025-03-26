import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

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
function generateListings(userId: string) {
  return Array.from({ length: 3 }).map(() => ({
    id: faker.string.uuid(),
    businessName: faker.company.name(),
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
      fractionDigits: 0,
    }),
    profitMultiple: faker.number.float({ min: 1.5, max: 6, fractionDigits: 1 }),
    revenueMultiple: faker.number.float({ min: 2, max: 8, fractionDigits: 1 }),
    scale: faker.helpers.arrayElement(["local", "national", "global"]),
    trailing12MonthProfit: faker.number.float({
      min: 20000,
      max: 200000,
      fractionDigits: 0,
    }),
    trailing12MonthRevenue: faker.number.float({
      min: 50000,
      max: 500000,
      fractionDigits: 0,
    }),
    lastMonthProfit: faker.number.float({
      min: -20000,
      max: 50000,
      fractionDigits: 0,
    }),
    lastMonthRevenue: faker.number.float({
      min: 0,
      max: 100000,
      fractionDigits: 0,
    }),
  }));
}

async function seed() {
  const users = Array.from({ length: 15 }).map((_, index) => ({
    id: (index + 1).toString(), // This will create IDs from 1 to 15
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    // Add other user fields as necessary
  }));

  await prisma.user.createMany({ data: users });

  console.log("Seeding listings...");

  for (const user of users) {
    const listings = generateListings(user.id);

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
