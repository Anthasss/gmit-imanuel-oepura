import React from "react";

export default function UserPage() {
  // Dummy data for demonstration
  const user = {
    profilePic: "https://placehold.co/150x150?text=Profile",
    nik: "1234567890123456",
    nama: "Imanuel Oepura",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "01-01-1990",
    golonganDarah: "O",
    alamat: "Jl. Mawar No. 123, Kupang",
    statusKeluarga: "Anak",
    suku: "Timor",
    pendidikan: "S1",
    pekerjaan: "Software Engineer",
    pendapatan: "Rp 10.000.000",
    jaminanKesehatan: "BPJS"
  };

  return (
    <div className="flex bg-stone-950 min-h-screen items-center justify-center text-white">
      <div className="flex flex-col md:flex-row p-8 pt-24 md:p-8 lg:p-4 gap-8 w-full max-w-6xl items-stretch">
        {/* Column 1 */}
        <div className="flex flex-col items-center md:w-1/3 w-full h-full">
          <img
            src={user.profilePic}
            alt="Profile"
            className="rounded-lg w-full h-full max-w-md object-contain mb-6 border-4 border-primary"
          />
          <button className="btn btn-success w-full mt-2">Edit Profile</button>
        </div>
        {/* Column 2 */}
        <div className="flex flex-col md:w-1/3 w-full gap-6">
          <div>
            <div className="text-gray-300 font-normal">NIK</div>
            <div className="text-white font-bold">{user.nik}</div>
          </div>
          <div>
            <div className="text-gray-300 font-normal">Nama</div>
            <div className="text-white font-bold">{user.nama}</div>
          </div>
          <div>
            <div className="text-gray-300 font-normal">Jenis Kelamin</div>
            <div className="text-white font-bold">{user.jenisKelamin}</div>
          </div>
          <div>
            <div className="text-gray-300 font-normal">Tanggal Lahir</div>
            <div className="text-white font-bold">{user.tanggalLahir}</div>
          </div>
          <div>
            <div className="text-gray-300 font-normal">Golongan Darah</div>
            <div className="text-white font-bold">{user.golonganDarah}</div>
          </div>
          <div>
            <div className="text-gray-300 font-normal">Alamat</div>
            <div className="text-white font-bold">{user.alamat}</div>
          </div>
        </div>
        {/* Column 3 */}
        <div className="flex flex-col md:w-1/3 w-full gap-6">
          <div>
            <div className="text-gray-300 font-normal">Status dalam keluarga</div>
            <div className="text-white font-bold">{user.statusKeluarga}</div>
          </div>
          <div>
            <div className="text-gray-300 font-normal">Suku</div>
            <div className="text-white font-bold">{user.suku}</div>
          </div>
          <div>
            <div className="text-gray-300 font-normal">Pendidikan</div>
            <div className="text-white font-bold">{user.pendidikan}</div>
          </div>
          <div>
            <div className="text-gray-300 font-normal">Pekerjaan</div>
            <div className="text-white font-bold">{user.pekerjaan}</div>
          </div>
          <div>
            <div className="text-gray-300 font-normal">Pendapatan</div>
            <div className="text-white font-bold">{user.pendapatan}</div>
          </div>
          <div>
            <div className="text-gray-300 font-normal">Jaminan Kesehatan</div>
            <div className="text-white font-bold">{user.jaminanKesehatan}</div>
          </div>
        </div>
      </div>
    </div>
  );
}