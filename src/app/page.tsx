import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, MapPin, FileText } from "lucide-react"; // Added MapPin, FileText
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
                  Streamlining Urban Development in Kaduna State
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  KASUPDA is dedicated to fostering sustainable urban growth and development through efficient planning, regulation, and management of land use within Kaduna State.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg">
                  Apply for Permit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <Image
              src="https://picsum.photos/600/400"
              alt="Kaduna Cityscape"
              data-ai-hint="kaduna urban planning"
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
                Our Services
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Empowering KASUPDA with Modern Tools
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover how KASUPDA leverages technology to enhance urban planning and development services in Kaduna State.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Sparkles className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>
                  Leverage AI for smarter urban planning and development analysis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Utilize AI for land use analysis, compliance checks, and optimizing development proposals.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0">Explore AI Solutions</Button>
              </CardFooter>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Digital Land Management</CardTitle>
                <CardDescription>
                  Efficiently manage land records, permits, and approvals online.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>A centralized platform for transparent and accessible land administration processes and permit applications.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0">Access Land Services</Button>
              </CardFooter>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Data-Driven Decisions</CardTitle>
                <CardDescription>
                  Utilize comprehensive data for informed urban planning strategies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Access reports, analytics, and visualizations to guide development policies and ensure sustainable growth.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0">View Planning Data</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
