import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { HorizontaLDots } from "../icons";
import { LayoutGrid, Link2 } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
// -------------------------
// MAIN MENU
// -------------------------
const navItems = [
    { icon: _jsx(LayoutGrid, {}), name: "Dashboard", path: "/dashboard", matchPaths: ["/dashboard"] },
    { icon: _jsx(Link2, {}), name: "Short Links", path: "/shortlinks", matchPaths: ["/shortlinks"] },
];
const AppSidebar = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();
    const [activeNav, setActiveNav] = useState(null);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [subMenuHeight, setSubMenuHeight] = useState({});
    const subMenuRefs = useRef({});
    // ---------------------------------------
    // ACTIVE PATH MATCH
    // ---------------------------------------
    const isActive = useCallback((itemOrPath) => {
        const current = location.pathname.toLowerCase();
        if (typeof itemOrPath === "string") {
            return current.startsWith(itemOrPath.toLowerCase());
        }
        if (!itemOrPath.matchPaths)
            return false;
        return itemOrPath.matchPaths.some((p) => current.startsWith(p.toLowerCase()));
    }, [location.pathname]);
    useEffect(() => {
        navItems.forEach((nav, index) => {
            if (nav.subItems) {
                nav.subItems.forEach((subItem) => {
                    if (isActive(subItem.path)) {
                        setOpenSubmenu({ type: "main", index });
                    }
                });
            }
        });
    }, [location, isActive]);
    // ---------------------------------------
    // SUBMENU HEIGHT
    // ---------------------------------------
    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `main-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prev) => ({
                    ...prev,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);
    const toggleSubmenu = (index) => {
        setOpenSubmenu((prev) => prev && prev.index === index ? null : { type: "main", index });
    };
    // ---------------------------------------
    // RENDER MENU ITEMS
    // ---------------------------------------
    const renderMenu = (items) => (_jsx("ul", { className: "flex flex-col gap-4", children: items.map((nav, index) => (_jsx("li", { children: nav.path && (_jsxs(Link, { to: nav.path, onClick: () => setActiveNav(nav.path), className: `menu-item group ${isActive(nav.path) ? "bg-[#4c00b0]" : "menu-item-inactive"}`, children: [_jsx("span", { className: `menu-item-icon-size ${isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`, style: { color: isActive(nav.path) ? "#fff" : "#000" }, children: nav.icon }), (isExpanded || isHovered || isMobileOpen) && (_jsx("span", { style: { color: isActive(nav.path) ? "#fff" : "#000" }, className: "menu-item-text", children: nav.name }))] })) }, nav.name))) }));
    // ---------------------------------------
    // RETURN SIDEBAR
    // ---------------------------------------
    return (_jsxs("aside", { className: `fixed mt-16 lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 
      dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 
      border-r border-gray-200 z-50 
      ${isExpanded || isMobileOpen ? "w-[260px]" : isHovered ? "w-[260px]" : "w-[90px]"}
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`, onMouseEnter: () => !isExpanded && setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsx("div", { className: "py-8 flex justify-start lg:justify-start", children: (isExpanded || isHovered || isMobileOpen) ? (_jsxs("h1", { className: "text-2xl font-bold text-gray-800 dark:text-white tracking-wide", children: ["Tiny", _jsx("span", { className: "text-[#4c00b0]", children: "Link" })] })) : (_jsx("h1", { className: "text-xl font-bold text-[#1B6763]", children: "TL" })) }), _jsxs("div", { className: "flex flex-col h-full overflow-hidden duration-300 ease-linear", children: [_jsx("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: _jsx("nav", { className: "mb-6", children: _jsxs("div", { className: "flex flex-col gap-4", children: [_jsx("h2", { className: `mb-4 text-xs uppercase text-gray-400 ${!isExpanded && !isHovered ? "lg:text-center" : "text-left"}`, children: isExpanded || isHovered || isMobileOpen ? ("Menu") : (_jsx(HorizontaLDots, { className: "size-6" })) }), renderMenu(navItems)] }) }) }), (isExpanded || isHovered || isMobileOpen) && (_jsx("div", { className: "p-1 border-t border-gray-200 dark:border-white/10" }))] })] }));
};
export default AppSidebar;
