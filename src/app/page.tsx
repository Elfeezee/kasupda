
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MapPin, FileText, ShieldCheck, SearchCheck, Building, Users, RefreshCcw } from "lucide-react";
import Image from "next/image";
import { Carousel, type CarouselImage } from "@/components/ui/carousel";


const initialCarouselImages: CarouselImage[] = [
  {
    src: "https://picsum.photos/1200/800?random=1",
    alt: "KASUPDA Authority Building or Kaduna Landmark",
    hint: "kaduna landmark building",
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
];

export default function Home() {

  return (
    <div className="flex flex-col items-center space-y-12">
      <section className="w-full">
        <div className="container px-0 md:px-0 max-w-full">
          <div className="relative">
            <Carousel
              images={initialCarouselImages}
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
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-primary hover:text-white">
                    Renew Permit
                    <RefreshCcw className="ml-2 h-5 w-5" />
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
                Core Functions of KASUPDA
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                KASUPDA is responsible for the planning, development, and regulation of urban areas within Kaduna State, ensuring sustainable growth and adherence to building codes.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Building Permits & Approvals</CardTitle>
                <CardDescription>
                  Streamlined online application and processing for all your construction permits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Easily apply for building permits, track your application status, and receive approvals digitally. We ensure compliance with state building codes for safe and legal constructions.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0">Start Application</Button>
              </CardFooter>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Urban Planning & Zoning</CardTitle>
                <CardDescription>
                  Access master plans, zoning regulations, and design guidelines for sustainable development.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Stay informed about Kaduna's urban development framework. Verify land use, check zoning compliance, and access design standards to ensure your project aligns with the state's vision.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0">View Master Plan</Button>
              </CardFooter>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <ShieldCheck className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Compliance & Enforcement</CardTitle>
                <CardDescription>
                  Ensuring adherence to building codes and urban planning regulations across the state.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>KASUPDA monitors construction activities and enforces regulations to maintain urban standards, ensure public safety, and promote orderly development in Kaduna State.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0">Report a Violation</Button>
              </CardFooter>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <SearchCheck className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Land Use Verification</CardTitle>
                <CardDescription>
                  Verify land use status and obtain necessary clearances for property development.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Our services include thorough verification of land records and designated use, helping you make informed decisions and avoid potential conflicts in your development projects.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0">Verify Land Use</Button>
              </CardFooter>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Building className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Development Control</CardTitle>
                <CardDescription>
                  Monitoring and controlling physical development to ensure it aligns with approved plans.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>We actively monitor ongoing construction projects to ensure they adhere to approved plans, building codes, and safety standards, fostering a well-organized urban landscape.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0">Learn About Control</Button>
              </CardFooter>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Public Enlightenment</CardTitle>
                <CardDescription>
                  Engaging and educating the public on urban planning matters and regulations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>KASUPDA is committed to sensitizing the public about urban planning laws, development procedures, and the importance of orderly settlement for a sustainable Kaduna State.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0">Get Informed</Button>
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
                src="https://picsum.photos/400/400?random=6" 
                alt="Director General Dr. Abdrrahman Yahya"
                data-ai-hint="male avatar"
                width={400}
                height={400}
                className="rounded-full object-cover aspect-square shadow-2xl border-4 border-primary"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4 text-left">
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Dr. Abdrrahman Yahya
              </h3>
              <p className="text-muted-foreground md:text-lg">
                Our Director General, Dr. Abdrrahman Yahya, is a visionary leader, deeply committed to the advancement and modernization of KASUPDA. With a steadfast dedication to progress, he champions innovative strategies and fosters a culture of excellence within the authority. His tireless efforts are geared towards transforming Kaduna State into a model of sustainable urban development, ensuring a brighter future for all its citizens.
              </p>
              <p className="text-muted-foreground md:text-lg">
                Under his astute guidance, KASUPDA has embraced cutting-edge technologies and community-centric approaches to urban planning. Dr. Yahya's unwavering commitment to transparency, efficiency, and public service continues to drive the authority towards achieving new heights in urban governance and development, significantly bettering the lives of the people and the operational capacity of the authority.
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
