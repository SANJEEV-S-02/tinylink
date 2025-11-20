import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const API_BASE = "https://tinylink-icao.onrender.com";
export default function RedirectPage() {
    const { code } = useParams();
    useEffect(() => {
        async function go() {
            try {
                const res = await fetch(`${API_BASE}/${code}`);
                const data = await res.json();
                if (res.ok && data.url) {
                    window.location.href = data.url;
                }
                else {
                    document.body.innerHTML = `<h1>Link Not Found</h1>`;
                }
            }
            catch (err) {
                document.body.innerHTML = `<h1>Server Error</h1>`;
            }
        }
        go();
    }, [code]);
    return _jsx("p", { children: "Redirecting..." });
}
