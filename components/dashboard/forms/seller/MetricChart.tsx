// should i make this "use server"?
"use client";

import { useState } from "react";

type Metric = { date: string; value: number };

export default function MetricChart({ metric }: { metric: Metric[] }) {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const maxMetricValue = Math.max(...metric.map((day) => day.value));
  const maxHeight = 300;
  const numGridLines = 5; // Number of horizontal grid lines

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center mb-4">Chart Name</h2>
      <div className="relative">
        {/* Grid Lines and Labels */}
        <div className="absolute inset-0">
          {[...Array(numGridLines)].map((_, i) => {
            const value = ((numGridLines - i) / numGridLines) * maxMetricValue;
            return (
              <div key={i} className="relative h-[20%]">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="text-xs text-gray-500 absolute -left-6 top-[-0.5rem]">
                  {Math.round(value)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Chart Bars */}
        <div className="flex items-end justify-center pb-4 h-[300px]">
          {metric.map((day) => {
            const normalizedHeight = (day.value / maxMetricValue) * maxHeight;
            return (
              <div key={day.date} className="flex flex-col items-center">
                <div
                  className="bg-blue-500 w-3 rounded-t-lg transition-all duration-300 hover:bg-blue-700 relative"
                  style={{ height: `${normalizedHeight}px` }}
                  onMouseEnter={() => setHoveredDate(day.date)}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  {/* Tooltip */}
                  {hoveredDate === day.date && (
                    <div className="absolute z-30 -top-8 left-1/2 transform -translate-x-1/2 p-1 bg-black text-white text-xs rounded-md">
                      {day.value}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* X-axis Label */}
      <div className="text-center text-gray-600 mt-4">Last 30 Days</div>
    </div>
  );
}
