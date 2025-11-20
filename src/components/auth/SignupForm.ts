import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import toast from "react-hot-toast";
export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }
        try {
            const res = await fetch("http://localhost:5001/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, confirmPassword }),
            });
            let data = null;
            try {
                data = await res.json();
            }
            catch {
                data = null;
            }
            if (!res.ok) {
                throw new Error(data?.error || "Registration failed");
            }
            toast.success("Registration successful! Please sign in.");
            navigate("/signin");
        }
        catch (err) {
            toast.error(err.message || "Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat bg-white/70", style: { backgroundImage: "url('/images/logo/loginimg.jpg')" }, children: _jsxs("div", { className: "w-full max-w-md bg-white/70 dark:bg-gray-900/80 p-8 rounded-xl shadow-lg backdrop-blur-md", children: [_jsxs("div", { className: "mb-5 sm:mb-8 text-center", children: [_jsx("h1", { className: "mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md", children: "Sign Up to Your Account" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Enter your credentials to get started." })] }), _jsx("form", { onSubmit: handleRegister, children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs(Label, { children: ["Email ", _jsx("span", { className: "text-error-500", children: "*" })] }), _jsx(Input, { placeholder: "info@gmail.com", value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsxs("div", { children: [_jsxs(Label, { children: ["Password ", _jsx("span", { className: "text-error-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx(Input, { type: showPassword ? "text" : "password", placeholder: "Enter your password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("span", { onClick: () => setShowPassword(!showPassword), className: "absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2", children: showPassword ? (_jsx(EyeIcon, { className: "fill-gray-500 dark:fill-gray-400 size-5" })) : (_jsx(EyeCloseIcon, { className: "fill-gray-500 dark:fill-gray-400 size-5" })) })] })] }), _jsxs("div", { children: [_jsxs(Label, { children: ["Confirm Password ", _jsx("span", { className: "text-error-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx(Input, { type: showPassword ? "text" : "password", placeholder: "Confirm your password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value) }), _jsx("span", { onClick: () => setShowPassword(!showPassword), className: "absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2", children: showPassword ? (_jsx(EyeIcon, { className: "fill-gray-500 dark:fill-gray-400 size-5" })) : (_jsx(EyeCloseIcon, { className: "fill-gray-500 dark:fill-gray-400 size-5" })) })] })] }), _jsx("div", { children: _jsx(Button, { className: "w-full", size: "sm", type: "submit", disabled: loading, children: loading ? "Signing up..." : "Sign up" }) }), _jsx("div", { className: "text-center mt-4", children: _jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: ["Already have an account?", " ", _jsx("span", { className: "text-brand-500 cursor-pointer hover:underline", onClick: () => navigate("/signin"), children: "Sign In" })] }) })] }) })] }) }));
}
