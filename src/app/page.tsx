import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, MapPin, FileText } from "lucide-react";
import Image from "next/image";
import { Carousel, type CarouselImage } from "@/components/ui/carousel";

export default function Home() {
  const carouselImages: CarouselImage[] = [
    {
      src: "https://picsum.photos/1200/800?random=1",
      alt: "KASUPDA Authority Building or Kaduna Landmark",
      hint: "kaduna landmark building",
      // Will use imageClassName="object-cover" from Carousel prop by default
    },
    {
      src: "https://picsum.photos/1200/800?random=2",
      alt: "Urban Planning in Progress",
      hint: "urban planning city map",
    },
    {
      src: "https://picsum.photos/1200/800?random=3",
      alt: "Kaduna State Development Project",
      hint: "kaduna development aerial",
    },
    // If you provide a link for an image, you can replace the 'src' value in one of the items above,
    // or add a new item like the example below.
    // Remember to also ensure the domain of your image (e.g., 'your-image-host.com')
    // is added to the remotePatterns in next.config.ts.
    // Example structure for a new image:
    // {
    //   src: "YOUR_IMAGE_LINK_HERE",
    //   alt: "Description of your image",
    //   hint: "relevant keywords",
    //   customClassName: "object-cover", // or "object-contain"
    // }
  ];

  return (
    <div className="flex flex-col items-center space-y-12">
      <section className="w-full">
        <div className="container px-0 md:px-0 max-w-full">
          <div className="relative">
            <Carousel
              images={carouselImages}
              className="w-full h-[calc(100vh-var(--header-height,100px))] min-h-[400px] md:min-h-[500px] lg:min-h-[600px] shadow-lg"
              imageClassName="object-cover"
              autoPlay={true}
              interval={5000}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 bg-black/60 p-4 md:p-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
                  Streamlining Urban Development in Kaduna State
                </h1>
                <p className="max-w-[700px] mx-auto text-gray-100 md:text-xl">
                  Welcome to the official digital portal of KASUPDA. Discover services, apply for permits, and stay updated on urban planning initiatives in Kaduna.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row sm:justify-center pt-4">
                  <Button size="lg">
                    Apply for Permit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
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

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                Leadership
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Meet Our Director General
              </h2>
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="https://picsum.photos/400/400?random=5"
                alt="Director General"
                data-ai-hint="director general portrait"
                width={400}
                height={400}
                className="rounded-full object-cover aspect-square shadow-2xl border-4 border-primary"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4 text-left">
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                [Director General's Name]
              </h3>
              <p className="text-muted-foreground md:text-lg">
                [Insert a brief and inspiring paragraph about the Director General here. Highlight their vision, commitment, and leadership in driving KASUPDA's mission towards a more developed and sustainable Kaduna State. Mention key achievements or focus areas if appropriate.]
              </p>
              <p className="text-muted-foreground md:text-lg">
                [Another paragraph can go here if more space is needed for their biography, experience, or message to the public.]
              </p>
              <Button variant="outline" size="lg" className="self-start">
                Read Full Bio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}