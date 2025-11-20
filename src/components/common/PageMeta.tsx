import { Helmet } from "react-helmet-async";

export default function PageMeta({
    title,
    description
}: {
    title?: string;
    description?: string;
}) {
    return (
        <Helmet>
            {title && <title>{title}</title>}
            {description && (
                <meta name="description" content={description} />
            )}
        </Helmet>
    );
}
