import { useEffect, useState } from "react";
import axios from "axios";

export const Appbar = () =>{
    const [firstname, setfirstname] = useState("");

    useEffect(() => {
        const fetchfirstname = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setfirstname(response.data.firstname);  
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchfirstname(); 
    }, [firstname]);
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4 pl-4 font-bold text-xl text-blue-600">
            PayTM App
        </div>
        <div className="flex">
             <div className="flex flex-col justify-center h-full mr-2 text-xl font-semibold pb-2 mt-1" >
                Hello {firstname}
             </div>
             <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center text-xl font-semibold mr-2 mt-1">
                <div className="flex flex-col justify-center h-full text-center">
                    {/* {firstname[0]} */}
                    {firstname.charAt(0).toUpperCase()}
                </div>
             </div>
        </div>
    </div>
}