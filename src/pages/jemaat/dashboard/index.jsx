"use client";

import React from "react";
import {
  Calendar,
  Heart,
  DollarSign,
  CheckSquare,
  Bell,
  BookOpen,
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
import JemaatLayout from "@/components/layout/JemaatLayout";
import { formatNumber, formatCurrency } from "@/lib/formatUtils";

export default function DashboardPageJemaat() {
  // Dummy data for demonstration
  const jemaatStats = {
    attendanceThisMonth: 12,
    upcomingEvents: 3,
    prayerRequests: 2,
    offeringThisMonth: 1500000,
  };

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
      title: "Komsel",
      date: "2025-09-03",
      time: "19:00",
      type: "fellowship",
    },
    {
      id: 3,
      title: "Doa Pagi",
      date: "2025-09-05",
      time: "06:00",
      type: "prayer",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "attendance",
      description: "Hadir di Ibadah Minggu",
      date: "2025-08-25",
    },
    {
      id: 2,
      type: "offering",
      description: "Persembahan Bulanan",
      date: "2025-08-20",
    },
    {
      id: 3,
      type: "prayer",
      description: "Permintaan Doa Dijawab",
      date: "2025-08-18",
    },
  ];

  const headerStats = [
    {
      label: "Kehadiran Bulan Ini",
      value: jemaatStats.attendanceThisMonth,
      icon: CheckSquare,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      change: "Sangat baik!",
      changeType: "positive",
    },
    {
      label: "Acara Mendatang",
      value: jemaatStats.upcomingEvents,
      icon: Calendar,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      change: "Minggu ini",
      changeType: "neutral",
    },
    {
      label: "Permintaan Doa",
      value: jemaatStats.prayerRequests,
      icon: Heart,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      change: "Aktif",
      changeType: "neutral",
    },
  ];

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
        title="Selamat Datang!"
        description="Portal jemaat GMIT Imanuel Oepura"
        breadcrumb={[
          { label: "Jemaat", href: "/jemaat" },
          { label: "Beranda" },
        ]}
        stats={headerStats}
      />

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Persembahan Bulan Ini
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(jemaatStats.offeringThisMonth)}
              </div>
              <p className="text-xs text-muted-foreground">Agustus 2025</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Aktivitas Rohani
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Kegiatan diikuti bulan ini
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Kegiatan Mendatang</CardTitle>
              <CardDescription>Acara yang akan Anda ikuti</CardDescription>
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
                  Lihat Semua Kegiatan
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>Catatan kegiatan rohani Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                    <Badge variant="success">Selesai</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Lihat Riwayat Lengkap
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>Layanan yang sering digunakan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="flex flex-col items-center p-6 h-auto">
                <DollarSign className="h-6 w-6 mb-2" />
                <span>Persembahan</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto"
              >
                <Heart className="h-6 w-6 mb-2" />
                <span>Permintaan Doa</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto"
              >
                <Calendar className="h-6 w-6 mb-2" />
                <span>Daftar Acara</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto"
              >
                <Bell className="h-6 w-6 mb-2" />
                <span>Pengumuman</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Add layout to component
DashboardPageJemaat.getLayout = function getLayout(page) {
  return <JemaatLayout>{page}</JemaatLayout>;
};
