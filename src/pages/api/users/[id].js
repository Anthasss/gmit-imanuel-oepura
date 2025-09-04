import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/apiHelper";
import { createApiHandler } from "@/lib/apiHandler";
import bcrypt from "bcryptjs";

async function handleGet(req, res) {
  try {
    const { id } = req.query;

    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        role: true,
        idJemaat: true,
        createdAt: true,
        updatedAt: true,
        jemaat: {
          include: {
            statusDalamKeluarga: true,
            keluarga: {
              include: {
                alamat: {
                  include: {
                    kelurahan: true
                  }
                },
                rayon: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res
        .status(404)
        .json(apiResponse(false, null, "User tidak ditemukan"));
    }

    return res
      .status(200)
      .json(apiResponse(true, user, "Data berhasil diambil"));
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json(
        apiResponse(
          false,
          null,
          "Gagal mengambil data user",
          error.message
        )
      );
  }
}

async function handlePatch(req, res) {
  try {
    const { id } = req.query;
    const { email, password, role, idJemaat } = req.body;

    const updateData = {};

    // Update email if provided and different
    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser && existingUser.id !== id) {
        return res
          .status(409)
          .json(apiResponse(false, null, "Email sudah digunakan"));
      }

      updateData.email = email;
    }

    // Update password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 12);
    }

    // Update role if provided
    if (role) {
      updateData.role = role;
    }

    // Handle jemaat relation
    if (role === 'JEMAAT' && idJemaat) {
      // Validate jemaat exists
      const jemaat = await prisma.jemaat.findUnique({
        where: { id: idJemaat }
      });

      if (!jemaat) {
        return res
          .status(404)
          .json(apiResponse(false, null, "Data jemaat tidak ditemukan"));
      }

      // Check if another user already linked to this jemaat
      const existingUserForJemaat = await prisma.user.findUnique({
        where: { idJemaat }
      });

      if (existingUserForJemaat && existingUserForJemaat.id !== id) {
        return res
          .status(409)
          .json(apiResponse(false, null, "Jemaat ini sudah memiliki akun user"));
      }

      updateData.idJemaat = idJemaat;
    } else if (role !== 'JEMAAT') {
      updateData.idJemaat = null;
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: updateData,
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
            nama: true
          }
        }
      }
    });

    return res
      .status(200)
      .json(
        apiResponse(true, updatedUser, "User berhasil diperbarui")
      );
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json(
        apiResponse(
          false,
          null,
          "Gagal memperbarui user",
          error.message
        )
      );
  }
}

async function handleDelete(req, res) {
  try {
    const { id } = req.query;

    const deletedUser = await prisma.user.delete({
      where: { id: id },
      select: {
        id: true,
        email: true,
        role: true
      }
    });

    return res
      .status(200)
      .json(apiResponse(true, deletedUser, "User berhasil dihapus"));
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json(
        apiResponse(
          false,
          null,
          "Gagal menghapus user",
          error.message
        )
      );
  }
}

export default createApiHandler({
  GET: handleGet,
  PATCH: handlePatch,
  DELETE: handleDelete,
});