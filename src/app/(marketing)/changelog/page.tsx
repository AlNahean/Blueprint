import { allChangelogs } from "contentlayer/generated";
import { compareDesc } from "date-fns";

import { formatDate } from "@/lib/utils";
import { Mdx } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";

export const metadata = {
    title: "Changelog",
    description: "All the latest updates, features, and fixes for the project.",
};

export default function ChangelogPage() {
    const changelogs = allChangelogs.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date))
    );

    return (
        <div className="container py-6 lg:py-10 border-grid md:border-r md:border-l">
            {/* Header */}
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                <div className="flex-1 space-y-4">
                    <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
                        Changelog
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Follow the latest updates and improvements to the project.
                    </p>
                </div>
            </div>
            <div className="my-8 border-grid border-b"></div>

            {/* Timeline */}
            <div className="relative">
                {/* The vertical line */}
                <div className="absolute left-3 top-5 h-full w-px bg-border -translate-x-1/2"></div>

                {changelogs?.length ? (
                    <div className="space-y-12">
                        {changelogs.map((changelog, index) => (
                            <article key={changelog._id} id={changelog.slug} className="relative flex flex-col pl-10">
                                {/* Dot on the timeline */}
                                <div className="absolute left-3 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-primary"></div>

                                {/* Date */}
                                <time
                                    dateTime={changelog.date}
                                    className="text-sm text-muted-foreground"
                                >
                                    {formatDate(changelog.date)}
                                </time>

                                {/* Title */}
                                <h2 className="mt-1 text-2xl font-extrabold">{changelog.title}</h2>

                                {/* Tags */}
                                {changelog.tags && changelog.tags.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {changelog.tags.map(tag => (
                                            <Badge key={tag} variant="secondary">{tag}</Badge>
                                        ))}
                                    </div>
                                )}

                                {/* MDX Content */}
                                <div className="mt-4 prose prose-quoteless prose-neutral dark:prose-invert max-w-none">
                                    <Mdx code={changelog.body.code} />
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p>No changelog entries found.</p>
                )}
            </div>
        </div>
    );
}
