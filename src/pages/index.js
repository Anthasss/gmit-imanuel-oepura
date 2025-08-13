import WeeklySummary from "@/components/home/weeklySummary";
import JoinUs from "@/components/home/joinUs";
import ScheduleRow from "@/components/home/scheduleRow";

const schedules = [
	{
		id: 1,
		title: "Rayon 1",
		date: "2023-10-01",
		time: "10:00 AM",
		location: "Main Hall",
		speaker: "John Doe",
	},
	{
		id: 2,
		title: "Rayon 2",
		date: "2023-10-02",
		time: "2:00 PM",
		location: "Conference Room A",
		speaker: "Jane Smith",
	},
	{
		id: 3,
		title: "Rayon 3",
		date: "2023-10-03",
		time: "11:30 AM",
		location: "Auditorium",
		speaker: "Mike Johnson",
	},
	{
		id: 4,
		title: "Rayon 4",
		date: "2023-10-04",
		time: "9:00 AM",
		location: "Training Room",
		speaker: "Sarah Wilson",
	},
	{
		id: 5,
		title: "Rayon 5",
		date: "2023-10-05",
		time: "3:30 PM",
		location: "Workshop Space",
		speaker: "Alex Brown",
	},
];

export default function Home() {
	return (
		<div className="bg-gray-100">
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
					<p>Together in love, growing in faith, serving in hope.</p>
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

			{/* <ImageSlider /> */}
		</div>
	);
}

