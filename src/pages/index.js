export default function Home() {
  return (
    <div>
      <div className="flex justify-start items-center h-screen">
        <img
          src="/header/home.jpg"
          alt="Home Head"
          className="object-cover w-full h-full"
        />
        <div className="absolute flex flex-col p-16">
          <p className="text-white text-4xl font-bold">Welcome to</p>
          <h1 className="text-white text-6xl font-bold">GMIT Imanuel Oepura</h1>
          <p>Together in love, growing in faith, serving in hope.</p>

        </div>
      </div>

    </div>
  );
}

