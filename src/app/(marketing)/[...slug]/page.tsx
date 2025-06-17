// src/app/(marketing)/[...slug]/page.tsx

import { notFound } from "next/navigation"
import { allPages } from "contentlayer/generated"
import { Mdx } from "@/components/mdx-components"
import type { Metadata } from "next"

interface PageProps {
    params: {
        slug: string[]
    }
}

// --- METADATA FUNCTION ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    // Logic is now directly inside here
    const slug = params?.slug?.join("/")
    const page = allPages.find((page) => page._raw.flattenedPath === `pages/${slug}`)

    if (!page) {
        return {}
    }

    return {
        title: page.title,
        description: page.description,
    }
}

// --- STATIC PARAMS FUNCTION (NO CHANGE) ---
export async function generateStaticParams(): Promise<PageProps["params"][]> {
    return allPages.map((page) => ({
        slug: page._raw.flattenedPath.replace(/^pages\//, "").split("/"),
    }))
}

// --- PAGE COMPONENT ---
export default async function PagePage({ params }: PageProps) {
    // Logic is now directly inside here
    const slug = params?.slug?.join("/")
    const page = allPages.find((page) => page._raw.flattenedPath === `pages/${slug}`)

    if (!page) {
        notFound()
    }

    return (
        <article className="container border-grid md:border-r md:border-l py-6 lg:py-10">
            <div className="mx-auto max-w-3xl">
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">{page.title}</h1>
                    {page.description && (
                        <p className="text-lg text-muted-foreground">{page.description}</p>
                    )}
                </div>
                <hr className="my-4" />
                <Mdx code={page.body.code} />
            </div>
        </article>
    )
}
