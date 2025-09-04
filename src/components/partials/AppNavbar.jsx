import { useRouter } from "next/router";
import { useState } from "react";

import { getRoleConfig } from "@/config/navigationItem";
import Link from "next/link";
import {
  Bell,
  Menu,
  ChevronDown,
  ChevronRight,
  LogOut,
  Settings,
  User,
  X,
} from "lucide-react";
import HeaderDateTimeWidget from "../HeaderDateTimeWidget";

export default function AppNavbar({
  role = "admin",
  sidebarOpen,
  setSidebarOpen,
  userInfo = null,
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const router = useRouter();
  const config = getRoleConfig(role);
  const LogoIcon = config.logoIcon;

  // Use provided userInfo or fall back to config default
  const currentUser = userInfo || config.userInfo;

  const isActiveRoute = (href) => {
    return router.pathname === href;
  };

  const isParentActive = (item) => {
    if (isActiveRoute(item.href)) return true;
    if (item.children) {
      return item.children.some((child) => isActiveRoute(child.href));
    }

    return false;
  };

  const toggleSubmenu = (href) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  const renderMenuItem = (item) => {
    const hasChildren = item.children && item.children.length > 0;
    const IconComponent = item.icon;
    const isActive = isActiveRoute(item.href);
    const isParentActiveState = isParentActive(item);
    const isExpanded = expandedMenus[item.href];

    if (hasChildren) {
      return (
        <li key={item.href}>
          {/* Parent Menu Item */}
          <div
            className={`
              flex items-center justify-between p-3 text-sm font-medium rounded-lg transition-colors cursor-pointer group
              ${
                isParentActiveState
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }
            `}
            onClick={() => toggleSubmenu(item.href)}
          >
            <div className="flex items-center">
              <IconComponent
                className={`
                  w-5 h-5 mr-3 transition-colors
                  ${
                    isParentActiveState
                      ? "text-blue-700"
                      : "text-gray-500 group-hover:text-blue-600"
                  }
                `}
              />
              {item.label}
            </div>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>

          {/* Submenu Items */}
          {isExpanded && (
            <ul className="ml-6 mt-2 space-y-1">
              {item.children.map((child) => {
                const ChildIconComponent = child.icon;
                const isChildActive = isActiveRoute(child.href);

                return (
                  <li key={child.href}>
                    <Link
                      className={`
                        flex items-center p-2 text-sm rounded-lg transition-colors group
                        ${
                          isChildActive
                            ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                        }
                      `}
                      href={child.href}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <ChildIconComponent
                        className={`
                          w-4 h-4 mr-3 transition-colors
                          ${
                            isChildActive
                              ? "text-blue-700"
                              : "text-gray-400 group-hover:text-blue-600"
                          }
                        `}
                      />
                      {child.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    }

    // Regular menu item without children
    return (
      <li key={item.href}>
        <Link
          className={`
            flex items-center p-3 text-sm font-medium rounded-lg transition-colors group
            ${
              isActive
                ? "bg-blue-100 text-blue-700 border-r-4 border-blue-700"
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            }
          `}
          href={item.href}
          onClick={() => setSidebarOpen(false)}
        >
          <IconComponent
            className={`
              w-5 h-5 mr-3 transition-colors
              ${
                isActive
                  ? "text-blue-700"
                  : "text-gray-500 group-hover:text-blue-600"
              }
            `}
          />
          {item.label}
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              {/* Mobile/Desktop sidebar toggle */}
              <button
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Logo - Hidden on larger screens when sidebar is visible */}
              <Link
                className="flex ml-2 lg:hidden"
                href={config.dashboardRoute}
              >
                <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-600">
                  {config.fullTitle}
                </span>
              </Link>

              {/* DateTime Widget - Pindah ke left side */}
              <div className="hidden md:block ml-4 lg:ml-60">
                <HeaderDateTimeWidget />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center ">
              {/* Notifications */}
              <button className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                <Bell className="w-5 h-5" />
              </button>

              {/* Profile dropdown */}
              <div className="relative ml-3">
                <button
                  className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{currentUser.name}</div>
                      <div className="text-gray-500">{currentUser.email}</div>
                    </div>
                    <Link
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      href={`${config.baseRoute}/profile`}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profil
                    </Link>
                    <Link
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      href={`${config.baseRoute}/settings`}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Pengaturan
                    </Link>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut className="w-4 h-4 mr-2" />
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden bg-black/25 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform duration-300 bg-white border-r border-gray-200 shadow-lg
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:border-none">
            <Link className="flex items-center" href={config.dashboardRoute}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <LogoIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-blue-600">
                {config.fullTitle}
              </span>
            </Link>

            {/* Close button for mobile */}
            <button
              className="lg:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-6">
            <ul className="space-y-2">
              {config.navigation.map((item) => renderMenuItem(item))}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium">{currentUser.name}</div>
                <div className="text-xs text-gray-500">
                  {currentUser.organization}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
