import { z } from "zod";

// Provinsi
export const provinsiSchema = z.object({
  nama: z.string().min(2, "Nama wajib diisi"),
});

// Kabupaten (jika ada)
export const kabupatenSchema = z.object({
  nama: z.string().min(2, "Nama kabupaten wajib diisi"),
  provinsiId: z.string().nonempty("Provinsi wajib dipilih"),
});

export const kotaKabupatenSchema = z.object({
  nama: z.string().min(2, "Nama kota/kabupaten wajib diisi"),
  idProvinsi: z.string().nonempty("ID Provinsi wajib dipilih"),
});

export const kecamatanSchema = z.object({
  nama: z.string().min(2, "Nama kecamatan wajib diisi"),
  idKotaKab: z.string().nonempty("ID Kota/Kabupaten wajib dipilih"),
});

export const kelurahanDesaSchema = z.object({
  nama: z.string().min(2, "Nama kelurahan/desa wajib diisi"),
  idKecamatan: z.string().nonempty("ID Kecamatan wajib dipilih"),
  kodePos: z.string().min(5, "Kode pos harus 5 digit"),
});
