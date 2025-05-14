
"use client";

import type { Metadata } from 'next';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useToast } from '@/hooks/use-toast';


// export const metadata: Metadata = { // Cannot export metadata from client component
//   title: 'Contact Us | KASUPDA - Kaduna State Urban Planning and Development Authority',
//   description: 'Get in touch with KASUPDA for inquiries, support, or feedback. Find our contact details and send us a message directly through our portal.',
// };

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

async function handleFormSubmit(data: z.infer<typeof formSchema>) {
  "use server";
  // In a real application, you would send this data to your backend
  console.log("Form submitted:", data);
  // You might want to return a success/error message or redirect
  return { success: true, message: "Feedback submitted successfully!" };
}


export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await handleFormSubmit(values);
    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-12">
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10 md:mb-12">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-primary">
              Contact Us & Feedback
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
              We&apos;re here to help. Reach out to us with your inquiries or share your feedback.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Contact Information Section */}
            <div className="space-y-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Our Office</CardTitle>
                  <CardDescription>Find us at our main office in Kaduna.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-foreground">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 mr-3 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p>No. 1 KASUPDA Road, Kaduna City, Kaduna State, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 mr-3 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p>+234 (0) 800 123 4567 (Toll-Free)</p>
                      <p>+234 (0) 700 KASUPDA (Direct Line)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 mr-3 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p>info@kasupda.kd.gov.ng</p>
                      <p>feedback@kasupda.kd.gov.ng</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
               <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Operating Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-foreground">
                  <p><strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM</p>
                  <p><strong>Saturday - Sunday:</strong> Closed</p>
                  <p><strong>Public Holidays:</strong> Closed</p>
                </CardContent>
              </Card>
            </div>

            {/* Feedback Form Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we&apos;ll get back to you.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Full Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Subject of your message" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Type your message here..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                       {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                       {!form.formState.isSubmitting && <Send className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
