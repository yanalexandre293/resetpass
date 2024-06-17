'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3003/users/login",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password })
    });

    const data = await response.json();
    if(data.token){
      localStorage.setItem("token", data.token);
      alert('Login successful!');
      router.push("/pages/");
    }else{
      alert('Login failed!');
    }
  }

  
  const handleCadastrar = async () => {
    const response = await fetch("http://localhost:3003/users/create",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password })
    });

    const data = await response.json();
    if(data.token){
      localStorage.setItem("token", data.token);
      alert('Usuário criado com sucesso!');
      router.push("/");
    }else{
      alert('Erro ao criar usuário!');
    }
  }



  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">Login</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleLogin}
                        >
                            Logar
                        </button>

                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleCadastrar}
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
  );
}
