import { useState } from "react"
import { Button } from "../components/Button"
import { ButtonWarning } from "../components/ButtonWarning"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Subheading } from "../components/Subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 h-max p-2 px-4 text-center">
     <Heading label={"Sign up"}/>
     <Subheading label={"Enter your information to create an account"}/>
     <Inputbox onChange={e => {
        setfirstname(e.target.value)
     }} label={"First Name"} placeholder={"firstname"}/>
     <Inputbox onChange={e => {
        setlastname(e.target.value)
     }} label={"Last Name"} placeholder={"lastname"}/>
     <Inputbox onChange={e => {
        setusername(e.target.value)
     }} label={"Username"} placeholder={"Enter username"}/>
     <Inputbox onChange={e => {
        setpassword(e.target.value)
     }} label={"Password"} placeholder={"3284@33j"}/>
     <div className="pt-4">
        <Button onClick={async () => {
            try {
          const response =  await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstname,
                lastname,
                password
            });
            if(response.data && response.data.token){
               localStorage.setItem("token", response.data.token);
               navigate("/dashboard");
           }
           else{
              alert(response.data.msg || "This username is Already present try another one");
           }
         }
         catch(error){
            console.error("Login failed:", error);
            alert(error.response?.data?.msg || "Already exist the user ");
         }
        }} label={"Sign Up"}/>
     </div> 
     <ButtonWarning label={"Already have an account"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}