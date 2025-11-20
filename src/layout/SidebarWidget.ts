import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LogOut } from "lucide-react";
import { Link } from "react-router";
export default function SidebarWidget() {
    return (_jsx("div", { className: `
      mx-auto mb-10 w-full max-w-60 rounded-2xl px-4 py-5 text-center dark:bg-white/[0.03]`, children: _jsxs(Link, { to: "/signin", className: "flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-[#F8C723] px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 mx-auto text-center", children: [_jsx(LogOut, { size: 18 }), "Sign out"] }) }));
}
