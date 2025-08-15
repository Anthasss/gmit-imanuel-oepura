import WeeklySummary from "@/components/home/weeklySummary";
import JoinUs from "@/components/home/joinUs";
import ScheduleRow from "@/components/home/scheduleRow";
import OurLocation from "@/components/home/ourLocation";
import ChurchStatistics from "@/components/home/churchStatistics";

import { ctaTexts, schedules } from "@/json/dummyHome";

export default function Home() {
  return (
    <div className="bg-gray-100 flex">
      {/* Left Column - Church Statistics */}
      <ChurchStatistics />

      {/* Right Column - Existing Content */}
      <div className="w-4/5 flex flex-col overflow-y-auto">
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

        {/* cta */}
        <div className="p-8 min-h-screen flex flex-col gap-4">
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
          <div className="relative z-10 flex flex-col w-full p-8">
            <ScheduleRow schedules={schedules} />
            <ScheduleRow schedules={schedules} />
            <ScheduleRow schedules={schedules} />
          </div>
        </div>

        <div className="w-full p-8">
          <OurLocation />
        </div>
      </div>
    </div>
  );
}
