import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import FourIsToThree from "../../components/ui/videos/FourIsToThree";
import OneIsToOne from "../../components/ui/videos/OneIsToOne";
import SixteenIsToNine from "../../components/ui/videos/SixteenIsToNine";
import TwentyOneIsToNine from "../../components/ui/videos/TwentyOneIsToNine";
export default function Videos() {
    return (_jsxs(_Fragment, { children: [_jsx(PageMeta, { title: "Nystai Institute | CCTV & Home Automation Course Training", description: "Join Nystai Institute to master CCTV installation and home automation systems. Get hands-on training, expert guidance, and industry-ready skills for a successful tech career." }), _jsx(PageBreadcrumb, { pageTitle: "Videos" }), _jsxs("div", { className: "grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-2", children: [_jsxs("div", { className: "space-y-5 sm:space-y-6", children: [_jsx(ComponentCard, { title: "Video Ratio 16:9", children: _jsx(SixteenIsToNine, {}) }), _jsx(ComponentCard, { title: "Video Ratio 4:3", children: _jsx(FourIsToThree, {}) })] }), _jsxs("div", { className: "space-y-5 sm:space-y-6", children: [_jsx(ComponentCard, { title: "Video Ratio 21:9", children: _jsx(TwentyOneIsToNine, {}) }), _jsx(ComponentCard, { title: "Video Ratio 1:1", children: _jsx(OneIsToOne, {}) })] })] })] }));
}
