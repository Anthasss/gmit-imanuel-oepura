import UppCard from "./uppCard"

export default function UppCardContainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center min-h-screen bg-gray-100 p-8">
      <UppCard 
        title="Lorem Ipsum Dolor"
        image="/header/anak.png"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
        date="August 15, 2025"
        time="10:00 AM"
      />
      <UppCard 
        title="Consectetur Adipiscing"
        image="/header/anak.png"
        description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo."
        date="August 20, 2025"
        time="2:30 PM"
      />
      <UppCard 
        title="Sed Do Eiusmod"
        image="/header/anak.png"
        description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla."
        date="August 25, 2025"
        time="9:15 AM"
      />
      <UppCard 
        title="Tempor Incididunt"
        image="/header/anak.png"
        description="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
        date="September 1, 2025"
        time="4:00 PM"
      />
      <UppCard 
        title="Laboris Nisi Ut"
        image="/header/anak.png"
        description="Aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse."
        date="September 5, 2025"
        time="11:30 AM"
      />
      <UppCard 
        title="Voluptate Velit Esse"
        image="/header/anak.png"
        description="Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa."
        date="September 10, 2025"
        time="1:45 PM"
      />
    </div>
  )
}