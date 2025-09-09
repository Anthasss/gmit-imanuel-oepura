// pages/admin/master-data/item-keuangan.jsx
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Edit,
  Eye,
  Trash2,
  Plus,
  Download,
  Filter,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ViewModal from "@/components/ui/ViewModal";
import EditModal from "@/components/ui/EditModal";
import CreateModal from "@/components/ui/CreateModal";

import { useRouter } from "next/navigation";
// Service untuk API calls
const itemKeuanganService = {
  get: async (params) => {
    const response = await axios.get("/api/keuangan/item", { params });
    return response.data;
  },
  create: async (data) => {
    const response = await axios.post("/api/keuangan/item", data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await axios.patch(`/api/keuangan/item/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await axios.delete(`/api/keuangan/item/${id}`);
    return response.data;
  },
};

export default function ItemKeuanganPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // State untuk modal dan dialog
  const [deleteItem, setDeleteItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  // State untuk filter dan search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  // Format rupiah helper
  const formatRupiah = (amount) => {
    if (!amount || amount === null || amount === "0" || amount === 0)
      return "Rp 0";
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount === 0) return "Rp 0";
    return `Rp ${numAmount.toLocaleString("id-ID")}`;
  };

  // Query untuk fetch data
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "item-keuangan",
      { search: searchTerm, category: selectedCategory, level: selectedLevel },
    ],
    queryFn: () =>
      itemKeuanganService.get({
        search: searchTerm,
        kategoriId: selectedCategory !== "all" ? selectedCategory : undefined,
        level: selectedLevel !== "all" ? selectedLevel : undefined,
      }),
    staleTime: 5 * 60 * 1000,
  });

  // Query untuk kategori options
  const { data: kategoriOptions } = useQuery({
    queryKey: ["kategori-keuangan-options"],
    queryFn: async () => {
      const response = await axios.get("/api/keuangan/kategori/options");
      return response.data;
    },
  });

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: (id) => itemKeuanganService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["item-keuangan"] });
      toast.success("Item keuangan berhasil dihapus");
      setDeleteItem(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal menghapus data");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => itemKeuanganService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["item-keuangan"] });
      toast.success("Item keuangan berhasil diperbarui");
      setEditItem(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal memperbarui data");
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => itemKeuanganService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["item-keuangan"] });
      toast.success("Item keuangan berhasil ditambahkan");
      setShowCreate(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal menambahkan data");
    },
  });

  // Helper untuk render hierarki tree
  const buildTree = (items) => {
    const itemMap = new Map();
    const rootItems = [];

    // Buat map untuk akses cepat
    items.forEach((item) => {
      itemMap.set(item.id, { ...item, children: [] });
    });

    // Build tree
    items.forEach((item) => {
      const itemWithChildren = itemMap.get(item.id);

      if (item.parentId) {
        const parent = itemMap.get(item.parentId);
        if (parent) {
          parent.children.push(itemWithChildren);
        }
      } else {
        rootItems.push(itemWithChildren);
      }
    });

    return rootItems.sort((a, b) => a.urutan - b.urutan);
  };

  // Render item dalam bentuk tree dengan indentasi
  const renderTreeItem = (item, level = 0) => {
    const indentClass = level > 0 ? `pl-${level * 6}` : "";
    const items = data?.data?.items || [];

    return (
      <div key={item.id}>
        {/* Item utama */}
        <div
          className={`flex items-center justify-between p-4 border-b hover:bg-gray-50 ${indentClass}`}
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              {/* Indikator level dengan garis */}
              {level > 0 && (
                <div className="flex items-center">
                  {Array.from({ length: level }).map((_, i) => (
                    <div key={i} className="w-4 h-px bg-gray-300 mr-2" />
                  ))}
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {item.kode}
                  </span>
                  <span className="font-medium">{item.nama}</span>
                  <Badge variant={item.isActive ? "success" : "secondary"}>
                    Level {item.level}
                  </Badge>
                </div>

                <div className="text-sm text-gray-500 mt-1">
                  Kategori: {item.kategori?.nama || "-"} | Parent:{" "}
                  {item.parent?.nama || "Root"} | Sub Item:{" "}
                  {item._count?.children || 0}
                </div>

                {item.totalTarget && (
                  <div className="text-sm text-green-600 mt-1">
                    Target: {formatRupiah(item.totalTarget)}
                    {item.targetFrekuensi && item.satuanFrekuensi && (
                      <span className="text-gray-500 ml-2">
                        ({item.targetFrekuensi} {item.satuanFrekuensi} ×{" "}
                        {formatRupiah(item.nominalSatuan)})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewItem(item)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditItem(item)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteItem(item)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Render children */}
        {item.children && item.children.length > 0 && (
          <div>
            {item.children
              .sort((a, b) => a.urutan - b.urutan)
              .map((child) => renderTreeItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Form fields untuk modal
  const formFields = [
    {
      key: "kategoriId",
      label: "Kategori",
      type: "select",
      options:
        kategoriOptions?.data?.map((cat) => ({
          value: cat.id,
          label: `${cat.kode} - ${cat.nama}`,
        })) || [],
      required: true,
      placeholder: "Pilih kategori keuangan",
    },
    {
      key: "parentId",
      label: "Parent Item",
      type: "select",
      options:
        data?.data?.items?.map((item) => ({
          value: item.id,
          label: `${item.kode} - ${item.nama}`,
        })) || [],
      placeholder: "Pilih parent item (opsional)",
    },
    {
      key: "nama",
      label: "Nama Item",
      type: "text",
      required: true,
      placeholder: "Contoh: Persembahan Perpuluhan",
    },
    {
      key: "deskripsi",
      label: "Deskripsi",
      type: "textarea",
      placeholder: "Deskripsi detail item keuangan",
      rows: 3,
    },
    {
      key: "targetFrekuensi",
      label: "Target Frekuensi",
      type: "number",
      placeholder: "Contoh: 12",
    },
    {
      key: "satuanFrekuensi",
      label: "Satuan Frekuensi",
      type: "select",
      options: [
        { value: "Kali", label: "Kali" },
        { value: "Bulan", label: "Per Bulan" },
        { value: "Tahun", label: "Per Tahun" },
        { value: "Minggu", label: "Per Minggu" },
        { value: "Hari", label: "Per Hari" },
      ],
      placeholder: "Pilih satuan",
    },
    {
      key: "nominalSatuan",
      label: "Nominal Per Satuan",
      type: "number",
      placeholder: "Masukkan nominal per satuan",
    },
    {
      key: "totalTarget",
      label: "Total Target Anggaran",
      type: "number",
      placeholder: "Masukkan total target anggaran",
    },
    {
      key: "isActive",
      label: "Status Aktif",
      type: "checkbox",
      defaultValue: true,
    },
  ];

  // View fields untuk modal detail
  const viewFields = [
    { key: "kode", label: "Kode Item" },
    { key: "nama", label: "Nama Item" },
    { key: "deskripsi", label: "Deskripsi" },
    {
      key: "kategori",
      label: "Kategori",
      getValue: (item) =>
        item?.kategori ? `${item.kategori.kode} - ${item.kategori.nama}` : "-",
    },
    {
      key: "parent",
      label: "Parent Item",
      getValue: (item) =>
        item?.parent
          ? `${item.parent.kode} - ${item.parent.nama}`
          : "Root Item",
    },
    { key: "level", label: "Level Hierarki" },
    { key: "urutan", label: "Urutan" },
    { key: "targetFrekuensi", label: "Target Frekuensi" },
    { key: "satuanFrekuensi", label: "Satuan Frekuensi" },
    {
      key: "nominalSatuan",
      label: "Nominal Per Satuan",
      getValue: (item) =>
        item?.nominalSatuan ? formatRupiah(item.nominalSatuan) : "-",
    },
    {
      key: "totalTarget",
      label: "Total Target Anggaran",
      getValue: (item) =>
        item?.totalTarget ? formatRupiah(item.totalTarget) : "-",
    },
    {
      key: "_count",
      label: "Jumlah Sub Item",
      getValue: (item) => `${item?._count?.children || 0} item`,
    },
    {
      key: "isActive",
      label: "Status",
      getValue: (item) => (item?.isActive ? "Aktif" : "Tidak Aktif"),
    },
  ];

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">
          Error loading data: {error.message}
        </div>
      </div>
    );
  }

  const items = data?.data?.items || [];
  const tree = buildTree(items);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Kelola Item Keuangan</h1>
          <p className="text-gray-600">
            Kelola item keuangan dengan struktur hierarkis untuk sistem anggaran
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => {}}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={() =>
              router.push("/admin/data-master/keuangan/item/create")
            }
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Item
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari nama item..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Semua Kategori</option>
              {kategoriOptions?.data?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.kode} - {cat.nama}
                </option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="all">Semua Level</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              <option value="4">Level 4</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Item Keuangan ({items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : tree.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Tidak ada data item keuangan
            </div>
          ) : (
            <div className="border rounded-lg">
              {tree.map((item) => renderTreeItem(item))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={() => deleteMutation.mutate(deleteItem.id)}
        title="Hapus Item Keuangan"
        message={`Apakah Anda yakin ingin menghapus "${deleteItem?.nama}"? Data yang sudah dihapus tidak dapat dikembalikan.`}
        variant="danger"
        isLoading={deleteMutation.isPending}
      />

      <ViewModal
        isOpen={!!viewItem}
        onClose={() => setViewItem(null)}
        title="Detail Item Keuangan"
        data={
          viewItem
            ? viewFields.map((field) => ({
                label: field.label,
                value: field.getValue
                  ? field.getValue(viewItem)
                  : viewItem?.[field.key],
              }))
            : []
        }
      />

      <EditModal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        onSubmit={(formData) =>
          updateMutation.mutate({ id: editItem.id, data: formData })
        }
        title="Edit Item Keuangan"
        fields={formFields}
        initialData={editItem}
        isLoading={updateMutation.isPending}
      />

      {/* <CreateModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={(formData) => createMutation.mutate(formData)}
        title="Tambah Item Keuangan"
        fields={formFields}
        isLoading={createMutation.isPending}
      /> */}
    </div>
  );
}
