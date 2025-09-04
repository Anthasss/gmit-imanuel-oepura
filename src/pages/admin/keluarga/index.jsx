import ListGrid from "@/components/ui/ListGrid";
import keluargaService from "@/services/keluargaService";
import { useQuery } from "@tanstack/react-query";
import { Edit, Eye, Trash2, Users } from "lucide-react";

export default function KeluargaPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["keluarga"],
    queryFn: () => keluargaService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
  });

  const columns = [
    {
      key: "noBagungan",
      label: "No. Bangunan",
      type: "text",
      render: (value) => value || "-",
    },
    {
      key: "alamat",
      label: "Alamat",
      type: "text",
      render: (value, row) => {
        if (!value) return "-";
        return `${value.jalan}, RT ${value.rt}/RW ${value.rw}`;
      },
    },
    {
      key: "kelurahan",
      label: "Kelurahan",
      type: "text",
      render: (value, row) => {
        return row.alamat?.kelurahan?.nama || "-";
      },
    },
    {
      key: "kecamatan",
      label: "Kecamatan",
      type: "text",
      render: (value, row) => {
        return row.alamat?.kelurahan?.kecamatan?.nama || "-";
      },
    },
    {
      key: "kotaKab",
      label: "Kota/Kabupaten",
      type: "text",
      render: (value, row) => {
        return row.alamat?.kelurahan?.kecamatan?.kotaKab?.nama || "-";
      },
    },
    {
      key: "statusKeluarga",
      label: "Status Keluarga",
      type: "badge",
      render: (value) => {
        const status = value?.status || "-";
        const badgeClass =
          status === "Kawin"
            ? "bg-green-100 text-green-800"
            : status === "Belum Kawin"
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
      key: "statusKepemilikanRumah",
      label: "Status Rumah",
      type: "badge",
      render: (value) => {
        const status = value?.status || "-";
        const badgeClass =
          status === "Milik Sendiri"
            ? "bg-green-100 text-green-800"
            : status === "Kredit/KPR"
              ? "bg-yellow-100 text-yellow-800"
              : status === "Sewa"
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
      key: "keadaanRumah",
      label: "Keadaan Rumah",
      type: "badge",
      render: (value) => {
        const keadaan = value?.keadaan || "-";
        const badgeClass =
          keadaan === "Sangat Baik"
            ? "bg-green-100 text-green-800"
            : keadaan === "Baik"
              ? "bg-blue-100 text-blue-800"
              : keadaan === "Cukup Baik"
                ? "bg-yellow-100 text-yellow-800"
                : keadaan === "Kurang Baik"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800";

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}
          >
            {keadaan}
          </span>
        );
      },
    },
    {
      key: "rayon",
      label: "Rayon",
      type: "text",
      render: (value) => value?.namaRayon || "-",
    },
    {
      key: "jemaats",
      label: "Jumlah Anggota",
      type: "text",
      render: (value) => {
        const count = value?.length || 0;
        return (
          <span className="flex items-center text-sm">
            <Users className="w-4 h-4 mr-1 text-blue-500" />
            {count} orang
          </span>
        );
      },
    },
    {
      key: "kepalaKeluarga",
      label: "Kepala Keluarga",
      type: "text",
      render: (value, row) => {
        const kepalaKeluarga = row.jemaats?.find(
          (jemaat) => jemaat.statusDalamKeluarga?.status === "Kepala Keluarga"
        );
        return kepalaKeluarga?.nama || "-";
      },
    },
  ];

  return (
    <>
      <ListGrid
        rowActionType="vertical"
        rowActions={[
          {
            label: "Detail",
            icon: Eye,
            href: (row) => `/admin/keluarga/${row.id}`,
            variant: "info",
          },
          {
            label: "Edit",
            icon: Edit,
            href: (row) => `/admin/keluarga/${row.id}/edit`,
            variant: "warning",
          },
          {
            label: "Hapus",
            icon: Trash2,
            onClick: (row) => {
              if (
                confirm(
                  `Apakah Anda yakin ingin menghapus keluarga dengan No. Bangunan ${row.noBagungan}?`
                )
              ) {
                // Handle delete logic here
                console.log("Delete keluarga:", row.id);
              }
            },
            variant: "danger",
          },
        ]}
        breadcrumb={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Keluarga", href: "/admin/keluarga" },
        ]}
        data={data?.data?.items || []}
        columns={columns}
        description="Kelola data keluarga jemaat gereja"
        title="Manajemen Keluarga"
        isLoading={isLoading}
        error={error}
        searchable={true}
        searchPlaceholder="Cari berdasarkan alamat, kepala keluarga..."
      />
    </>
  );
}
