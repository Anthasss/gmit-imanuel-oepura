import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/apiHelper";
import { parseQueryParams } from "@/lib/queryParams";
import { createApiHandler } from "@/lib/apiHandler";

async function handleGet(req, res) {
  try {
    const { pagination, sort, where } = parseQueryParams(req.query, {
      searchField: "noBagungan",
      defaultSortBy: "noBagungan",
    });

    const total = await prisma.keluarga.count({ where });

    const items = await prisma.keluarga.findMany({
      where,
      skip: pagination.skip,
      take: pagination.take,
      orderBy: {
        [sort.sortBy]: sort.sortOrder,
      },
      include: {
        alamat: {
          include: {
            kelurahan: {
              include: {
                kecamatan: {
                  include: {
                    kotaKab: {
                      include: {
                        provinsi: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        statusKeluarga: true,
        statusKepemilikanRumah: true,
        keadaanRumah: true,
        rayon: true,
        jemaats: {
          include: {
            statusDalamKeluarga: true,
          },
        },
      },
    });

    const totalPages = Math.ceil(total / pagination.limit);

    const result = {
      items,
      pagination: {
        ...pagination,
        total,
        totalPages,
        hasNext: pagination.page < totalPages,
        hasPrev: pagination.page > 1,
      },
    };

    return res
      .status(200)
      .json(apiResponse(true, result, "Data berhasil diambil"));
  } catch (error) {
    console.error("Error fetching keluarga:", error);
    return res
      .status(500)
      .json(
        apiResponse(false, null, "Gagal mengambil data keluarga", error.message)
      );
  }
}

async function handlePost(req, res) {
  try {
    const data = req.body;

    const newKeluarga = await prisma.keluarga.create({
      data,
      include: {
        alamat: {
          include: {
            kelurahan: {
              include: {
                kecamatan: {
                  include: {
                    kotaKab: {
                      include: {
                        provinsi: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        statusKeluarga: true,
        statusKepemilikanRumah: true,
        keadaanRumah: true,
        rayon: true,
      },
    });

    return res
      .status(201)
      .json(apiResponse(true, newKeluarga, "Data berhasil ditambahkan"));
  } catch (error) {
    console.error("Error creating keluarga:", error);
    return res
      .status(500)
      .json(
        apiResponse(
          false,
          null,
          "Gagal menambahkan data keluarga",
          error.message
        )
      );
  }
}

export default createApiHandler({
  GET: handleGet,
  POST: handlePost,
});
