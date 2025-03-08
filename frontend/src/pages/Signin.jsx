import { ParseStatus } from "zod";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 min-h-screen flex justify-center p-4">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-4 shadow-lg">
                    <Heading label="Sign in" />
                    <Subheading label="Enter your credentials to access your account" />
                    <Inputbox onChange={(e) => {
                        setusername(e.target.value);
                    }}  label="Username" placeholder="Enter your username" />
                    <Inputbox onChange={(e) => {
                       setpassword(e.target.value);
                    }}  label="Password" placeholder="********" type="password" />
                    <div className="pt-4">
                        <Button onClick={async () => {
                          try {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username,
                            password
                          });
                        if(response.data && response.data.token){
                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard");
                        }
                        else{
                            alert(response.data.msg || "Invalid credentials, try again!");
                        }
                    }
                    catch(error){
                        console.error("Login failed:", error);
                        alert(error.response?.data?.msg || "Something went wrong. Please try again after few minutes");
                    }
                       
                        }}
                        label="Sign in" />
                    </div>
                    <div className="pt-2">
                        <ButtonWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
                    </div>
                </div>
            </div>
        </div>
    );
};
