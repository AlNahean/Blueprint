// src/app/(extra)/docs/[...slug]/page.tsx

import { notFound } from "next/navigation";
import { allDocs } from ".contentlayer/generated";
import type { Metadata } from "next";
import { Mdx } from "@/components/mdx-components"; // 1. Import your new client component
import { DashboardTableOfContents } from "@/components/common/toc"
import { getTableOfContents } from "@/lib/toc"
import { DocsPager } from "@/components/common/pager"
import { DocsPageHeader } from "@/components/common/page-header"


// This interface defines the shape of the params object
interface DocPageProps {
    params: {
        slug: string[]; // slug is an array of strings
    };
}

// Statically generate routes at build time (NO CHANGES HERE)
export async function generateStaticParams(): Promise<DocPageProps["params"][]> {
    return allDocs.map((doc) => ({
        slug: doc._raw.flattenedPath.replace(/^docs\//, "").split("/"),
    }));
}

// Helper function to find the document (NO CHANGES HERE)
async function getDocFromParams({ params }: DocPageProps) {
    const slug = params.slug.join("/");
    const doc = allDocs.find((doc) => doc._raw.flattenedPath === `docs/${slug}`);
    return doc;
}

// Generate dynamic metadata for SEO (NO CHANGES HERE)
export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
    const doc = await getDocFromParams({ params });
    if (!doc) return {};
    return { title: doc.title, description: doc.description };
}

// The main page component
export default async function DocPage({ params }: DocPageProps) {
    const doc = await getDocFromParams({ params });

    if (!doc) {
        notFound();
    }

    // 2. We are no longer calling the hook here.
    const toc = await getTableOfContents(doc.body.raw)
    return (
        <>
            <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
                <div className="mx-auto w-full min-w-0">
                    <DocsPageHeader heading={doc.title} text={doc.description} />

                    <Mdx code={doc.body.code} />
                    <hr className="my-4 md:my-6" />
                    {/* <DocsPager doc={doc} /> */}
                </div>
                <div className="hidden text-sm xl:block">
                    <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
                        <DashboardTableOfContents toc={toc} />
                    </div>
                </div>
            </main>


        </>
    );
}
