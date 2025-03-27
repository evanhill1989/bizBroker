import { mock } from "node:test";
import Chart from "../onboarding/buyer/forms/charts/Chart";

const mockChartData = [
  {
    id: 1,
    count: 1,
  },
  {
    id: 2,
    count: 2,
  },
  {
    id: 3,
    count: 3,
  },
  {
    id: 4,
    count: 4,
  },
  {
    id: 5,
    count: 5,
  },
];

export default function ListingPreviewCardCarousel({
  listings,
}: {
  listings: any;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Chart
        chartData={mockChartData}
        chartName="Price Range"
        chartMax="10"
        chartMin="0"
      />
      <Chart
        chartData={mockChartData}
        chartName="Price Range"
        chartMax="10"
        chartMin="0"
      />
      <Chart
        chartData={mockChartData}
        chartName="Price Range"
        chartMax="10"
        chartMin="0"
      />
    </div>
  );
}
