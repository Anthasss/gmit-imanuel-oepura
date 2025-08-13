import { Calendar, Clock, MapPin, Mic } from "lucide-react";

export default function ScheduleCard({ date, time, location, speaker }) {
  return (
    <div className="card bg-neutral text-neutral-content w-96">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Rayon 1</h2>
        <div className="grid grid-rows-4 gap-2 w-full">
          <div className="flex gap-4 items-center">
            <Calendar className="w-6 h-6" /> <span>{date}</span>
          </div>
          <div className="flex gap-4 items-center">
            <Clock className="w-6 h-6" /> <span>{time}</span>
          </div>
          <div className="flex gap-4 items-center">
            <MapPin className="w-6 h-6" /> <span>{location}</span>
          </div>
          <div className="flex gap-4 items-center">
            <Mic className="w-6 h-6" /> <span>{speaker}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
