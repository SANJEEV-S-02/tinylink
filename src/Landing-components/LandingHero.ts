import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LandingHero() {
    const [url, setUrl] = useState("");
    const navigate = useNavigate();
    const handleShortenClick = () => {
        if (!url.trim()) {
            alert("Please enter a valid URL");
            return;
        }
        navigate("/signup", {
            state: { redirectAfterLogin: "/dashboard", urlToShorten: url },
        });
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-white text-gray-800", children: [_jsxs("header", { className: "w-full py-5 px-8 flex justify-between items-center bg-white shadow-sm", children: [_jsx("h1", { className: "text-xl font-bold text-[#561be0]", children: "TinyLink" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: () => navigate("/signin"), className: "text-gray-700 hover:text-[#561be0] font-medium transition", children: "Login" }), _jsx("button", { onClick: () => navigate("/signup"), className: "bg-[#561be0] text-white px-5 py-2 rounded-lg hover:bg-[#561be0] transition font-semibold", children: "Sign Up" })] })] }), _jsxs("div", { className: "flex flex-col items-center justify-center flex-1 px-6 text-center", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mt-10", children: "Build stronger digital connections" }), _jsx("p", { className: "text-gray-600 mt-6 max-w-2xl text-lg", children: "Use our URL shortener, QR Codes, and landing pages to engage your audience and connect them to the right information." }), _jsx("div", { className: "flex mt-10 gap-4 flex-wrap justify-center", children: _jsx("button", { className: "bg-[#561be0] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#561be0] transition", children: "Short Link" }) }), _jsxs("div", { className: "w-full max-w-xl bg-white shadow-xl p-6 rounded-2xl mt-10 border border-gray-200", children: [_jsx("p", { className: "text-left font-medium mb-2", children: "Shorten a long link" }), _jsx("input", { type: "text", placeholder: "https://example.com/my-long-url", value: url, onChange: (e) => setUrl(e.target.value), className: "w-full border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#561be0]" }), _jsx("button", { onClick: handleShortenClick, className: "w-full bg-[#561be0] text-white font-semibold py-3 rounded-lg hover:bg-[#561be0] transition", children: "Get your link for free \u2192" })] })] }), _jsxs("footer", { className: "py-6 text-center text-sm text-gray-500 border-t mt-10", children: ["\u00A9 ", new Date().getFullYear(), " TinyLink. All rights reserved."] })] }));
}
