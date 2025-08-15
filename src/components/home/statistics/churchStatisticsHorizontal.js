import { useEffect, useState } from "react";
import StatPieChart from "../statPieChart";
import { chartData } from "../../../json/dummyHome";

export default function ChurchStatisticsHorizontal() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate how many pairs we have (showing 2 charts at a time)
  const totalPairs = Math.ceil(chartData.length / 2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPairs);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalPairs]);

  return (
    <div className="w-full bg-base-300 p-6 py-8 overflow-hidden">
      <div className="flex flex-col h-96">
        {/* Chart container that takes most of the height */}
        <div className="flex-1 relative overflow-hidden">
          <div
            className="transition-transform duration-500 ease-in-out h-full flex"
            style={{
              transform: `translateX(-${(currentIndex * 100) / totalPairs}%)`,
              width: `${totalPairs * 100}%`,
            }}
          >
            {Array.from({ length: totalPairs }, (_, pairIndex) => (
              <div
                key={pairIndex}
                className="h-full flex-shrink-0 flex gap-6 px-4"
                style={{ width: `${100 / totalPairs}%` }}
              >
                {chartData
                  .slice(pairIndex * 2, pairIndex * 2 + 2)
                  .map((chart, chartIndex) => (
                    <div key={`${pairIndex}-${chartIndex}`} className="flex-1 min-h-0">
                      <StatPieChart
                        title={chart.title}
                        data={chart.data}
                        size="normal"
                      />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Indicators at bottom */}
        <div className="flex justify-center space-x-2 py-4">
          {Array.from({ length: totalPairs }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-primary-content"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}