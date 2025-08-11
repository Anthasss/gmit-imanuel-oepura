import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

export default function UppCard( { title, image, description, date, time } ) {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10 text-gray-950">
      {/* Event Image */}
      <div className="relative h-64">
        <Image
          src={image}
          alt="Event Image"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      {/* Event Info */}
      <div className="p-6">
        <p className="text-gray-500 text-sm">
          <Calendar className="inline-block mr-1" /> {date}
          <span className="mx-2">—</span>
          <Clock className="inline-block mr-1" /> {time}
        </p>
        <h2 className="text-2xl font-bold mt-2">{title}</h2>
        <p className="text-gray-700 mt-4">
          {description}
        </p>
        <button className="btn btn-outline mt-4">
          See More
        </button>
      </div>
    </div>
  );
}