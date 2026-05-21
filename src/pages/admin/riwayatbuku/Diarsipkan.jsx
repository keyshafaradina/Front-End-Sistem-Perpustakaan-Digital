import { useState } from "react";
import Button from "../../../components/ui/Button";
import PopUp from "../../../components/ui/PopUp";

export default function Diarsipkan() {
    const [isOpen, setIsOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const books = [
        {
            id: 1,
            judul: "Laut Bercerita",
            gambar: "/images/nailong.jpg",
        },
        {
            id: 2,
            judul: "Pulang",
            gambar: "/images/nailong.jpg",
        },
        {
            id: 3,
            judul: "Hujan",
            gambar: "/images/nailong.jpg",
        },
        {
            id: 4,
            judul: "Bumi",
            gambar: "/images/nailong.jpg",
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
        <div className="m-8 flex flex-col gap-6">
            <h1 className="font-bold text-2xl text-center">Diarsipkan</h1>
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
                            <h1 className="font-bold text-sm md:text-lg lg:text-lg flex-1">{book.judul}</h1>
                            <Button onClick={() => handlePopup(book)}>Buka Arsip</Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* POPUP KONFIRMASI */}
            <PopUp isOpen={isOpen}>
                <div className="flex flex-col gap-5 items-center">
                    <h2 className="font-bold text-lg text-center">Yakin ingin membuka arsip?</h2>
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
                    <h2 className="font-bold text-lg text-center">Arsip berhasil dibuka!</h2>
                    <Button onClick={() => setSuccessOpen(false)}>Oke</Button>
                </div>
            </PopUp>
        </div>
    );
}