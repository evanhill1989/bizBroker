// should i make this "use server"?

export default function Chart({
  chartData,
  chartName,
  chartMax,
}: {
  chartData: any[];
  chartName: string;
  chartMax: string;
}) {
  // At which point do i pass dynamicRange vales back to chartData?

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">{chartName}</h2>
      <div className="flex items-end space-x-4 justify-center  pb-4">
        {chartData.map((binCounts) => (
          <div key={binCounts.id} className="flex flex-col items-center">
            <div
              className="bg-blue-500 w-8 sm:w-10 rounded-t-lg transition-all duration-300 hover:bg-blue-700"
              style={{ height: `${binCounts.count * 20}px` }}
            ></div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-between">
        <p>$0</p>
        <p>{chartMax}</p>
      </div>
    </div>
  );
}
