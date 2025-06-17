// app/docs/page.tsx

import { allDocs } from "contentlayer/generated";
import Link from "next/link";
import { compareDesc } from "date-fns";

export const metadata = {
    title: "Documentation",
    description: "Browse all documentation for our project.",
};

// This component does NOT receive `params` because it's a static page.
export default function DocsIndexPage() {
    // Sort docs by order if available, otherwise by title
    const docs = allDocs.sort((a, b) => (a.order || 0) - (b.order || 0) || a.title.localeCompare(b.title));

    return (
        <div className="prose dark:prose-invert max-w-3xl mx-auto px-4 py-8">
            <h1>Documentation</h1>
            <p>
                Welcome to our documentation. Select a document below to get started.
            </p>
            <hr />
            <div className="mt-8">
                {docs.map((doc) => (
                    <article key={doc._id} className="mb-6">
                        <Link href={doc.url} className="no-underline">
                            <h2 className="text-xl font-bold mb-1 hover:underline">{doc.title}</h2>
                        </Link>
                        {doc.description && (
                            <p className="text-slate-700 dark:text-slate-300 mt-0">
                                {doc.description}
                            </p>
                        )}
                    </article>
                ))}
            </div>
        </div>
    );
}