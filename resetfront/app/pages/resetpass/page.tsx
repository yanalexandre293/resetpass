'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UpdateUser() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [newLogin, setNewLogin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();
  const token = localStorage.getItem('token');

  const handleUpdate = async () => {
    if (!login || !password || !newLogin || !newPassword) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3003/users/update", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ login, password, newLogin, newPassword })
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User updated successfully:", data);
        alert("User updated successfully");
        router.push("/"); // Redirect to another page if necessary
      } else {
        console.error("Failed to update user:", data);
        alert("Failed to update user: " + data.error);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">Update User</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login">
              Current Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="login"
              type="text"
              placeholder="Current Username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Current Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Current Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newLogin">
              New Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newLogin"
              type="text"
              placeholder="New Username"
              value={newLogin}
              onChange={(e) => setNewLogin(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleUpdate}
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
