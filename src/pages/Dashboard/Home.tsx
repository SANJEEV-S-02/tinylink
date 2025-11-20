import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageMeta from "../../components/common/PageMeta";

const API_BASE = "https://tinylink-icao.onrender.com";

export default function Home() {
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [urlInput, setUrlInput] = useState("");
    const [customCode, setCustomCode] = useState("");

    useEffect(() => {
        loadLinks();
    }, []);

    async function loadLinks() {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/links`);
            const data = await res.json();
            setLinks(data || []);
        } catch {
            toast.error("Failed to load links");
        }
        setLoading(false);
    }

    async function handleCreate() {
        if (!urlInput.trim()) return toast.error("Enter valid URL");

        try {
            const payload: any = { url: urlInput };
            if (customCode.trim()) payload.code = customCode;

            const res = await fetch(`${API_BASE}/api/links`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.status === 409) return toast.error("Custom code exists");
            if (!res.ok) return toast.error(data.error || "Failed to create");

            toast.success("Short link created!");
            setUrlInput("");
            setCustomCode("");
            loadLinks();
        } catch {
            toast.error("Server error");
        }
    }

    async function handleDelete(code: string) {
        if (!confirm("Delete this link?")) return;

        try {
            const res = await fetch(`${API_BASE}/api/links/${code}`, {
                method: "DELETE",
            });
            if (!res.ok) return toast.error("Delete failed");

            toast.success("Deleted");
            loadLinks();
        } catch {
            toast.error("Server error");
        }
    }

    function handleCopy(code: string) {
        const short = `${window.location.origin}/${code}`;
        navigator.clipboard.writeText(short);
        toast.success("Copied");
    }

    const totalClicks = links.reduce((a, b) => a + b.clicks, 0);

    const latestClick = links
        .filter((l: any) => l.lastClicked)
        .sort(
            (a: any, b: any) =>
                new Date(b.lastClicked).getTime() - new Date(a.lastClicked).getTime()
        )[0];

    return (
        <>
            <PageMeta title="TinyLink Dashboard" />

            <div className="grid grid-cols-12 gap-4 md:gap-6">
                {/* Metrics */}
                <div className="col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <MetricCard title="Total Links" value={links.length} />
                    <MetricCard title="Total Clicks" value={totalClicks} />
                    <MetricCard
                        title="Latest Click"
                        value={
                            latestClick?.lastClicked
                                ? new Date(latestClick.lastClicked).toLocaleString()
                                : "—"
                        }
                    />
                </div>

                {/* Create Form */}
                <div className="col-span-12">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Create Short Link</h2>

                        <div className="flex flex-col md:flex-row gap-3">
                            <input
                                className="flex-1 border px-4 py-2 rounded-lg"
                                placeholder="Paste long URL"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                            />

                            <input
                                className="w-full md:w-40 border px-4 py-2 rounded-lg"
                                placeholder="Custom code"
                                value={customCode}
                                onChange={(e) => setCustomCode(e.target.value)}
                            />

                            <button
                                onClick={handleCreate}
                                className="bg-[#4c00b0] text-white px-6 py-2 rounded-lg"
                            >
                                Shorten
                            </button>
                        </div>
                    </div>
                </div>

                {/* Links List */}
                <div className="col-span-12 space-y-4">
                    {links.map((l: any) => (
                        <div
                            key={l.code}
                            className="bg-white dark:bg-gray-800 border rounded-xl p-4 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <a
                                    href={`${window.location.origin}/${l.code}`}
                                    target="_blank"
                                    className="text-lg font-semibold text-[#4c00b0]"
                                >
                                    {window.location.origin}/{l.code}
                                </a>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleCopy(l.code)}
                                        className="px-3 py-1.5 rounded bg-gray-100"
                                    >
                                        Copy
                                    </button>

                                    <button
                                        onClick={() => handleDelete(l.code)}
                                        className="px-3 py-1.5 rounded bg-gray-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 mt-2">{l.url}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

function MetricCard({ title, value }: { title: string; value: any }) {
    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-2xl font-semibold mt-1">{value}</h2>
        </div>
    );
}
