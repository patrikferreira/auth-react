"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";

export default function page() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) {
            router.push('/');
        }
    }, [router])

    function handleLogout() {
        localStorage.removeItem("token");
        router.push('/')
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex gap-2 items-center">
                <span className="text-md text-gray-700">Authenticated</span>
                <button onClick={handleLogout} className="p-2 bg-gray-100 rounded-lg"><IoIosLogOut /></button>
            </div>
        </div>
    )
}