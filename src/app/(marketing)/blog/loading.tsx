import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
    return (
        <>
            <div className="container py-6 lg:py-10 border-grid md:border-r md:border-l">
                <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                    <div className="flex-1 space-y-4">
                        <Skeleton className="h-12 w-48 rounded-md" />
                        <Skeleton className="h-7 w-full max-w-lg rounded-md" />
                    </div>
                </div>
            </div>
            <div className="border-grid border-b"></div>
            <div className="container py-6 lg:py-10 border-grid md:border-r md:border-l">
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex flex-col space-y-3">
                            <Skeleton className="aspect-video w-full rounded-md" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-3/4 rounded-md" />
                                <Skeleton className="h-5 w-full rounded-md" />
                                <Skeleton className="h-4 w-1/3 rounded-md !mt-4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
