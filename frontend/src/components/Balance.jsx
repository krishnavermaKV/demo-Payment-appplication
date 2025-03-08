import axios from "axios";
import { useEffect, useState } from "react"

export function Balance({value}){
    const [balance, setbalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setbalance(response.data.balance);  
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance(); 
    }, [balance]);

    return <div className="">
      <div className="text-xl font-bold">
        UPI Money transfer</div>
        <div className="font-semibold">
        Current Balance {balance}
        </div>
   
    </div>
}