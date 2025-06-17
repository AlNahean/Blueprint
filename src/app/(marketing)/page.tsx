import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";



export default function Home() {
  return (
    <>
      <div className="container py-6   border-r border-l border-grid  ">
        <>
          <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 flex justify-center items-center h-[calc(100vh_-_190px)]  ">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
              <Link
                href={siteConfig.links.twitter}
                className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
                target="_blank"
              >
                Follow along on Twitter
              </Link>
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                An example app built using Next.js 5.
              </h1>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                I&apos;m building a web app with Next.js 13 and open sourcing
                everything. Follow along as we figure this out together.
              </p>
              <div className="space-x-4">
                <div className={cn(buttonVariants({ size: "lg" }))}>
                  Get Started
                </div>
                <div
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  GitHub
                </div>

              </div>
            </div>
          </section>
        </>
      </div>
    </>
  )
}
