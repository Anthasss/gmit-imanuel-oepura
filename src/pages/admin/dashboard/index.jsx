"use client";

import React from "react";
import {
  Users,
  Calendar,
  BookOpen,
  DollarSign,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  formatNumber,
  formatCurrency,
  formatPercentage,
} from "@/lib/formatUtils";

export default function DashboardPageAdmin() {
  // Dummy data for demonstration
  const stats = {
    totalJemaat: 1247,
    activeMembers: 1180,
    newMembersThisMonth: 12,
    upcomingEvents: 5,
    monthlyOffering: 85600000,
    pendingApprovals: 3,
  };

  const recentActivities = [
    {
      id: 1,
      type: "baptis",
      member: "Maria Sari",
      date: "2025-08-25",
      status: "completed",
    },
    {
      id: 2,
      type: "wedding",
      member: "John & Lisa",
      date: "2025-08-30",
      status: "pending",
    },
    {
      id: 3,
      type: "atestasi",
      member: "David Purba",
      date: "2025-08-28",
      status: "approved",
    },
    {
      id: 4,
      type: "membership",
      member: "Grace Hutabarat",
      date: "2025-08-29",
      status: "pending",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Ibadah Minggu",
      date: "2025-09-01",
      time: "08:00",
      type: "worship",
    },
    {
      id: 2,
      title: "Komsel Remaja",
      date: "2025-09-02",
      time: "19:00",
      type: "fellowship",
    },
    {
      id: 3,
      title: "Doa Pagi",
      date: "2025-09-03",
      time: "06:00",
      type: "prayer",
    },
    {
      id: 4,
      title: "Persekutuan Wanita",
      date: "2025-09-04",
      time: "14:00",
      type: "fellowship",
    },
    {
      id: 5,
      title: "Ibadah Kaum Bapak",
      date: "2025-09-05",
      time: "19:30",
      type: "worship",
    },
  ];

  const headerStats = [
    {
      label: "Total Jemaat",
      value: formatNumber(stats.totalJemaat),
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      change: `+${stats.newMembersThisMonth} bulan ini`,
      changeType: "positive",
    },
    {
      label: "Anggota Aktif",
      value: formatNumber(stats.activeMembers),
      icon: UserCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      change: formatPercentage((stats.activeMembers / stats.totalJemaat) * 100),
      changeType: "neutral",
    },
    {
      label: "Acara Mendatang",
      value: stats.upcomingEvents,
      icon: Calendar,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      change: "Minggu ini",
      changeType: "neutral",
    },
    {
      label: "Perlu Persetujuan",
      value: stats.pendingApprovals,
      icon: AlertCircle,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      change: "Memerlukan tindakan",
      changeType: "neutral",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Selesai</Badge>;
      case "approved":
        return <Badge variant="success">Disetujui</Badge>;
      case "pending":
        return <Badge variant="warning">Menunggu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getEventTypeBadge = (type) => {
    switch (type) {
      case "worship":
        return <Badge variant="default">Ibadah</Badge>;
      case "fellowship":
        return <Badge variant="secondary">Persekutuan</Badge>;
      case "prayer":
        return <Badge variant="outline">Doa</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Ringkasan sistem administrasi GMIT Imanuel Oepura"
        breadcrumb={[
          { label: "Admin", href: "/admin" },
          { label: "Dashboard" },
        ]}
        stats={headerStats}
      />

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Persembahan Bulanan
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(stats.monthlyOffering)}
              </div>
              <p className="text-xs text-muted-foreground">Agustus 2025</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Program Aktif
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Komsel dan kegiatan
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>
                Kegiatan administrasi terbaru di gereja
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{activity.member}</p>
                      <p className="text-sm text-gray-500 capitalize">
                        {activity.type} • {activity.date}
                      </p>
                    </div>
                    {getStatusBadge(activity.status)}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Lihat Semua Aktivitas
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Acara Mendatang</CardTitle>
              <CardDescription>
                Jadwal kegiatan gereja minggu ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-500">
                        {event.date} • {event.time}
                      </p>
                    </div>
                    {getEventTypeBadge(event.type)}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Kelola Jadwal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>
              Fungsi administrasi yang sering digunakan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="flex flex-col items-center p-6 h-auto">
                <Users className="h-6 w-6 mb-2" />
                <span>Tambah Jemaat</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto"
              >
                <Calendar className="h-6 w-6 mb-2" />
                <span>Buat Acara</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto"
              >
                <BookOpen className="h-6 w-6 mb-2" />
                <span>Laporan</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto"
              >
                <DollarSign className="h-6 w-6 mb-2" />
                <span>Keuangan</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Add layout to component
DashboardPageAdmin.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
