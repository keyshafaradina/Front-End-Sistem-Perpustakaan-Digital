export default function KotakInput({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    disabled=false,
    options=[],
    direction="row",
}) {
    return(
        <div className={`w-full gap-2 ${direction ==="column"?"flex flex-col":"flex items-center"}`}>
            <label  className={`text-sm lg:text-base ${direction === "row"? "w-": ""}`}>{label}</label>
            {type === "select" ? (
                <select
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="w-full px-3 py-1 border border-black rounded-xl focus:outline-none focus:ring-pink-400 disabled:bg-pink-100"
                >
                    <option value="">-- Pilih --</option>
                    {options.map((item, index) => (
                        <option
                        key={index}
                        value={item}>{item}</option>))}
                </select>
            ) : (
            <input 
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full text-sm lg:text-base w-full px-3 py-1 border border-black rounded-xl focus:outline-none focus:ring-pink-400 disabled:bg-pink-100"
            />
        )}
        </div>
    );
}