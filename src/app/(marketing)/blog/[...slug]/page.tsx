// src/app/blog/[...slug]/page.tsx

import { cache } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { allAuthors, allPosts, Author, Post } from "contentlayer/generated";
import type { Metadata } from "next";

import { Mdx } from "@/components/mdx-components";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { DashboardTableOfContents } from "@/components/common/toc";
import { absoluteUrl, cn, formatDate } from "@/lib/utils";
import { getTableOfContents } from "@/lib/toc";

// --- 1. Centralized and Cached Data Fetching ---

interface PostPageProps {
    params: {
        slug: string[];
    };
}

/**
 * Fetches and processes post data, including authors and TOC.
 * Wrapped in React.cache to prevent re-fetching the same data within a single request.
 */
const getPostData = cache(async (params: PostPageProps["params"]) => {
    const slug = params.slug.join("/");
    const post = allPosts.find((p) => p._raw.flattenedPath === `blog/${slug}`);

    if (!post) {
        return null;
    }

    const authors = post.authors
        .map((authorId) =>
            allAuthors.find((author) => author._raw.flattenedPath === `authors/${authorId}`)
        )
        .filter((author): author is Author => !!author);

    const toc = await getTableOfContents(post.body.raw);

    return { post, authors, toc };
});

// --- 2. Metadata and Static Param Generation ---

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const data = await getPostData(params);

    if (!data) {
        return {};
    }

    const { post, authors } = data;
    const url = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const ogUrl = new URL(`${url}/api/og`);
    ogUrl.searchParams.set("heading", post.title);
    ogUrl.searchParams.set("type", "Blog Post");
    ogUrl.searchParams.set("mode", "dark");

    return {
        title: post.title,
        description: post.description,
        authors: authors.map((author) => ({ name: author.title })),
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            url: absoluteUrl(post.url),
            images: [
                { url: ogUrl.toString(), width: 1200, height: 630, alt: post.title },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [ogUrl.toString()],
        },
    };
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
    return allPosts.map((post) => ({
        slug: post._raw.flattenedPath.replace("blog/", "").split("/"),
    }));
}

// --- 3. Abstracted Presentational Components ---

/**
 * Renders the header section of the blog post, including title, date, and authors.
 */
function PostHeader({ post, authors }: { post: Post; authors: Author[] }) {
    return (
        <div className="space-y-2">
            {post.date && (
                <time dateTime={post.date} className="block text-sm text-muted-foreground">
                    Published on {formatDate(post.date)}
                </time>
            )}
            <h1 className="font-heading text-4xl leading-tight md:text-5xl">
                {post.title}
            </h1>
            {authors.length > 0 && (
                <div className="flex items-center space-x-4 pt-2">
                    {authors.map((author) => (
                        <Link
                            key={author._id}
                            href={`https://twitter.com/${author.twitter}`}
                            className="flex items-center space-x-2 text-sm"
                        >
                            <Image
                                src={author.avatar}
                                alt={author.title}
                                width={42}
                                height={42}
                                className="rounded-full bg-white"
                            />
                            <div className="flex-1 text-left leading-tight">
                                <p className="font-medium">{author.title}</p>
                                <p className="text-[12px] text-muted-foreground">
                                    @{author.twitter}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

/**
 * Renders the sticky Table of Contents sidebar.
 */
function PostTableOfContents({ toc }: { toc: Awaited<ReturnType<typeof getTableOfContents>> }) {
    return (
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
            <DashboardTableOfContents toc={toc} />
        </div>
    );
}

// --- 4. Main Page Component with Responsive Grid Layout ---

export default async function PostPage({ params }: PostPageProps) {
    const data = await getPostData(params);

    if (!data) {
        notFound();
    }

    const { post, authors, toc } = data;

    return (
        <article className="container grid grid-cols-1 xl:grid-cols-[200px_minmax(0,1fr)_250px] xl:gap-x-12 py-6 lg:py-10 border-grid md:border-r md:border-l ">
            {/* Column 1: "Back to Blog" Link (Desktop only) */}
            <aside className="hidden xl:flex">
                <div className="sticky top-16 h-fit">
                    <Link
                        href="/blog"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "inline-flex items-center justify-start"
                        )}
                    >
                        <Icons.chevronLeft className="mr-2 h-4 w-4" />
                        See all posts
                    </Link>
                </div>
            </aside>

            {/* Column 2: Main Post Content */}
            <main className="min-w-0">
                <PostHeader post={post} authors={authors} />

                {post.image && (
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={720}
                        height={405}
                        className="my-8 rounded-md border bg-muted"
                        priority
                    />
                )}

                {/* Adding Tailwind's typography plugin class for beautiful MDX rendering */}
                <div className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none">
                    <Mdx code={post.body.code} />
                </div>

                <hr className="my-8" />

                {/* Mobile-only "Back to Blog" Link */}
                <div className="flex justify-center xl:hidden">
                    <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
                        <Icons.chevronLeft className="mr-2 h-4 w-4" />
                        See all posts
                    </Link>
                </div>
            </main>

            {/* Column 3: Table of Contents (Desktop only) */}
            <aside className="hidden xl:block">
                <PostTableOfContents toc={toc} />
            </aside>
        </article>
    );
}