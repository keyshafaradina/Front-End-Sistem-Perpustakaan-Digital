export default function Button({children, onClick, type="button"}) {
    return (
            <button type={type} onClick={onClick} className=" bg-pink-300 hover:bg-pink-200 text-black text-xs md:text-sm lg:text-base inline-block py-2 px-3 lg:py-2 lg:px-3 font-semibold rounded-xl">
                {children}
            </button>
    );
}