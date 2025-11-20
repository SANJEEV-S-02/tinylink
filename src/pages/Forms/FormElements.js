import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import AddStudentForm from "../../components/form/AddStudentForm/AddStudentForm";
import PageMeta from "../../components/common/PageMeta";
export default function FormElements() {
    return (_jsxs("div", { children: [_jsx(PageMeta, { title: "Nystai Institute | CCTV & Home Automation Course Training", description: "Join Nystai Institute to master CCTV installation and home automation systems. Get hands-on training, expert guidance, and industry-ready skills for a successful tech career." }), _jsx(PageBreadcrumb, { pageTitle: "Add Student Form" }), _jsx("div", { className: "space-y-12", children: _jsx(AddStudentForm, {}) })] }));
}
