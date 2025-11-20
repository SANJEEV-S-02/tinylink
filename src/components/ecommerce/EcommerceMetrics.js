import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowUp, GraduationCap, BookOpen, BookCheck, UserPlus } from "lucide-react";
import Badge from "../ui/badge/Badge";
export default function EcommerceMetrics() {
    const [studentCount, setStudentCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completedCount, setCompletedCount] = useState(null);
    useEffect(() => {
        const fetchStudentCount = async () => {
            try {
                const res = await axios.get("https://nystai-backend.onrender.com/students-count");
                if (res.data?.count !== undefined)
                    setStudentCount(res.data.count);
            }
            catch (error) {
                console.error("Error fetching student count:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchStudentCount();
    }, []);
    useEffect(() => {
        const fetchCompletedCount = async () => {
            try {
                const res = await axios.get("https://nystai-backend.onrender.com/get-completed-students-count");
                if (res.data?.success)
                    setCompletedCount(res.data.count);
            }
            catch (error) {
                console.error("Error fetching completed students count:", error);
            }
        };
        fetchCompletedCount();
    }, []);
    return (_jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6", children: [_jsxs("div", { className: "rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6", children: [_jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800", children: _jsx(GraduationCap, { className: "text-gray-800 size-6 dark:text-white/90" }) }), _jsxs("div", { className: "flex items-end justify-between mt-5", children: [_jsxs("div", { children: [_jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Total Student" }), _jsx("h4", { className: "mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90", children: loading ? "Loading..." : studentCount ?? "0" })] }), _jsxs(Badge, { color: "success", children: [_jsx(ArrowUp, { className: "w-4 h-4" }), "1.8%"] })] })] }), _jsx(CourseCard, {}), _jsxs("div", { className: "rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6", children: [_jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800", children: _jsx(BookCheck, { className: "text-gray-800 size-6 dark:text-white/90" }) }), _jsxs("div", { className: "flex items-end justify-between mt-5", children: [_jsxs("div", { children: [_jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Course Completed" }), _jsx("h4", { className: "mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90", children: completedCount !== null ? completedCount.toLocaleString() : "Loading..." })] }), _jsxs(Badge, { color: "success", children: [_jsx(ArrowUp, { className: "w-4 h-4" }), "1.8%"] })] })] }), _jsx("div", { className: "rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6", children: _jsxs(Link, { to: "/AddStudentForm", children: [_jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800", children: _jsx(UserPlus, { className: "text-gray-800 size-6 dark:text-white/90" }) }), _jsx("div", { className: "flex items-end justify-between mt-5", children: _jsx("div", { children: _jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Add Student Form" }) }) })] }) })] }));
}
function CourseCard() {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [count, setCount] = useState(0);
    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await axios.get(`https://nystai-backend.onrender.com/count/${selectedCourse}`);
                setCount(res.data.data?.student_count || 0);
            }
            catch (error) {
                console.error("Error fetching course count:", error);
                setCount(0);
            }
        };
        fetchCount();
    }, [selectedCourse]);
    return (_jsxs("div", { className: "rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6", children: [_jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800", children: _jsx(BookOpen, { className: "text-gray-800 size-6 dark:text-white/90" }) }), _jsx("div", { className: "flex items-center justify-between mt-4", children: _jsxs("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: [" ", _jsx(UserDropdown, { selectedCourse: selectedCourse, setSelectedCourse: setSelectedCourse })] }) }), _jsxs("div", { className: "flex items-end justify-between", children: [_jsx("h4", { className: "mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90", children: count }), _jsxs(Badge, { color: "success", children: [_jsx(ArrowUp, { className: "w-4 h-4" }), "1.8%"] })] })] }));
}
function UserDropdown({ selectedCourse, setSelectedCourse }) {
    const [isOpen, setIsOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("https://nystai-backend.onrender.com/Allcourses/all-courses-with-plans");
                // Extract the course_name field from the response
                const courseList = response.data.data.map((c) => c.course_name);
                setCourses(courseList);
            }
            catch (error) {
                console.error("Error fetching courses:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);
    return (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setIsOpen(!isOpen), className: "flex items-center gap-2 rounded-2xl border border-gray-300 bg-[#F8C723] px-3 py-1 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200", children: [_jsx("span", { className: "block mr-1 font-medium text-sm", children: loading ? "Loading..." : selectedCourse || "Select Course" }), _jsx("svg", { className: `stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`, width: "18", height: "20", viewBox: "0 0 18 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M4.3125 8.65625L9 13.3437L13.6875 8.65625", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })] }), isOpen && !loading && (_jsx("ul", { className: "absolute right-0 mt-[5px] w-[160px] rounded-2xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900 z-50", children: courses.length > 0 ? (courses.map((course) => (_jsx("li", { onClick: () => {
                        setSelectedCourse(course);
                        setIsOpen(false);
                    }, className: "px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer text-sm text-gray-700 dark:text-gray-400", children: course }, course)))) : (_jsx("li", { className: "px-3 py-2 text-sm text-gray-500 dark:text-gray-400", children: "No courses found" })) }))] }));
}
