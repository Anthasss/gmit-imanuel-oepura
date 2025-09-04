"use client";

import React from "react";
import {
  Users,
  Calendar,
  Activity,
  ClipboardList,
  BookOpen,
  MessageSquare,
  FileText,
  TrendingUp,
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
import MajelisLayout from "@/components/layout/MajelisLayout";

function DashboardPageMajelis() {
  // Dummy data for demonstration
  const majelisStats = {
    totalPrograms: 15,
    pendingDecisions: 4,
    activeMeetings: 2,
    monthlyReports: 8,
  };

  const pendingDecisions = [
    {
      id: 1,
      title: "Anggaran Program Natal 2025",
      priority: "high",
      deadline: "2025-09-05",
      department: "Keuangan",
    },
    {
      id: 2,
      title: "Renovasi Gedung Gereja",
      priority: "medium",
      deadline: "2025-09-10",
      department: "Fisik",
    },
    {
      id: 3,
      title: "Program Kemah Remaja",
      priority: "medium",
      deadline: "2025-09-08",
      department: "Pemuda",
    },
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: "Rapat Majelis Bulanan",
      date: "2025-09-02",
      time: "19:00",
      attendees: 12,
    },
    {
      id: 2,
      title: "Evaluasi Program Gereja",
      date: "2025-09-04",
      time: "20:00",
      attendees: 8,
    },
  ];

  const headerStats = [
    {
      label: "Program Aktif",
      value: majelisStats.totalPrograms,
      icon: BookOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      change: "+2 program baru",
      changeType: "positive",
    },
    {
      label: "Keputusan Menunggu",
      value: majelisStats.pendingDecisions,
      icon: ClipboardList,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      change: "Perlu perhatian",
      changeType: "neutral",
    },
    {
      label: "Rapat Aktif",
      value: majelisStats.activeMeetings,
      icon: Users,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      change: "Minggu ini",
      changeType: "neutral",
    },
    {
      label: "Laporan Bulanan",
      value: majelisStats.monthlyReports,
      icon: FileText,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      change: "Dari semua unit",
      changeType: "neutral",
    },
  ];

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Tinggi</Badge>;
      case "medium":
        return <Badge variant="warning">Sedang</Badge>;
      case "low":
        return <Badge variant="secondary">Rendah</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <MajelisLayout>
      <PageHeader
        title="Dashboard Majelis"
        description="Pengawasan dan manajemen kegiatan gereja"
        breadcrumb={[
          { label: "Majelis", href: "/majelis" },
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
                Efektivitas Program
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                Target tercapai bulan ini
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Komunikasi Aktif
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                Diskusi minggu ini
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Decisions */}
          <Card>
            <CardHeader>
              <CardTitle>Keputusan Menunggu</CardTitle>
              <CardDescription>
                Item yang memerlukan persetujuan majelis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingDecisions.map((decision) => (
                  <div
                    key={decision.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{decision.title}</p>
                      <p className="text-sm text-gray-500">
                        {decision.department} • Deadline: {decision.deadline}
                      </p>
                    </div>
                    <div className="ml-4">
                      {getPriorityBadge(decision.priority)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Lihat Semua Keputusan
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <Card>
            <CardHeader>
              <CardTitle>Rapat Mendatang</CardTitle>
              <CardDescription>
                Jadwal rapat majelis dan evaluasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{meeting.title}</p>
                      <p className="text-sm text-gray-500">
                        {meeting.date} • {meeting.time}
                      </p>
                    </div>
                    <Badge variant="outline">{meeting.attendees} peserta</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Kelola Rapat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Aksi Majelis</CardTitle>
            <CardDescription>
              Fungsi pengawasan dan manajemen utama
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="flex flex-col items-center p-6 h-auto">
                <Activity className="h-6 w-6 mb-2" />
                <span>Monitoring</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto"
              >
                <Users className="h-6 w-6 mb-2" />
                <span>Rapat Baru</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto"
              >
                <FileText className="h-6 w-6 mb-2" />
                <span>Laporan</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto"
              >
                <ClipboardList className="h-6 w-6 mb-2" />
                <span>Keputusan</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MajelisLayout>
  );
}

export default DashboardPageMajelis;
