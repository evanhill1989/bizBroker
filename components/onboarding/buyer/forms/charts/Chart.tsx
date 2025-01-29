export default function Chart() {
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
    { priceRange: "1000K", price: 7 },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full  p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold text-center mb-4">
          Price Distribution Chart
        </h2>
        <div className="flex items-end space-x-4 justify-between border-b-2 border-gray-300 pb-4">
          {chartData.map(({ priceRange, price }) => (
            <div key={priceRange} className="flex flex-col items-center">
              <div
                className="bg-blue-500 w-8 sm:w-10 rounded-t-lg transition-all duration-300 hover:bg-blue-700"
                style={{ height: `${price * 20}px` }}
              ></div>
              <span className="text-xs sm:text-sm font-medium mt-2">
                {priceRange}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 text-sm mt-4">
          Number of Listings per Price Range
        </p>
      </div>
    </div>
  );
}
