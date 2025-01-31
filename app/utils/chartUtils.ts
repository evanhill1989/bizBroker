import { prisma } from "@/lib/prisma";

// Fetch listing prices from the database
export async function getListingPrices(): Promise<number[]> {
  const listings = await prisma.listing.findMany({
    select: { price: true },
  });

  return listings.map((listing) =>
    Number(listing.price.replace(/[^0-9.]/g, ""))
  );
}

export async function getRevenueMultiples(): Promise<number[]> {
  const revMultiples = await prisma.listing.findMany({
    select: { revenueMultiple: true },
  });

  return revMultiples.map((listing) =>
    Number(listing.revenueMultiple.replace(/[^0-9.]/g, ""))
  );
}

export async function getProfitMultiples(): Promise<number[]> {
  const profitMultiples = await prisma.listing.findMany({
    select: { profitMultiple: true },
  });

  return profitMultiples.map((listing) =>
    Number(listing.profitMultiple.replace(/[^0-9.]/g, ""))
  );
}

export async function getTrailingRevenue(): Promise<number[]> {
  const revMultiples = await prisma.listing.findMany({
    select: { trailing12MonthRevenue: true },
  });

  return revMultiples.map((listing) =>
    Number(listing.trailing12MonthRevenue.replace(/[^0-9.]/g, ""))
  );
}

export async function getTrailingProfit(): Promise<number[]> {
  const profitMultiples = await prisma.listing.findMany({
    select: { trailing12MonthProfit: true },
  });

  return profitMultiples.map((listing) =>
    Number(listing.trailing12MonthProfit.replace(/[^0-9.]/g, ""))
  );
}

// Prepare data for chart consumption
export function groupDataIntoBins(
  data: number[],
  rangeSize: number,
  numBins: number
): number[] {
  const bins = new Array(numBins).fill(0);

  data.forEach((value) => {
    const index = Math.min(Math.floor(value / rangeSize), numBins - 1);
    bins[index]++;
  });

  return bins;
}

// Convert binned data into a chart-friendly format
export function createBinCounts(bins: number[]): {
  count: number;
}[] {
  return bins.map((count, i) => ({
    id: i,
    count: count,
  }));
}

export function createChartData(arr: number[], range: number, numBins: number) {
  const bins = groupDataIntoBins(arr, range, numBins);
  const binCounts = createBinCounts(bins);

  return binCounts;
}
