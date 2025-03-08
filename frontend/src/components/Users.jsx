import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then(response => {
            setUsers(response.data.user);
        });
    }, [filter]);

    return (
        <div>
            <div className="mt-6 ml-1 font-semibold">Send money to mobile number of PayTM</div>

            <div className="my-2 relative">
                <input 
                    onChange={(e) => setFilter(e.target.value)}
                    type="text" 
                    placeholder="Enter Name or Mobile Number" 
                    className="w-full px-2 py-1 pl-10 border rounded border-black-900 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <svg 
                    className="absolute left-3 top-1.5 w-5 h-5 text-blue-500" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1011 18a7.5 7.5 0 005.65-2.35z" />
                </svg>
            </div>
            <div className="font-semibold ml-1 text-lg">Recent Users</div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </div>
    );
}

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between p-2 border-b border-gray-300">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center text-xl font-semibold">
                    {user.firstname[0].toUpperCase()}
                </div>
                <div className="ml-4">
                    <div>{user.firstname} {user.lastname}</div>
                </div>
            </div>
            <div className="flex items-center">
                <Button 
                    onClick={() => navigate(`/sendmoney?id=${user._id}&name=${user.firstname}${user.lastname}`)}
                    label={"Send Money"} 
                />
            </div>
        </div>
    );
}
