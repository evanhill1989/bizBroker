import MetricChart from "./forms/seller/MetricChart";

type Metrics = {
  uniqueViews: { date: string; value: number }[];
  clicks: { date: string; value: number }[];
  totalViews: { date: string; value: number }[];
};

export default function ListingMetrics({ metrics }: { metrics: Metrics }) {
  return (
    <div className="grid grid-cols-3">
      <MetricChart metric={metrics.uniqueViews} />
      <MetricChart metric={metrics.clicks} />
      <MetricChart metric={metrics.totalViews} />
    </div>
  );
}
