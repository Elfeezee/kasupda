
"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { Textarea } from '@/components/ui/textarea'; // Added Textarea

// Define Zod schema based on the form
// This is a simplified schema, you'll need to refine it with specific validations (min/max length, formats, etc.)
const permitApplicationSchema = z.object({
  // Box 1: Applicant
  title: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  surname: z.string().min(1, "Surname is required"),
  gender: z.enum(["Male", "Female"], { required_error: "Gender is required" }),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }),
  occupation: z.string().optional(),
  nationality: z.string().optional().default("Nigerian"),
  stateOfOrigin: z.string().optional(),
  localGov: z.string().optional(),
  phone1: z.string().min(1, "Phone 1 is required"),
  phone2: z.string().optional(),
  phone3: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  identificationType: z.object({
    internationalPassport: z.boolean().optional(),
    taxIdCard: z.boolean().optional(),
    nationalIdCard: z.boolean().optional(),
    voterRegCard: z.boolean().optional(),
    driversLicense: z.boolean().optional(),
  }).optional(),
  idNumber: z.string().optional(),

  // Box 2: Applicant Address
  appHouseNo: z.string().optional(),
  appStreetName: z.string().optional(),
  appDistrict: z.string().optional(),
  appCityTown: z.string().optional(),
  appState: z.string().optional().default("Kaduna"),
  appCountry: z.string().optional().default("Nigeria"),
  appPOBox: z.string().optional(),
  appCO: z.string().optional(),
  appAdditionalAddressInfo: z.string().optional(),

  // Box 3: Representative
  repFirstName: z.string().optional(),
  repMiddleName: z.string().optional(),
  repSurname: z.string().optional(),
  repPhone1: z.string().optional(),
  repPhone2: z.string().optional(),
  repEmail: z.string().email("Invalid email address").optional().or(z.literal('')),
  repIdentificationType: z.object({
    internationalPassport: z.boolean().optional(),
    taxIdCard: z.boolean().optional(),
    nationalIdCard: z.boolean().optional(),
    voterRegCard: z.boolean().optional(),
    driversLicense: z.boolean().optional(),
  }).optional(),
  repIdNumber: z.string().optional(),

  // Box 4: Representative's Address
  repHouseNo: z.string().optional(),
  repStreetName: z.string().optional(),
  repDistrict: z.string().optional(),
  repCityTown: z.string().optional(),
  repState: z.string().optional().default("Kaduna"),
  repCountry: z.string().optional().default("Nigeria"),
  repPOBox: z.string().optional(),
  repCO: z.string().optional(),
  repAdditionalAddressInfo: z.string().optional(),
  
  // Box 5: Plot
  landUse: z.string().optional(),
  purpose: z.string().optional(),
  plotDistrict: z.string().optional(),
  plotLGA: z.string().optional(),
  plotDescriptionAddress: z.string().min(1, "Plot Description/Address is required"),
});

type PermitApplicationFormValues = z.infer<typeof permitApplicationSchema>;

const identificationOptions = [
  { id: "internationalPassport", label: "International Passport" },
  { id: "taxIdCard", label: "Tax Identification Card" },
  { id: "nationalIdCard", label: "National ID Card" },
  { id: "voterRegCard", label: "Voter Registration Card" },
  { id: "driversLicense", label: "Driver's License" },
] as const;


export default function ResidentialBuildingPermitPage() {
  const { toast } = useToast();
  const { register, handleSubmit, control, formState: { errors } } = useForm<PermitApplicationFormValues>({
    resolver: zodResolver(permitApplicationSchema),
  });

  const onSubmit = (data: PermitApplicationFormValues) => {
    console.log("Form Data:", data);
    toast({
      title: "Application Submitted (Simulated)",
      description: "Your residential building permit application has been received for processing.",
      duration: 5000,
    });
    // Here you would typically send data to your backend
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">
            Application For Grant of Building Permission
          </CardTitle>
          <CardDescription className="text-center">
            Kaduna State Urban Planning and Development Authority
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-destructive font-semibold mb-2">
            This Form is FREE
          </p>
          <p className="text-center text-sm mb-4">
            An application processing fee of N5,000 must be paid before or at the point of submission of the Permission Application.
          </p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Box 1: Applicant */}
        <Card>
          <CardHeader>
            <CardTitle>BOX 1: APPLICANT</CardTitle>
            <CardDescription>The person whose name would be reflected on the Building Permission. Original identification document must be submitted.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="firstName">First Name*</Label>
                <Input id="firstName" {...register("firstName")} />
                {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <Label htmlFor="middleName">Middle Name</Label>
                <Input id="middleName" {...register("middleName")} />
              </div>
              <div>
                <Label htmlFor="surname">Surname*</Label>
                <Input id="surname" {...register("surname")} />
                {errors.surname && <p className="text-destructive text-xs mt-1">{errors.surname.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Gender*</Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" />
                        <Label htmlFor="male" className="font-normal">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" />
                        <Label htmlFor="female" className="font-normal">Female</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
                {errors.gender && <p className="text-destructive text-xs mt-1">{errors.gender.message}</p>}
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth*</Label>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="w-full justify-start text-left font-normal mt-1">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.dateOfBirth && <p className="text-destructive text-xs mt-1">{errors.dateOfBirth.message}</p>}
              </div>
              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <Input id="occupation" {...register("occupation")} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input id="nationality" {...register("nationality")} defaultValue="Nigerian" />
              </div>
              <div>
                <Label htmlFor="stateOfOrigin">State of Origin</Label>
                <Input id="stateOfOrigin" {...register("stateOfOrigin")} />
              </div>
              <div>
                <Label htmlFor="localGov">Local Gov.</Label>
                <Input id="localGov" {...register("localGov")} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="phone1">Phone 1*</Label>
                <Input id="phone1" type="tel" {...register("phone1")} />
                {errors.phone1 && <p className="text-destructive text-xs mt-1">{errors.phone1.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone2">Phone 2</Label>
                <Input id="phone2" type="tel" {...register("phone2")} />
              </div>
              <div>
                <Label htmlFor="phone3">Phone 3</Label>
                <Input id="phone3" type="tel" {...register("phone3")} />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label>Identification</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mt-2">
                {identificationOptions.map(opt => (
                  <div key={opt.id} className="flex items-center space-x-2">
                    <Controller
                        name={`identificationType.${opt.id}`}
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                id={`applicant_${opt.id}`}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        )}
                    />
                    <Label htmlFor={`applicant_${opt.id}`} className="font-normal text-sm">{opt.label}</Label>
                  </div>
                ))}
              </div>
            </div>
             <div>
              <Label htmlFor="idNumber">ID Number</Label>
              <Input id="idNumber" {...register("idNumber")} />
            </div>
          </CardContent>
        </Card>

        {/* Box 2: Applicant Address */}
        <Card>
          <CardHeader>
            <CardTitle>BOX 2: APPLICANT'S ADDRESS</CardTitle>
            <CardDescription>This should be your normal residential address.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="appHouseNo">House No</Label>
                <Input id="appHouseNo" {...register("appHouseNo")} />
              </div>
              <div>
                <Label htmlFor="appStreetName">Street Name</Label>
                <Input id="appStreetName" {...register("appStreetName")} placeholder="Ahmadu Bello Road" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="appDistrict">District</Label>
                <Input id="appDistrict" {...register("appDistrict")} placeholder="Sabon Gari" />
              </div>
              <div>
                <Label htmlFor="appCityTown">City/Town</Label>
                <Input id="appCityTown" {...register("appCityTown")} placeholder="Zaria" />
              </div>
              <div>
                <Label htmlFor="appState">State</Label>
                <Input id="appState" {...register("appState")} defaultValue="Kaduna" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div>
                <Label htmlFor="appCountry">Country</Label>
                <Input id="appCountry" {...register("appCountry")} defaultValue="Nigeria" />
              </div>
              <div>
                <Label htmlFor="appPOBox">P.O./P.M.B.</Label>
                <Input id="appPOBox" {...register("appPOBox")} placeholder="040 Zaria" />
              </div>
              <div>
                <Label htmlFor="appCO">C/O</Label>
                <Input id="appCO" {...register("appCO")} />
              </div>
            </div>
            <div>
              <Label htmlFor="appAdditionalAddressInfo">Additional Address Information</Label>
              <Textarea id="appAdditionalAddressInfo" {...register("appAdditionalAddressInfo")} placeholder="G.R.A Res. Estate" />
            </div>
          </CardContent>
        </Card>

        {/* Box 3: Representative */}
        <Card>
          <CardHeader>
            <CardTitle>BOX 3: REPRESENTATIVE (Optional)</CardTitle>
            <CardDescription>Applicants who wish to appoint a representative must complete this Box. Original identification document of representative is required.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="repFirstName">First Name</Label>
                <Input id="repFirstName" {...register("repFirstName")} />
              </div>
              <div>
                <Label htmlFor="repMiddleName">Middle Name</Label>
                <Input id="repMiddleName" {...register("repMiddleName")} />
              </div>
              <div>
                <Label htmlFor="repSurname">Surname</Label>
                <Input id="repSurname" {...register("repSurname")} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="repPhone1">Phone 1</Label>
                <Input id="repPhone1" type="tel" {...register("repPhone1")} />
              </div>
              <div>
                <Label htmlFor="repPhone2">Phone 2</Label>
                <Input id="repPhone2" type="tel" {...register("repPhone2")} />
              </div>
               <div>
                <Label htmlFor="repEmail">Email</Label>
                <Input id="repEmail" type="email" {...register("repEmail")} />
                {errors.repEmail && <p className="text-destructive text-xs mt-1">{errors.repEmail.message}</p>}
              </div>
            </div>
             <div>
              <Label>Representative's Identification</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mt-2">
                {identificationOptions.map(opt => (
                  <div key={opt.id} className="flex items-center space-x-2">
                     <Controller
                        name={`repIdentificationType.${opt.id}`}
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                id={`rep_${opt.id}`}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        )}
                    />
                    <Label htmlFor={`rep_${opt.id}`} className="font-normal text-sm">{opt.label}</Label>
                  </div>
                ))}
              </div>
            </div>
             <div>
              <Label htmlFor="repIdNumber">Representative's ID Number</Label>
              <Input id="repIdNumber" {...register("repIdNumber")} />
            </div>
          </CardContent>
        </Card>

        {/* Box 4: Representative's Address */}
        <Card>
          <CardHeader>
            <CardTitle>BOX 4: REPRESENTATIVE'S ADDRESS (If representative appointed)</CardTitle>
            <CardDescription>This should be your representative's normal residential address.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="repHouseNo">House No</Label>
                <Input id="repHouseNo" {...register("repHouseNo")} />
              </div>
              <div>
                <Label htmlFor="repStreetName">Street Name</Label>
                <Input id="repStreetName" {...register("repStreetName")} placeholder="Ahmadu Bello Road" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="repDistrict">District</Label>
                <Input id="repDistrict" {...register("repDistrict")} placeholder="Sabon Gari" />
              </div>
              <div>
                <Label htmlFor="repCityTown">City/Town</Label>
                <Input id="repCityTown" {...register("repCityTown")} placeholder="Zaria" />
              </div>
              <div>
                <Label htmlFor="repState">State</Label>
                <Input id="repState" {...register("repState")} defaultValue="Kaduna" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div>
                <Label htmlFor="repCountry">Country</Label>
                <Input id="repCountry" {...register("repCountry")} defaultValue="Nigeria" />
              </div>
              <div>
                <Label htmlFor="repPOBox">P.O./P.M.B.</Label>
                <Input id="repPOBox" {...register("repPOBox")} placeholder="040 Zaria" />
              </div>
              <div>
                <Label htmlFor="repCO">C/O</Label>
                <Input id="repCO" {...register("repCO")} />
              </div>
            </div>
            <div>
              <Label htmlFor="repAdditionalAddressInfo">Additional Address Information</Label>
              <Textarea id="repAdditionalAddressInfo" {...register("repAdditionalAddressInfo")} placeholder="G.R.A Res. Estate" />
            </div>
          </CardContent>
        </Card>

        {/* Box 5: Plot */}
        <Card>
          <CardHeader>
            <CardTitle>BOX 5: PLOT</CardTitle>
            <CardDescription>Please fill in the below information of the plot that has been or will be developed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="landUse">Land Use</Label>
                    <Input id="landUse" {...register("landUse")} />
                </div>
                <div>
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input id="purpose" {...register("purpose")} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="plotDistrict">District</Label>
                    <Input id="plotDistrict" {...register("plotDistrict")} />
                </div>
                <div>
                    <Label htmlFor="plotLGA">L.G.A</Label>
                    <Input id="plotLGA" {...register("plotLGA")} />
                </div>
            </div>
             <div>
                <Label htmlFor="plotDescriptionAddress">Plot Description / Address*</Label>
                <Textarea id="plotDescriptionAddress" {...register("plotDescriptionAddress")} />
                {errors.plotDescriptionAddress && <p className="text-destructive text-xs mt-1">{errors.plotDescriptionAddress.message}</p>}
             </div>
          </CardContent>
        </Card>

        <CardFooter className="flex flex-col items-center space-y-4">
          <Button type="submit" className="w-full md:w-1/2 lg:w-1/3 py-3 text-lg">Submit Application</Button>
          <Separator className="my-2" />
           <p className="text-xs text-muted-foreground text-center">
            KASUPDA Regulations, 2020 &nbsp;&nbsp;|&nbsp;&nbsp; Version 1.4 2020
          </p>
        </CardFooter>
      </form>
    </div>
  );
}
