import { PreferenceForm } from "./PreferenceForm";
import { CreateBuyerPriceRangeStepAction } from "@/app/actions";
import { prisma } from "@/lib/prisma";

async function getListingPrices() {
  const listings = await prisma.listing.findMany({
    select: {
      price: true,
    },
  });

  const prices = listings.map(
    (listing) => Number(listing.price.replace(/[^0-9.]/g, "")) // Remove non-numeric characters like "$"
  );

  return prices;
}

function groupDataIntoBins(
  data: number[],
  rangeSize: number,
  numBins: number
): number[] {
  const bins = new Array(numBins).fill(0);

  const rangeStrings = Array.from({ length: numBins }, (_, index) => {
    const start = index * rangeSize;
    const end = (index + 1) * rangeSize;
    return `${start}-${end}`;
  });

  data.forEach((value) => {
    const index = Math.min(Math.floor(value / rangeSize), numBins - 1); // Keep index within range
    console.log(index, "index in groupDataIntoBins  ");
    bins[index]++;
  });

  return bins;
}

function createObjectThresholds(priceThresholds: number[]) {
  const chartObject = [];
  // need a priceThreshold object that has a key of priceThreshold and a value whatever the current price range is in string format, for example "0-200,000"

  for (let i = 0; i < priceThresholds.length; i++) {
    // for each value in the array i want to add an object to the chartObject array with key of price and value of priceThresholds[i]
    chartObject.push({
      priceRange: `${(i + 1) * 100}K`,
      price: priceThresholds[i],
    });
  }

  console.log(chartObject, "chartObject in createObjectThresholds");

  return chartObject;
}

export async function PriceRangeForm() {
  // charts
  const pricesArr = await getListingPrices();

  const priceRangeCounts = groupDataIntoBins(pricesArr, 50000, 10);

  const chartObject = createObjectThresholds(priceRangeCounts);

  const chartData = [
    { priceRange: "100K", price: 6 },
    { priceRange: "200K", price: 6 },
    { priceRange: "300K", price: 8 },
    { priceRange: "400K", price: 3 },
    { priceRange: "500K", price: 3 },
    { priceRange: "600K", price: 2 },
    { priceRange: "700K", price: 2 },
    { priceRange: "800K", price: 5 },
    { priceRange: "900K", price: 3 },
    { priceRange: "1000K", price: 1 },
  ];

  return (
    <PreferenceForm
      action={CreateBuyerPriceRangeStepAction}
      label="What is your ideal price range?"
      options={[
        { value: "PriceRangeChart", label: "Small - Less than 10 employees" },
        { value: "medium", label: "Medium - 10-100 employees" },
        { value: "large", label: "Large - More than 100 employees" },
      ]}
      chartData={chartData}
    />
  );
}
