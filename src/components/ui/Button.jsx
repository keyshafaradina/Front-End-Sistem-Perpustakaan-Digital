export default function Button({children, onClick, type="button"}) {
    return (
            <button type={type} onClick={onClick} className=" bg-pink-300 hover:bg-pink-200 text-black text-xl font-bold py-2 px-20 rounded-lg">
                {children}
            </button>
    );
}`  `