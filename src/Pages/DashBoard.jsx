import React, { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from '../Config/Auth'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const auth = getAuth()
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log('okay');

            } else {
                navigate("/login");
            }
        });
        return () => unsubscribe();
    }, [auth, navigate]);
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-pro" });
    let makepitchcraft = input + " — generate startup idea with headings: Name, Tagline, Pitch, Target Audience, and Landing Copy.";
    const handleSend = async () => {

        if (!input.trim()) return;
        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const result = await model.generateContent(makepitchcraft);
            const reply = result.response.text();
            setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                { sender: "ai", text: "⚠️ Something went wrong!" },
            ]);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-white">
            <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-lg flex flex-col overflow-hidden">
                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-xl max-w-[80%] ${msg.sender === "user"
                                ? "bg-blue-600 self-end ml-auto"
                                : "bg-gray-700 self-start"
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    {loading && (
                        <div className="text-gray-400 italic">Gemini is thinking...</div>
                    )}
                </div>

                {/* Input */}
                <div className="p-4 bg-gray-800 border-t border-gray-700 flex">
                    <input
                        type="text"
                        className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-xl focus:outline-none"
                        placeholder="Ask Your Idea ...."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className="ml-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl font-semibold"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;

