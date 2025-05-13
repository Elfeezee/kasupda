import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12">
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4 text-left">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Build Amazing Apps Faster
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Leverage the power of AI and modern development tools to bring your ideas to life. Firebase Studio provides the foundation you need.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <Image
              src="https://picsum.photos/600/400"
              alt="Hero"
              data-ai-hint="abstract technology"
              width={600}
              height={400}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything You Need in One Place
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore the powerful features that make Firebase Studio the ideal choice for your next project.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Sparkles className="h-8 w-8 text-primary mb-2" />
                <CardTitle>GenAI Integration</CardTitle>
                <CardDescription>
                  Leverage cutting-edge AI models directly within your application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Effortlessly incorporate generative AI for text, images, and more, powered by Genkit.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0">Explore AI Features</Button>
              </CardFooter>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary mb-2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 8h8v8H8zM8 3v5M16 3v5M3 8h5M3 16h5M21 8h-5M21 16h-5M8 21v-5M16 21v-5"/></svg>
                <CardTitle>Next.js 15 & App Router</CardTitle>
                <CardDescription>
                  Build high-performance applications with the latest Next.js features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Utilize Server Components, optimized routing, and more for a fast and scalable experience.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0">Discover Next.js Benefits</Button>
              </CardFooter>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary mb-2"><path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 1 0-8c-2 0-4 1.33-6 4Z"/></svg>
                <CardTitle>ShadCN UI & Tailwind CSS</CardTitle>
                <CardDescription>
                  Beautiful, accessible, and customizable components out of the box.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Rapidly develop your UI with a comprehensive set of pre-built components and utility classes.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0">See Component Library</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
