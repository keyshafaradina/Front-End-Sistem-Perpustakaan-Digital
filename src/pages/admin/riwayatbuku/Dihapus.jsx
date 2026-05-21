import { useState } from "react";
import Button from "../../../components/ui/Button";
import PopUp from "../../../components/ui/PopUp";

export default function Dihapus() {
    const [isOpen, setIsOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const books = [
        {
            id: 1,
            judul: "Laut Bercerita",
            gambar: "/images/nailong.jpg",
            sisaHari: 12,
        },
        {
            id: 2,
            judul: "Pulang",
            gambar: "/images/nailong.jpg",
            sisaHari: 17,
        },
        {
            id: 3,
            judul: "Hujan",
            gambar: "/images/nailong.jpg",
            sisaHari: 20,
        },
        {
            id: 4,
            judul: "Bumi",
            gambar: "/images/nailong.jpg",
            sisaHari: 22,
        },
    ];

    const handlePopup = (book) => {
        setSelectedBook(book);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        setIsOpen(false);
        setSuccessOpen(true);
    };

    return (
        <div className="m-8 flex flex-col gap-3">
            <h1 className="font-bold text-2xl text-center">Telah Dihapus</h1>
            <h3 className="text-center">Buku yang telah dihapus dapat dipulihkan sebelum 30 hari!</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="border shadow-md bg-pink-100 rounded-xl p-4"
                    >
                        <div className="flex justify-between items-center gap-4">
                            <img
                                src={book.gambar}
                                alt="cover buku"
                                className="w-20 h-24 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h1 className="font-bold text-base md:text-lg lg:text-lg">{book.judul}</h1>
                                <p className="text-xs md:text-sm text-red-500 font-medium">Akan dihapus permanen dalam {book.sisaHari} hari</p>
                            </div>
                            <Button onClick={() => handlePopup(book)}>Pulihkan</Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* POPUP KONFIRMASI */}
            <PopUp isOpen={isOpen}>
                <div className="flex flex-col gap-5 items-center">
                    <h2 className="font-bold text-lg text-center">Yakin ingin memulihkan buku?</h2>
                    <p className="text-center">{selectedBook?.judul}</p>
                    <div className="flex gap-3">
                        <Button
                            className="bg-gray-300 hover:bg-gray-200"
                            onClick={() => setIsOpen(false)}
                        >Batal</Button>

                        <Button onClick={handleConfirm}>Ya</Button>
                    </div>
                </div>
            </PopUp>
            {/* POPUP BERHASIL */}
            <PopUp isOpen={successOpen}>
                <div className="flex flex-col gap-5 items-center">
                    <h2 className="font-bold text-lg text-center">Buku berhasil dipulihkan!</h2>
                    <Button onClick={() => setSuccessOpen(false)}>Oke</Button>
                </div>
            </PopUp>
        </div>
    );
}