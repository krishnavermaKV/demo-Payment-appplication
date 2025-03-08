export function Button({ label, onClick}) {
    return (
        <div>
            <button onClick={onClick} className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-12 rounded">
                {label}
            </button>
        </div>
    );
}
