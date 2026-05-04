const Modal = ({isOpen, onClose, children})=>{
    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-pink p-6 rounded-lg shadow-lg" onClick={(e)=> e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;