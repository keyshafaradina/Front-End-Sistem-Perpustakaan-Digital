import React from "react";
import KotakInput from "../../components/ui/KotakInput";
import Button from "../../components/ui/Button";
import { User } from "lucide-react";

export default function Login() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-20 m-20">
        <User size={130} className="border bg-pink-300 inline-block rounded-full"/>
        <KotakInput label="Email/Username" type="text"/>
        <KotakInput label="Password" type="password"/>
        <Button>Login</Button>
      </div>
    </div>
  );
}
    

      