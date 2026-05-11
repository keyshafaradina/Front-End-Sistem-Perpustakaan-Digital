export default function Button({children, onClick, type="button"}) {
    return (
            <button type={type} onClick={onClick} className=" bg-pink-300 hover:bg-pink-200 text-black text-xl px-10 py-1 font-bold rounded-xl">
                {children}
            </button>
    );
}