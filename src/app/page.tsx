
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MapPin, FileText, ShieldCheck, Users, RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Carousel, type CarouselImage } from "@/components/ui/carousel";
import React from "react";
import KASUPDALogo from '@/image/logo.png'; 

const initialCarouselImages: CarouselImage[] = [
  {
    src: KASUPDALogo,
    alt: 'KASUPDA Logo 1',
    hint: 'logo brand', 
    customClassName: "object-cover",
  },
  {
    src: KASUPDALogo,
    alt: 'KASUPDA Logo 2',
    hint: 'logo brand',
    customClassName: "object-cover",
  },
  {
    src: KASUPDALogo,
    alt: 'KASUPDA Logo 3',
    hint: 'logo brand',
    customClassName: "object-cover",
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
              autoPlay={initialCarouselImages.length > 1}
              interval={5000}
              showDots={initialCarouselImages.length > 1}
              showNavigation={initialCarouselImages.length > 1}
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
                  <Button
                    size="lg"
                  >
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
                What we do
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Core Functions of KASUPDA
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                KASUPDA is responsible for the planning, development, and regulation of urban areas within Kaduna State, ensuring sustainable growth and adherence to building codes.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-12 lg:grid-cols-2 lg:max-w-none mt-12">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Construction</CardTitle>
                <CardDescription>
                  Streamlined online application and processing for all your construction permits.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>Easily apply for building permits, track your application status, and receive approvals digitally. We ensure compliance with state building codes for safe and legal constructions.</p>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col space-y-1 items-start">
                  <Link href="#" className="text-sm text-primary hover:underline p-0">
                    - Building Permit
                  </Link>
                  <Link href="#" className="text-sm text-primary hover:underline p-0">
                    - Inspection and Completion
                  </Link>
                </div>
              </CardFooter>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              <CardHeader>
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Urban Planning and Development</CardTitle>
                <CardDescription>
                  Access master plans, approved layouts, and zoning regulations for sustainable development.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>Explore detailed information on Kaduna's master plan, find approved layouts for various areas, and understand zoning requirements for your projects. Ensure your development aligns with the state's strategic urban vision.</p>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col space-y-1 items-start">
                  <Link href="#" className="text-sm text-primary hover:underline p-0">
                    - Master plan
                  </Link>
                  <Link href="#" className="text-sm text-primary hover:underline p-0">
                    - Approved layout
                  </Link>
                  <Link href="#" className="text-sm text-primary hover:underline p-0">
                    - Zoning
                  </Link>
                </div>
              </CardFooter>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              <CardHeader>
                <ShieldCheck className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Compliance &amp; Enforcement</CardTitle>
                <CardDescription>
                  Ensuring adherence to building codes and urban planning regulations across the state.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>KASUPDA monitors construction activities and enforces regulations to maintain urban standards, ensure public safety, and promote orderly development in Kaduna State.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0">Report a Violation</Button>
              </CardFooter>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Public Enlightenment</CardTitle>
                <CardDescription>
                  Engaging and educating the public on urban planning matters and regulations.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
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
                src={KASUPDALogo}
                alt="KASUPDA Logo representing the Director General Dr. Abdrrahman Yahya"
                data-ai-hint="logo brand"
                width={400}
                height={400}
                className="rounded-full object-contain aspect-square shadow-2xl border-4 border-primary bg-white p-4"
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

