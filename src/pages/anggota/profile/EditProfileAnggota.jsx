import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import KotakInput from "../../../components/ui/KotakInput";
import PopUp from "../../../components/ui/PopUp";

function EditProfileAnggota() {
    const navigate=useNavigate();

    // state data profile
    const [profile, setProfile] = useState({
        nama: "adadeh",
        email: "adadeh@gmail.com",
        alamat: "Medan",
        telepon: "08123456789",
    });

    // popup
    const [showPopup, setShowPopup] = useState(false);

    // handle perubahan input
    const handleChange = (e) => {

        const { name, value } = e.target;

        setProfile({
            ...profile,
            [name]: value,
        });
    };

    // tombol simpan
    const handleSimpan = () => {

        // popup muncul
        setShowPopup(true);

        // nanti backend:
        // fetch / axios simpan data
    };

    // konfirmasi popup
    const handleSetuju = () => {

        setShowPopup(false);

        navigate("/profileanggota",{state:profile,})
    };

    return (

        <div className="flex flex-col gap-5 mb-5">

            {/* Judul */}
            <div>
                <h1 className="font-bold text-4xl px-10 py-4">
                    Edit Profile
                </h1>
            </div>

            {/* Isi */}
            <div className="flex flex-col lg:flex-row gap-20 px-20 justify-start">

                {/* Foto */}
                <img
                    src="/images/nailong.jpg"
                    alt="foto profil"
                    className="w-50 h-50 lg:w-80 lg:h-96 object-cover"
                />

                {/* Form */}
                <div className="font-semibold text-2xl w-full flex flex-col gap-3">

                    <KotakInput
                        label="Nama"
                        name="nama"
                        value={profile.nama}
                        onChange={handleChange}
                        direction="column"
                    />

                    <KotakInput
                        label="Email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        direction="column"
                    />

                    <KotakInput
                        label="Alamat"
                        name="alamat"
                        value={profile.alamat}
                        onChange={handleChange}
                        direction="column"
                    />

                    <KotakInput
                        label="No. Telepon"
                        name="telepon"
                        value={profile.telepon}
                        onChange={handleChange}
                        direction="column"
                    />

                </div>

            </div>
            <div className="flex justify-end px-20">

                <Button onClick={handleSimpan}>
                    Simpan Perubahan
                </Button>

            </div>
            <PopUp isOpen={showPopup}>

                <h2 className="text-2xl font-bold mb-4">
                    Simpan Perubahan
                </h2>

                <p className="mb-5">
                    Apakah kamu yakin ingin menyimpan perubahan profile?
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setShowPopup(false)}
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-semibold"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSetuju}
                        className="bg-pink-300 hover:bg-pink-400 px-4 py-2 rounded font-semibold"
                    >
                        Ya, Simpan
                    </button>

                </div>

            </PopUp>

        </div>
    );
}

export default EditProfileAnggota;