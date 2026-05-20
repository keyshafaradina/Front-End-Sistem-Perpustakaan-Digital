import Button from "../../components/ui/Button";
import KotakInput from "../../components/ui/KotakInput";
import { Link, useLocation } from "react-router-dom";

function ProfileAdmin() {
    const location=useLocation();
    const profile = location.state || {
    nama: "adadeh",
    email: "adadeh@gmail.com",
    alamat: "Medan",
    telepon: "08123456789",
};
    return (
        <div className="flex flex-col gap-5 mb-5">
            <div><h1 className="font-bold text-4xl px-10 py-4">Profile</h1></div>
            <div className="flex flex-col lg:flex-row gap-20 px-20 justify-start">
                <img src="/images/nailong.jpg" alt="foto profil" className="w-50 h-50 lg:w-80 lg:h-96 object-cover"/>
                <div className="font-semibold text-2xl w-full">
                    <KotakInput label="Nama" value={profile.nama} direction="column"/>
                    <KotakInput label="Email" value={profile.email} direction="column"/>
                    <KotakInput label="Alamat" value={profile.alamat} direction="column"/>
                    <KotakInput label="No. Telepon" value={profile.telepon} direction="column"/>
                </div>
            </div>
            <div className="flex justify-end px-20 ">
                <Link to="/editprofileadmin"><Button>Edit Profil</Button></Link>
            </div>
            <div className="flex justify-start px-20">
                <Link to="/"><Button>Logout</Button></Link>
            </div>
        </div>
    );
}

export default ProfileAdmin;