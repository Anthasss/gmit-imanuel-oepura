import ScheduleCard from "./scheduleCard";

export default function ScheduleRow() {
  {
    return (
      <div className="bg-black/20">
        {/* row title */}
        <div className="divider">Title</div>

        {/* row cards */}
        <div className="carousel carousel-center rounded-box w-full overflow-scroll flex gap-8 p-8">
          <div className="carousel-item">
            <ScheduleCard
              date={"2023-10-01"}
              time={"10:00 AM"}
              location={"Main Hall"}
              speaker={"John Doe"}
            />
          </div>
          <div className="carousel-item">
            <ScheduleCard
              date={"2023-10-01"}
              time={"10:00 AM"}
              location={"Main Hall"}
              speaker={"John Doe"}
            />
          </div>
          <div className="carousel-item">
            <ScheduleCard
              date={"2023-10-01"}
              time={"10:00 AM"}
              location={"Main Hall"}
              speaker={"John Doe"}
            />
          </div>
          <div className="carousel-item">
            <ScheduleCard
              date={"2023-10-01"}
              time={"10:00 AM"}
              location={"Main Hall"}
              speaker={"John Doe"}
            />
          </div>
          <div className="carousel-item">
            <ScheduleCard
              date={"2023-10-01"}
              time={"10:00 AM"}
              location={"Main Hall"}
              speaker={"John Doe"}
            />
          </div>
        </div>
      </div>
    );
  }
}
