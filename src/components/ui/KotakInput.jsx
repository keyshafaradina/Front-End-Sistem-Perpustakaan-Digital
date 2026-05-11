export default function KotakInput({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    disabled=false
}) {
    return(
        <div className="flex flex-col w-full text-xl">
            <label>{label}</label>
            <input 
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className="py-1 border border-black rounded-xl focus:outline-none focus:ring-pink-400 disabled:bg-pink-100"
            />
        </div>
    );
}