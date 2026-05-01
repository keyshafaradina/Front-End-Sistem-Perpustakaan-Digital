import Button from "../ui/Button";
import KotakInput from "../ui/KotakInput";

function ProfileCard() {
    return (
        <div className="flex flex-col gap-10">
            <div><h1 className="font-bold text-4xl px-10 py-4">Profile</h1></div>
            <div className="flex gap-20 px-20 justify-center">
                <div className="border border-black px-40 py-40"></div>
                <div className="font-semibold text-2xl gap-4">
                    <KotakInput label="Nama"/>
                    <KotakInput label="Email"/>
                    <KotakInput label="Alamat"/>
                    <KotakInput label="No. Telepon"/>
                </div>
            </div>
            <div className="flex justify-end px-20 py-4">
                <Button>Edit Profil</Button>
            </div>
            <div className="flex justify-start px-20 ">
                <Button>Logout</Button>
            </div>
        </div>
    );
}

export default ProfileCard;