"use client";

import EmployeeLayout from "@/components/layout/EmployeeLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import {
  Activity,
  Calendar,
  CheckSquare,
  Clock,
  FileText,
  Heart,
  Mail,
  UserCheck,
} from "lucide-react";

export default function DashboardPageEmployee() {
  // Dummy data for demonstration
  const employeeStats = {
    tasksCompleted: 18,
    upcomingTasks: 5,
    servicesThisMonth: 12,
    attendanceRate: 95,
  };

  const upcomingTasks = [
    {
      id: 1,
      title: "Persiapan Ibadah Minggu",
      deadline: "2025-09-01",
      priority: "high",
      category: "Liturgi",
    },
    {
      id: 2,
      title: "Koordinasi Komsel Remaja",
      deadline: "2025-09-03",
      priority: "medium",
      category: "Pemuda",
    },
    {
      id: 3,
      title: "Laporan Keuangan Mingguan",
      deadline: "2025-09-05",
      priority: "medium",
      category: "Keuangan",
    },
  ];

  const recentServices = [
    {
      id: 1,
      service: "Operator Musik",
      date: "2025-08-25",
      status: "completed",
    },
    {
      id: 2,
      service: "Koordinator Ibadah",
      date: "2025-08-22",
      status: "completed",
    },
    {
      id: 3,
      service: "Tim Dekorasi",
      date: "2025-08-20",
      status: "completed",
    },
  ];

  const headerStats = [
    {
      label: "Tugas Selesai",
      value: employeeStats.tasksCompleted,
      icon: CheckSquare,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      change: "Bulan ini",
      changeType: "positive",
    },
    {
      label: "Tugas Mendatang",
      value: employeeStats.upcomingTasks,
      icon: Clock,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      change: "Minggu ini",
      changeType: "neutral",
    },
    {
      label: "Pelayanan Aktif",
      value: employeeStats.servicesThisMonth,
      icon: Heart,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      change: "Bulan ini",
      changeType: "neutral",
    },
    {
      label: "Tingkat Kehadiran",
      value: `${employeeStats.attendanceRate}%`,
      icon: UserCheck,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      change: "Sangat baik",
      changeType: "positive",
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Selesai</Badge>;
      case "in-progress":
        return <Badge variant="warning">Berlangsung</Badge>;
      case "pending":
        return <Badge variant="outline">Menunggu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <EmployeeLayout>
      <PageHeader
        title="Dashboard Pegawai"
        description="Manajemen tugas dan pelayanan harian"
        breadcrumb={[
          { label: "Pegawai", href: "/employee" },
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
                Produktivitas Hari Ini
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">
                Target harian tercapai
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Komunikasi Aktif
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-muted-foreground">Pesan minggu ini</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Tugas Mendatang</CardTitle>
              <CardDescription>Tugas yang perlu diselesaikan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-gray-500">
                        {task.category} • Deadline: {task.deadline}
                      </p>
                    </div>
                    <div className="ml-4">
                      {getPriorityBadge(task.priority)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Lihat Semua Tugas
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Services */}
          <Card>
            <CardHeader>
              <CardTitle>Pelayanan Terbaru</CardTitle>
              <CardDescription>
                Riwayat pelayanan yang telah dilakukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{service.service}</p>
                      <p className="text-sm text-gray-500">{service.date}</p>
                    </div>
                    {getStatusBadge(service.status)}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Lihat Riwayat Pelayanan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>
              Fungsi yang sering digunakan dalam pelayanan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="flex flex-col items-center p-6 h-auto">
                <CheckSquare className="h-6 w-6 mb-2" />
                <span>Tugas Baru</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto"
              >
                <Calendar className="h-6 w-6 mb-2" />
                <span>Jadwal</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto"
              >
                <Heart className="h-6 w-6 mb-2" />
                <span>Daftar Pelayanan</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto"
              >
                <FileText className="h-6 w-6 mb-2" />
                <span>Laporan</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  );
}
