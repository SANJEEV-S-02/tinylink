import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
export default function MonthlySalesChart() {
    const [categories, setCategories] = useState([]);
    const [series, setSeries] = useState([
        { name: "Students", data: [] },
    ]);
    const [loading, setLoading] = useState(true);
    const options = {
        colors: [
            "#EF3A59", "#FF2E00", "#FF7043", "#FF5733", "#C62828", "#C16A6A",
            "#EF3A59", "#FF2E00", "#FF7043", "#FF5733", "#C62828", "#C16A6A",
        ],
        chart: {
            fontFamily: "kabob",
            type: "bar",
            height: 180,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "39%",
                borderRadius: 5,
                borderRadiusApplication: "end",
                distributed: true,
            },
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 4, colors: ["transparent"] },
        xaxis: {
            categories, // dynamic months (last 6)
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        legend: { show: false },
        yaxis: { title: { text: undefined } },
        grid: { yaxis: { lines: { show: true } } },
        fill: { opacity: 1 },
        tooltip: {
            x: { show: true },
            y: { formatter: (val) => `${val}` },
        },
    };
    // Helper to generate last 6 months
    const getLastSixMonths = () => {
        const months = [];
        const date = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
            const month = d.toLocaleString("en-US", { month: "short" });
            const year = d.getFullYear();
            months.push(`${month} ${year}`);
        }
        return months;
    };
    // Fetch API data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://nystai-backend.onrender.com/students/last-six-months");
                const json = await res.json();
                if (json?.success && Array.isArray(json.data)) {
                    const apiData = {};
                    json.data.forEach((item) => {
                        apiData[item.month] = item.student_count;
                    });
                    const lastSix = getLastSixMonths();
                    const counts = lastSix.map((m) => apiData[m] || 0);
                    setCategories(lastSix);
                    setSeries([{ name: "Students", data: counts }]);
                }
            }
            catch (err) {
                console.error("Failed to fetch chart data:", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (_jsxs("div", { className: "overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6 ", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("h3", { className: "text-lg font-semibold text-gray-800 dark:text-white/90", children: "Monthly Students" }) }), _jsx("div", { className: "text-center py-2", children: _jsx("div", { className: "max-w-full overflow-x-auto custom-scrollbar", children: loading ? (_jsx("p", { className: "text-gray-500 text-sm py-4", children: "Loading chart..." })) : (_jsx("div", { className: "xl:min-w-full", children: _jsx(Chart, { options: options, series: series, type: "bar", height: 320 }) })) }) })] }));
}
