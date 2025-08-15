import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScheduleCard from "./scheduleCard";

export default function ScheduleRow({schedules}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % schedules.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + schedules.length) % schedules.length);
  };

  const getSlidePosition = (index) => {
    const position = (index - currentIndex + schedules.length) % schedules.length;
    
    switch (position) {
      case 0:
        return 'left-1/2 -translate-x-[160%] opacity-70 scale-90 lg:block hidden';
      case 1:
        return 'left-1/2 -translate-x-1/2 opacity-100 scale-100 z-10';
      case 2:
        return 'left-1/2 translate-x-[60%] opacity-70 scale-90 lg:block hidden';
      default:
        return 'left-1/2 translate-x-[250%] opacity-0';
    }
  };

  return (
    <div className="bg-black/20 py-2 overflow-hidden">
      {/* Row title */}
      <div className="divider text-3xl font-bold text-white">Schedule</div>

      {/* Slider Container */}
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="relative h-80 flex items-center justify-center overflow-hidden">
          {schedules.map((schedule, index) => (
            <div
              key={schedule.id}
              className={`
                absolute h-72
                w-4/5 lg:w-1/3 max-w-sm
                transition-all duration-700 ease-in-out
                ${getSlidePosition(index)}
              `}
            >
              <ScheduleCard
                title={schedule.title}
                date={schedule.date}
                time={schedule.time}
                location={schedule.location}
                speaker={schedule.speaker}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-2 gap-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-gray-300 bg-white transition-colors duration-500 hover:bg-success inline-flex items-center justify-center shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-gray-300 bg-white transition-colors duration-500 hover:bg-success inline-flex items-center justify-center shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
