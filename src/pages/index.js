import WeeklySummary from "@/components/home/cta/weeklySummary";
import JoinUs from "@/components/home/cta/joinUs";
import ScheduleRow from "@/components/home/schedule/scheduleRow";
import OurLocation from "@/components/home/ourLocation";
import ChurchStatistics from "@/components/home/statistics/churchStatistics";

import { ctaTexts, schedules } from "@/json/dummyHome";
import ChurchStatisticsHorizontal from "@/components/home/statistics/churchStatisticsHorizontal";

export default function Home() {
  return (
    <div className="bg-gray-100 flex">
      {/* Left Column - Church Statistics */}
      <ChurchStatistics />

      {/* Right Column - Existing Content */}
      <div className="w-full flex flex-col overflow-y-auto">
        {/* hero */}
        <div className="flex justify-start items-center h-screen">
          <img
            src="/header/home.jpg"
            alt="Home Head"
            className="object-cover w-full h-full"
          />
          <div className="absolute flex flex-col p-16">
            <p className="text-white text-4xl font-bold">Welcome to</p>
            <h1 className="text-white text-6xl font-bold">
              GMIT Imanuel Oepura
            </h1>
            <p className="text-white text-lg">
              Together in love, growing in faith, serving in hope.
            </p>
          </div>
        </div>

        {/* horizontal statistics */}
        <ChurchStatisticsHorizontal />

        {/* cta */}
        <div className="md:p-8 min-h-screen flex flex-col md:gap-4">
          <JoinUs />
          <WeeklySummary />
        </div>

        {/* schedule */}
        <div className="relative min-h-fit">
          <img
            src="/header/home.jpg"
            alt="Home Head"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="relative z-10 flex flex-col w-full md:p-8">
            <ScheduleRow schedules={schedules} />
            <ScheduleRow schedules={schedules} />
            <ScheduleRow schedules={schedules} />
          </div>
        </div>

        <div className="w-full md:p-8">
          <OurLocation />
        </div>
      </div>
    </div>
  );
}
