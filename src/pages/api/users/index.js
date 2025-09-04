import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/apiHelper";
import { parseQueryParams } from "@/lib/queryParams";
import { createApiHandler } from "@/lib/apiHandler";
import bcrypt from "bcryptjs";

async function handleGet(req, res) {
  try {
    const { pagination, sort, where } = parseQueryParams(req.query, {
      searchField: "email",
      defaultSortBy: "email",
    });

    const total = await prisma.user.count({ where });

    const items = await prisma.user.findMany({
      where,
      skip: pagination.skip,
      take: pagination.take,
      orderBy: {
        [sort.sortBy]: sort.sortOrder,
      },
      select: {
        id: true,
        email: true,
        role: true,
        idJemaat: true,
        createdAt: true,
        updatedAt: true,
        jemaat: {
          select: {
            id: true,
            nama: true,
            jenisKelamin: true,
            tanggalLahir: true,
            statusDalamKeluarga: {
              select: {
                status: true,
              },
            },
            keluarga: {
              select: {
                noBagungan: true,
                rayon: {
                  select: {
                    namaRayon: true,
                  },
                },
              },
            },
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
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json(
        apiResponse(false, null, "Gagal mengambil data user", error.message)
      );
  }
}

async function handlePost(req, res) {
  try {
    const { email, password, role, idJemaat } = req.body;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(409)
        .json(apiResponse(false, null, "Email sudah terdaftar"));
    }

    // Validate jemaat if role is JEMAAT
    if (role === "JEMAAT" && idJemaat) {
      const jemaat = await prisma.jemaat.findUnique({
        where: { id: idJemaat },
      });

      if (!jemaat) {
        return res
          .status(404)
          .json(apiResponse(false, null, "Data jemaat tidak ditemukan"));
      }

      // Check if jemaat already has a user account
      const existingUserForJemaat = await prisma.user.findUnique({
        where: { idJemaat },
      });

      if (existingUserForJemaat) {
        return res
          .status(409)
          .json(
            apiResponse(false, null, "Jemaat ini sudah memiliki akun user")
          );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        idJemaat: role === "JEMAAT" ? idJemaat : null,
      },
      select: {
        id: true,
        email: true,
        role: true,
        idJemaat: true,
        createdAt: true,
        updatedAt: true,
        jemaat: {
          select: {
            id: true,
            nama: true,
          },
        },
      },
    });

    return res
      .status(201)
      .json(apiResponse(true, newUser, "User berhasil ditambahkan"));
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json(apiResponse(false, null, "Gagal menambahkan user", error.message));
  }
}

export default createApiHandler({
  GET: handleGet,
  POST: handlePost,
});
