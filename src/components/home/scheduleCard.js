import { Calendar, Clock, MapPin, Mic } from "lucide-react";

export default function ScheduleCard({ title, date, time, location, speaker }) {
  return (
    <div className="card bg-neutral text-neutral-content w-full h-full">
      <div className="card-body p-6">
        <h2 className="card-title text-xl mb-4">{title}</h2>
        <div className="grid grid-rows-4 gap-4 w-full">
          <div className="flex gap-4 items-center">
            <Calendar className="w-6 h-6 flex-shrink-0" />
            <span className="text-base">{date}</span>
          </div>
          <div className="flex gap-4 items-center">
            <Clock className="w-6 h-6 flex-shrink-0" />
            <span className="text-base">{time}</span>
          </div>
          <div className="flex gap-4 items-center">
            <MapPin className="w-6 h-6 flex-shrink-0" />
            <span className="text-base">{location}</span>
          </div>
          <div className="flex gap-4 items-center">
            <Mic className="w-6 h-6 flex-shrink-0" />
            <span className="text-base">{speaker}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
