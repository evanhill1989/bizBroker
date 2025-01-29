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

  console.log(prices); // Debugging
  return prices;
}

export async function PriceRangeForm() {
  // charts
  const pricesArr = await getListingPrices();

  console.log(pricesArr);

  return (
    <PreferenceForm
      action={CreateBuyerPriceRangeStepAction}
      label="What is your ideal price range?"
      options={[
        { value: "PriceRangeChart", label: "Small - Less than 10 employees" },
        { value: "medium", label: "Medium - 10-100 employees" },
        { value: "large", label: "Large - More than 100 employees" },
      ]}
    />
  );
}
