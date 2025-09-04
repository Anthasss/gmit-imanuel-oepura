import { useState } from "react";
import AppNavbar from "@/components/partials/AppNavbar";
import AppFooter from "@/components/partials/AppFooter";

export default function RoleLayout({
  children,
  role = "admin",
  userInfo = null,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavbar
        role={role}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        userInfo={userInfo}
      />

      {/* Main content */}
      <div className="lg:pl-64 pt-16">
        <main className="min-h-screen">{children}</main>
        <AppFooter role={role} />
      </div>
    </div>
  );
}
