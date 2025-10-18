// import React, { useEffect, useRef } from 'react'
// import { onAuthStateChanged, getAuth } from '../Config/Auth'
// import { useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';
// function DashBoard() {
//     const RefName = useRef()
//     const RefDes = useRef()
//     const RefInd = useRef()
//     const auth = getAuth()
//     const navigate = useNavigate();
//     function sub() {
//         if (RefName.current.value == '' || RefDes.current.value == '' || RefInd.current.value == '') {
//             alert('heeyeyu')
//         } else {

//             console.log(RefName.current.value);
//             console.log(RefDes.current.value);
//             console.log(RefInd.current.value);
//         }

//     }
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             if (!currentUser) {
//                 navigate("/login");
//             } else {
//                 toast.success("WelCome User");
//             }

//         });
//         return () => unsubscribe();
//     }, []);
//     return (
//         <div className='py-7 flex justify-center gap-2 items-center'>
//             <ToastContainer position="top-center" autoClose={3000} />
//             <div className='flex flex-col justify-center  w-[30vw] border-2 border-blue-600 p-4 rounded-2xl h-[80vh] gap-2'>
//                 <h1 className='text-center text-3xl underline mb-10'>Share Your Idea</h1>
//                 <input ref={RefName} className='h-12 rounded-2xl border-2 border-blue-600  p-2' placeholder='Enter Your Idea Name' type="text" name="" id="" />
//                 <input ref={RefDes} className='h-12 rounded-2xl border-2 border-blue-600  p-2' placeholder='Enter Your Idea Description' type="text" name="" id="" />
//                 <input ref={RefInd} className='h-12 rounded-2xl border-2  border-blue-600 p-2' placeholder='Enter Your Industry' type="text" name="" id="" />
//                 <button onClick={sub} className='active:bg-blue-950 p-2 border-2 rounded-2xl  border-blue-600'>Enter</button>
//             </div>
//         </div>
//     )
// }

// export default DashBoard;


import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "../Config/Auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User, LogOut, Mail } from "lucide-react";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    // ✅ Check user authentication
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                navigate("/login");
            }
        });
        return () => unsubscribe();
    }, [auth, navigate]);

    // ✅ Logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully!");
            setTimeout(() => navigate("/login"), 1500);
        } catch (error) {
            console.error(error);
            toast.error("Logout failed!");
        }
    };

    if (!user) {
        // optional loader
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 text-lg text-gray-600">
                Loading your dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6">
            <ToastContainer position="top-center" autoClose={3000} />

            {/* Header */}
            <div className="w-full max-w-5xl flex justify-between items-center py-4 px-6 bg-white shadow-sm rounded-2xl mt-4">
                <h1 className="text-2xl font-bold text-indigo-600">PitchCraft Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md mt-8 p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-full text-4xl font-bold">
                        {user.displayName
                            ? user.displayName.charAt(0).toUpperCase()
                            : user.email.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Welcome, {user.displayName || "User"} 👋
                        </h2>
                        <p className="text-gray-600 flex items-center gap-2 mt-1">
                            <Mail size={16} />
                            {user.email}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Member since:{" "}
                            {new Date(user.metadata.creationTime).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Dashboard Cards */}
                <div className="grid md:grid-cols-3 gap-6 mt-10">
                    {[
                        { title: "Your Drafts", count: 3 },
                        { title: "Pitches Sent", count: 5 },
                        { title: "Feedback Received", count: 12 },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
                        >
                            <h3 className="text-gray-700 font-semibold">{item.title}</h3>
                            <p className="text-4xl font-bold text-indigo-600 mt-2">{item.count}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-10 text-center">
                    <button
                        onClick={() => toast.info("Coming soon!")}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                    >
                        Create New Pitch
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 text-gray-500 text-sm">
                © 2025 PitchCraft. All rights reserved.
            </footer>
        </div>
    );
};

export default Dashboard;
