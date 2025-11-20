import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
export default function AuthLayout({ children, }) {
    return (_jsx("div", { className: "relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0", children: _jsxs("div", { className: "relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0", children: [children, _jsx("div", { className: "fixed z-50 hidden bottom-6 right-6 sm:block", children: _jsx(ThemeTogglerTwo, {}) })] }) }));
}
