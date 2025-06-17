import { Skeleton } from "@/components/ui/skeleton";

export default function DocsLoading() {
    return (
        <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_240px]">
            {/* Main Content Skeleton */}
            <div className="mx-auto w-full min-w-0">
                <div className="space-y-4">
                    <Skeleton className="h-10 w-1/2" />
                    <Skeleton className="h-6 w-3/4" />
                </div>
                <hr className="my-6" />
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-5/6" />
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-1/4" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-4/6" />
                    </div>
                </div>
            </div>

            {/* TOC Skeleton */}
            <div className="hidden xl:block">
                <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] pt-10">
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-2/4 rounded-md" />
                        <Skeleton className="h-5 w-3/4 rounded-md" />
                        <Skeleton className="h-5 w-1/2 rounded-md" />
                        <Skeleton className="h-5 w-2/3 rounded-md" />
                    </div>
                </div>
            </div>
        </main>
    );
}
