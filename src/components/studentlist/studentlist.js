import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHeader, TableRow, } from "../ui/table";
import { useState, useRef, useEffect } from "react";
import { MoreVertical, X } from "lucide-react";
import axios from "axios";
import { Modal } from "../ui/modal";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";
const API_BASE = "http://localhost:5001";
export default function ShortLinkTable() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteCode, setDeleteCode] = useState(null);
    useEffect(() => {
        loadLinks();
    }, []);
    async function loadLinks() {
        try {
            const res = await axios.get(`${API_BASE}/api/links`);
            setLinks(res.data || []);
        }
        catch (err) {
            toast.error("Failed to load links");
        }
        setLoading(false);
    }
    // DELETE
    const openDeleteModal = (code) => {
        setDeleteCode(code);
        setIsDeleteOpen(true);
    };
    const closeDeleteModal = () => {
        setIsDeleteOpen(false);
        setDeleteCode(null);
    };
    const handleDelete = async () => {
        if (!deleteCode)
            return;
        try {
            await axios.delete(`${API_BASE}/api/links/${deleteCode}`);
            setLinks((prev) => prev.filter((l) => l.code !== deleteCode));
            toast.success("Short link deleted");
            closeDeleteModal();
        }
        catch (err) {
            toast.error("Delete failed");
        }
    };
    // COPY
    const handleCopy = (code) => {
        const short = `${window.location.origin}/${code}`;
        navigator.clipboard.writeText(short);
        toast.success("Copied!");
    };
    return (_jsxs("div", { className: "rounded-2xl border border-gray-200 bg-white p-5 lg:p-6", children: [_jsx("div", { className: "mb-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:mb-7", children: _jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Your Short Links" }) }), _jsx("div", { className: "relative overflow-visible rounded-xl border border-gray-200 bg-white", children: _jsx("div", { className: "w-full overflow-x-auto", children: _jsxs(Table, { className: "min-w-[800px]", children: [_jsx(TableHeader, { className: "border-b border-gray-100", children: _jsxs(TableRow, { children: [_jsx(TableCell, { isHeader: true, className: "px-5 py-3 font-medium text-gray-500", children: "Short URL" }), _jsx(TableCell, { isHeader: true, className: "px-5 py-3 font-medium text-gray-500", children: "Original URL" }), _jsx(TableCell, { isHeader: true, className: "px-5 py-3 font-medium text-gray-500 text-center", children: "Clicks" }), _jsx(TableCell, { isHeader: true, className: "px-5 py-3 font-medium text-gray-500 text-center", children: "Created" }), _jsx(TableCell, { isHeader: true, className: "px-5 py-3 font-medium text-gray-500" })] }) }), _jsx(TableBody, { className: "divide-y divide-gray-100", children: loading ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, className: "h-48 text-center", children: "Loading..." }) })) : links.length > 0 ? (links.map((link) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "px-5 py-4", children: _jsxs("span", { className: "text-blue-600 font-medium", children: [window.location.origin, "/", link.code] }) }), _jsx(TableCell, { className: "px-5 py-4 max-w-xs truncate text-gray-600", children: link.url }), _jsx(TableCell, { className: "px-5 py-4 text-center font-semibold text-gray-700", children: link.clicks }), _jsx(TableCell, { className: "px-5 py-4 text-center text-gray-500", children: new Date(link.createdAt).toLocaleDateString() }), _jsx(TableCell, { className: "px-5 py-4 text-right", children: _jsx(ActionDropdown, { code: link.code, onCopy: () => handleCopy(link.code), onStats: () => (window.location.href = `/code/${link.code}`), onDelete: () => openDeleteModal(link.code) }) })] }, link.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, className: "h-48 text-center", children: "No links found" }) })) })] }) }) }), isDeleteOpen && (_jsx(Modal, { isOpen: isDeleteOpen, onClose: closeDeleteModal, className: "max-w-md m-4", children: _jsxs("div", { className: "p-6 rounded-3xl bg-white", children: [_jsx("h4", { className: "text-xl font-semibold text-gray-800 mb-8", children: "Confirm Delete?" }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx("button", { onClick: handleDelete, className: "flex items-center gap-2 rounded-2xl border border-gray-300 bg-[#F8C723] px-10 py-2 text-sm font-medium text-gray-700", children: "Yes, Delete" }), _jsx("button", { onClick: closeDeleteModal, className: "px-4 py-2 rounded-2xl border border-[#F8C723] text-gray-800", children: _jsx(X, { size: 18, className: "text-[#F8C723]" }) })] })] }) }))] }));
}
// ---------------------
// ACTION DROPDOWN MENU
// ---------------------
function ActionDropdown({ code, onCopy, onStats, onDelete, }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !buttonRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    // Dropdown position
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setMenuPosition({
                top: rect.bottom + window.scrollY + 6,
                left: rect.right + window.scrollX - 200,
            });
        }
    }, [isOpen]);
    return (_jsxs("div", { className: "relative inline-block text-left", children: [_jsx("button", { ref: buttonRef, onClick: () => setIsOpen(!isOpen), className: "p-1 rounded-full hover:bg-gray-200 dark:hover:bg-white/10", children: _jsx(MoreVertical, { className: "w-5 h-5 text-gray-600 dark:text-gray-300" }) }), isOpen &&
                createPortal(_jsx("div", { ref: dropdownRef, className: "absolute z-[9999] w-[200px] rounded-2xl border border-gray-200 bg-white p-3 shadow-xl", style: {
                        top: menuPosition.top,
                        left: menuPosition.left,
                        position: "absolute",
                    }, children: _jsxs("ul", { className: "flex flex-col gap-1", children: [_jsx("li", { children: _jsx("button", { onClick: onCopy, className: "w-full text-left px-3 py-2 text-gray-500 rounded-lg hover:bg-gray-100", children: "Copy" }) }), _jsx("li", { children: _jsx("button", { onClick: onDelete, className: "w-full text-left px-3 py-2 text-red-500 rounded-lg hover:bg-gray-100", children: "Delete" }) })] }) }), document.body)] }));
}
