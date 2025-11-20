import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
export default function SignIn() {
    return (_jsxs(_Fragment, { children: [_jsx(PageMeta, { title: "Nystai Institute | CCTV & Home Automation Course Training", description: "Join Nystai Institute to master CCTV installation and home automation systems. Get hands-on training, expert guidance, and industry-ready skills for a successful tech career." }), _jsx(AuthLayout, { children: _jsx(SignInForm, {}) })] }));
}
