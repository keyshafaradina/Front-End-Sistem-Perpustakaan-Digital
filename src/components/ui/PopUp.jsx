const PopUp = ({isOpen, onClose, children})=>{
    if (!isOpen) return null; //kalau modal tidak dibuka, maka pop up tidak ditampilkan sama sekali

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-pink-200 p-6 rounded-lg shadow-lg" onClick={(e)=> e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default PopUp;