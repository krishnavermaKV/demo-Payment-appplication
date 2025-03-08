export function Inputbox({label, placeholder, onChange}){
    return <div>
        <div className="text-sm font-medium text-left py-2 outline-black">
            {label}
        </div>
        <input onChange={onChange} type="text" placeholder={placeholder} className="w-full px-2 py-1 border border-black focus:outline-none focus:ring-2 focus:ring-black" />
    </div>
}