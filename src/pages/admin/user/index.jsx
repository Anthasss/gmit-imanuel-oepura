import ListGrid from "@/components/ui/ListGrid";
import userService from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  UserCheck,
  UserX,
  Mail,
  Calendar,
} from "lucide-react";

export default function UserPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
  });

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const columns = [
    {
      key: "email",
      label: "Email",
      type: "text",
      render: (value) => (
        <span className="flex items-center text-sm">
          <Mail className="w-4 h-4 mr-2 text-gray-400" />
          {value || "-"}
        </span>
      ),
    },
    {
      key: "role",
      label: "Role",
      type: "badge",
      render: (value) => {
        const badgeClass =
          value === "ADMIN"
            ? "bg-purple-100 text-purple-800"
            : value === "JEMAAT"
              ? "bg-green-100 text-green-800"
              : value === "PENDETA"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800";

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}
          >
            {value || "-"}
          </span>
        );
      },
    },
    {
      key: "jemaat",
      label: "Nama Jemaat",
      type: "text",
      render: (value) => value?.nama || "-",
    },
    {
      key: "jenisKelamin",
      label: "Jenis Kelamin",
      type: "text",
      render: (value, row) => {
        const gender = row.jemaat?.jenisKelamin;
        if (gender === null || gender === undefined) return "-";

        return (
          <span className="flex items-center text-sm">
            {gender ? (
              <>
                <UserCheck className="w-4 h-4 mr-1 text-blue-500" />
                Laki-laki
              </>
            ) : (
              <>
                <UserX className="w-4 h-4 mr-1 text-pink-500" />
                Perempuan
              </>
            )}
          </span>
        );
      },
    },
    {
      key: "tanggalLahir",
      label: "Tanggal Lahir",
      type: "text",
      render: (value, row) => {
        const birthDate = row.jemaat?.tanggalLahir;
        if (!birthDate) return "-";

        return (
          <span className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
            {formatDate(birthDate)}
          </span>
        );
      },
    },
    {
      key: "statusDalamKeluarga",
      label: "Status Keluarga",
      type: "badge",
      render: (value, row) => {
        const status = row.jemaat?.statusDalamKeluarga?.status;
        if (!status) return "-";

        const badgeClass =
          status === "Kepala Keluarga"
            ? "bg-yellow-100 text-yellow-800"
            : status === "Istri"
              ? "bg-pink-100 text-pink-800"
              : status === "Anak"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800";

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      key: "noBagungan",
      label: "No. Bangunan",
      type: "text",
      render: (value, row) => {
        return row.jemaat?.keluarga?.noBagungan || "-";
      },
    },
    {
      key: "rayon",
      label: "Rayon",
      type: "text",
      render: (value, row) => {
        return row.jemaat?.keluarga?.rayon?.namaRayon || "-";
      },
    },
    {
      key: "createdAt",
      label: "Tgl Dibuat",
      type: "text",
      render: (value) => (
        <span className="text-sm text-gray-600">{formatDate(value)}</span>
      ),
    },
    {
      key: "status",
      label: "Status Akun",
      type: "badge",
      render: (value, row) => {
        // Assuming active if user exists and has recent activity
        const isActive = true; // You can add logic based on your requirements

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isActive ? "Aktif" : "Tidak Aktif"}
          </span>
        );
      },
    },
  ];

  const actions = [
    {
      label: "Tambah User",
      href: "/admin/users/create",
      icon: Plus,
      variant: "primary",
    },
  ];

  const rowActions = [
    {
      label: "Detail",
      icon: Eye,
      href: (row) => `/admin/users/${row.id}`,
      variant: "info",
    },
    {
      label: "Edit",
      icon: Edit,
      href: (row) => `/admin/users/${row.id}/edit`,
      variant: "warning",
    },
    {
      label: "Hapus",
      icon: Trash2,
      onClick: (row) => {
        if (confirm(`Apakah Anda yakin ingin menghapus user ${row.email}?`)) {
          // Handle delete logic here
          console.log("Delete user:", row.id);
        }
      },
      variant: "danger",
    },
  ];

  return (
    <>
      <ListGrid
        actions={actions}
        rowActions={rowActions}
        breadcrumb={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Users", href: "/admin/users" },
        ]}
        data={data?.data?.items || []}
        columns={columns}
        description="Kelola data pengguna sistem"
        title="Manajemen Users"
        isLoading={isLoading}
        error={error}
        searchable={true}
        searchPlaceholder="Cari berdasarkan email, nama..."
        emptyStateProps={{
          title: "Belum Ada Data User",
          description: "Mulai dengan menambahkan user pertama",
          actionLabel: "Tambah User",
          actionHref: "/admin/users/create",
        }}
      />
    </>
  );
}
