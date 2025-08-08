export default function Navigation({ children }) {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <div className="drawer">
        <input
          id="my-drawer-3"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-black/30 w-full absolute top-0 left-0 z-50">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2">
              <p className="font-extrabold text-2xl">GMIT Imanuel</p>
              <p className="text-2xl">Oepura</p>
            </div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a href={item.path}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Page content here */}
          <main>{children}</main>
        </div>
        <div className="drawer-side z-[60]">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            <div className="mb-4">
              <p className="font-extrabold text-2xl">GMIT Imanuel</p>
              <p className="text-2xl">Oepura</p>
            </div>
            {/* Sidebar content here */}
            {menuItems.map((item) => (
              <li key={item.name}>
                <a href={item.path}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
