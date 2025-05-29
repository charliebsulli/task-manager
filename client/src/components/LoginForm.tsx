"use client";

import { useRegister } from "@/api/auth/register";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/api/auth/login";

export default function LoginForm({ register }: { register: boolean }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const registerMutation = useRegister();
  const loginMutation = useLogin();
  const router = useRouter();

  function onUsernameChange(newUsername: string) {
    setUsername(newUsername);
  }

  function onPasswordChange(newPassword: string) {
    setPassword(newPassword);
  }

  function submitRegister() {
    // attempt to register new user with current state of username/password
    registerMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          // redirect to login
          router.push("/auth/login");
        },
      }
    );
  }

  function submitLogin() {
    // attempt to login user with current state of username/password
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          // redirect to homepage
          router.push("/");
        },
      }
    );
  }

  function RegisterButton() {
    return (
      <button type="button" className="btn-primary" onClick={submitRegister}>
        Register
      </button>
    );
  }

  function LoginButton() {
    return (
      <button type="button" className="btn-primary" onClick={submitLogin}>
        Login
      </button>
    );
  }

  return (
    <div className="flex flex-col w-1/3 bg-white rounded">
      <input
        placeholder="Username"
        className="m-2"
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
      ></input>
      <input
        placeholder="Password"
        type="password"
        className="m-2"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
      ></input>
      {register ? <RegisterButton /> : <LoginButton />}
    </div>
  );
}
