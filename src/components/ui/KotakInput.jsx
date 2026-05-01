export default function KotakInput({
    label,
    name,
    value,
    onChange,
    placeholder,
    disabled=false
}) {
    return(
        <div>
            <label>{label}</label>
            <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full border border-black rounded-lg px-20 py-1 focus:outline-none focus:ring-pink-400 disabled:bg-pink-100"
            />
        </div>
    );
}