export default function ProfileAdmin() {
  return (
    <div className="bg-white shadow rounded p-6">
      
      <h2 className="font-bold text-2xl">Profil</h2>

      <div className="flex gap-6">


        <div className="flex flex-col items-center">
          <img
            src="/images/foto admin.jpeg"
            alt="admin"
            className="w-48 h-48 object-cover border mt-3"
          />

          <button className="mr-auto bg-pink-300 px-4 py-1 mt-20 rounded">
            Logout
          </button>
        </div>

        {/*FORM */}
        <div className="flex-1 space-y-3">

          <div>
            <label className="text-sm">Nama</label>
            <input type="text" defaultValue="Budi Santoso"
              className="w-full border rounded-lg px-3 py-1"/>
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input type="text" defaultValue="perpus@gmail.com"
              className="w-full border rounded-lg px-3 py-1" />
          </div>

          <div>
            <label className="text-sm">Alamat</label>
            <input type="text" defaultValue="Jauh di sana"
              className="w-full border rounded-lg px-3 py-1" />
          </div>

          <div>
            <label className="text-sm">Jabatan</label>
            <input type="text"defaultValue="Pustakawan"
              className="w-full border rounded-lg px-3 py-1" />
          </div>

          {/* BUTTON */}
          <div className="flex justify-end mt-4">
            <button className="bg-pink-300 px-3 py-1 mt rounded">
              Edit Profil
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}