import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/apiHelper";
import { createApiHandler } from "@/lib/apiHandler";
import { requireAuth } from "@/lib/auth";

async function handleGet(req, res) {
  try {
    // Check authentication
    const authResult = await requireAuth(req, res);
    
    if (authResult.error) {
      return res
        .status(authResult.status)
        .json(apiResponse(false, null, authResult.error));
    }

    const { user } = authResult;
    
    // Build where clauses based on user role
    let keluargaWhere = {};
    let jemaatWhere = {};
    let rayonWhere = {};
    
    // If user is MAJELIS, filter by their rayon
    if (user.role === 'MAJELIS' && user.majelis && user.majelis.idRayon) {
      keluargaWhere.idRayon = user.majelis.idRayon;
      jemaatWhere.keluarga = {
        idRayon: user.majelis.idRayon
      };
      rayonWhere.id = user.majelis.idRayon;
    }

    // Fetch all options in parallel
    const [jenisIbadahs, kategoriJadwals, jemaats, keluargas, rayons] = await Promise.all([
      // Jenis Ibadah
      prisma.jenisIbadah.findMany({
        where: { isActive: true },
        select: {
          id: true,
          namaIbadah: true,
        },
        orderBy: { namaIbadah: 'asc' }
      }),
      
      // Kategori Jadwal
      prisma.kategoriJadwal.findMany({
        where: { isActive: true },
        select: {
          id: true,
          namaKategori: true,
          deskripsi: true,
        },
        orderBy: { namaKategori: 'asc' }
      }),
      
      // Jemaat (Pemimpin)
      prisma.jemaat.findMany({
        where: jemaatWhere,
        select: {
          id: true,
          nama: true,
          jenisKelamin: true,
          keluarga: {
            select: {
              noBagungan: true,
              rayon: {
                select: {
                  namaRayon: true,
                }
              }
            }
          }
        },
        orderBy: { nama: 'asc' }
      }),
      
      // Keluarga
      prisma.keluarga.findMany({
        where: keluargaWhere,
        select: {
          id: true,
          noBagungan: true,
          rayon: {
            select: {
              id: true,
              namaRayon: true,
            }
          }
        },
        orderBy: { noBagungan: 'asc' }
      }),
      
      // Rayon
      prisma.rayon.findMany({
        where: rayonWhere,
        select: {
          id: true,
          namaRayon: true,
        },
        orderBy: { namaRayon: 'asc' }
      })
    ]);

    // Format options
    const options = {
      jenisIbadah: jenisIbadahs.map(item => ({
        value: item.id,
        label: item.namaIbadah,
      })),
      
      kategoriJadwal: kategoriJadwals.map(item => ({
        value: item.id,
        label: item.namaKategori,
        deskripsi: item.deskripsi,
      })),
      
      pemimpin: jemaats.map(item => ({
        value: item.id,
        label: `${item.nama} (${item.jenisKelamin ? 'L' : 'P'}) - Bangunan ${item.keluarga.noBagungan}`,
        nama: item.nama,
        jenisKelamin: item.jenisKelamin,
        keluarga: item.keluarga
      })),
      
      keluarga: keluargas.map(item => ({
        value: item.id,
        label: `Bangunan ${item.noBagungan} - ${item.rayon.namaRayon}`,
        noBagungan: item.noBagungan,
        rayon: item.rayon
      })),
      
      rayon: rayons.map(item => ({
        value: item.id,
        label: item.namaRayon,
      }))
    };

    return res
      .status(200)
      .json(apiResponse(true, options, "Data berhasil diambil"));
  } catch (error) {
    console.error("Error fetching jadwal ibadah options:", error);
    return res
      .status(500)
      .json(
        apiResponse(
          false,
          null,
          "Gagal mengambil data options",
          error.message
        )
      );
  }
}

export default createApiHandler({
  GET: handleGet,
});