
"use client";

import React, { useState } from 'react';
import { useForm, Controller, type FieldName } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// Define Zod schema based on the form
const bpoPermitApplicationSchema = z.object({
  kbpNumber: z.string().optional(),
  kdlNumber: z.string().optional(),

  // Box 1: APPLICANT (Organization)
  orgName: z.string().min(1, "Name of Organisation is required"),
  cacNumber: z.string().optional(),
  dateOfRegistration: z.date().optional(),
  orgTaxIdNumber: z.string().optional(),
  orgPhone: z.string().min(1, "Organisation phone is required").regex(/^\+?[0-9\s-()]+$/, "Invalid phone number format"),
  orgEmail: z.string().email("Invalid email address").optional().or(z.literal('')),

  // CEO/MD/Chairman Information
  ceoTitle: z.string().optional(),
  ceoFirstName: z.string().min(1, "CEO/MD First Name is required"),
  ceoMiddleName: z.string().optional(),
  ceoSurname: z.string().min(1, "CEO/MD Surname is required"),
  ceoDesignation: z.string().optional(),
  ceoPhone: z.string().regex(/^\+?[0-9\s-()]*$/, "Invalid phone number format").optional().or(z.literal('')),
  ceoEmail: z.string().email("Invalid email address").optional().or(z.literal('')),
  ceoIdentificationType: z.object({
    internationalPassport: z.boolean().optional(),
    taxIdCard: z.boolean().optional(),
    nationalIdCard: z.boolean().optional(),
    voterRegCard: z.boolean().optional(),
    driversLicense: z.boolean().optional(),
  }).optional().default({}),
  ceoIdNumber: z.string().optional(),

  // Box 2: ADDRESS (Organization Address)
  orgHouseNo: z.string().optional(),
  orgStreetName: z.string().optional(),
  orgDistrict: z.string().optional(),
  orgCityTown: z.string().optional(),
  orgState: z.string().optional().default("Kaduna"),
  orgCountry: z.string().optional().default("Nigeria"),
  orgPOBox: z.string().optional(),
  orgCO: z.string().optional(),
  orgAdditionalAddressInfo: z.string().optional(),

  // Box 3: REPRESENTATIVE
  repFirstName: z.string().optional(),
  repMiddleName: z.string().optional(),
  repSurname: z.string().optional(),
  repPhone1: z.string().regex(/^\+?[0-9\s-()]*$/, "Invalid phone number format").optional().or(z.literal('')),
  repPhone2: z.string().regex(/^\+?[0-9\s-()]*$/, "Invalid phone number format").optional().or(z.literal('')),
  repEmail: z.string().email("Invalid email address").optional().or(z.literal('')),
  repIdentificationType: z.object({
    internationalPassport: z.boolean().optional(),
    taxIdCard: z.boolean().optional(),
    nationalIdCard: z.boolean().optional(),
    voterRegCard: z.boolean().optional(),
    driversLicense: z.boolean().optional(),
  }).optional().default({}),
  repIdNumber: z.string().optional(),

  // Box 4: PLOT
  plotLandUse: z.string().optional(),
  plotPurpose: z.string().optional(),
  plotDistrict: z.string().optional(),
  plotLGA: z.string().optional(),
  plotDescriptionAddress: z.string().min(1, "Plot Description/Address is required"),

  // Box 5: REQUIRED DOCUMENTS
  docDigitalCertOfOccupancy: z.boolean().optional().default(false),
  docKadgisAcknowledgement: z.boolean().optional().default(false),
  docStructuralCalculations: z.boolean().optional().default(false),
  docArchitecturalDrawings: z.boolean().optional().default(false),
  docMechanicalElectricalDrawings: z.boolean().optional().default(false),
  docStructuralDrawings: z.boolean().optional().default(false),
  docSiteAnalysisReport: z.boolean().optional().default(false),
  docKepasEnvImpactAssessment: z.boolean().optional().default(false),
  docKadgisDlaSketchPlan: z.boolean().optional().default(false),
  docSoilInvestigationReport: z.boolean().optional().default(false),
  docServiceApprovals: z.boolean().optional().default(false),
  docTaxClearanceCert: z.boolean().optional().default(false),
  
  // Box 6: SIGNATURE (as Declaration)
  declaration: z.boolean().refine(val => val === true, {
    message: "You must agree to the declaration to submit the application."
  })
});

type BpoPermitApplicationFormValues = z.infer<typeof bpoPermitApplicationSchema>;

const identificationOptions = [
  { id: "internationalPassport" as const, label: "International Passport" },
  { id: "taxIdCard" as const, label: "Tax Identification Card" },
  { id: "nationalIdCard" as const, label: "National ID Card" },
  { id: "voterRegCard" as const, label: "Voter Registration Card" },
  { id: "driversLicense" as const, label: "Driver's License" },
];

const requiredDocumentsList = [
    { id: "docDigitalCertOfOccupancy" as const, label: "Copy of the Digital Certificate of Occupancy (KADGIS)" },
    { id: "docKadgisAcknowledgement" as const, label: "Copy of KADGIS Acknowledgement Letter (in case you applied for digital CofO)" },
    { id: "docStructuralCalculations" as const, label: "Copy of Structural Calculations" },
    { id: "docArchitecturalDrawings" as const, label: "Copy of Architectural Drawings and Details" },
    { id: "docMechanicalElectricalDrawings" as const, label: "Copy of Mechanical/Electrical Drawings and Details" },
    { id: "docStructuralDrawings" as const, label: "Copy of Structural Drawings" },
    { id: "docSiteAnalysisReport" as const, label: "Site Analysis Report" },
    { id: "docKepasEnvImpactAssessment" as const, label: "Copy of KEPA's Environment Impact Assessment" },
    { id: "docKadgisDlaSketchPlan" as const, label: "Copy of KADGIS DLA Sketch Plan" },
    { id: "docSoilInvestigationReport" as const, label: "Soil Investigation Report" },
    { id: "docServiceApprovals" as const, label: "Copy Of Service Approvals (Fire and Police Reports)" },
    { id: "docTaxClearanceCert" as const, label: "Copy of Tax Clearance Certificate" },
];


const steps = [
  { id: 1, name: "Organisation Details", fields: ['orgName', 'orgPhone', 'ceoFirstName', 'ceoSurname'] as FieldName<BpoPermitApplicationFormValues>[] },
  { id: 2, name: "Organisation Address", fields: [] as FieldName<BpoPermitApplicationFormValues>[] }, 
  { id: 3, name: "Representative", fields: ['repEmail'] as FieldName<BpoPermitApplicationFormValues>[] },
  { id: 4, name: "Plot Details", fields: ['plotDescriptionAddress'] as FieldName<BpoPermitApplicationFormValues>[] },
  { id: 5, name: "Required Documents", fields: [] as FieldName<BpoPermitApplicationFormValues>[] },
  { id: 6, name: "Declaration", fields: ['declaration'] as FieldName<BpoPermitApplicationFormValues>[] },
];

export default function CommercialIndustrialOtherPermitPage() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, control, formState: { errors }, trigger } = useForm<BpoPermitApplicationFormValues>({
    resolver: zodResolver(bpoPermitApplicationSchema),
    mode: "onChange", 
    defaultValues: {
      kbpNumber: "",
      kdlNumber: "",
      orgName: "",
      cacNumber: "",
      // dateOfRegistration: undefined, // Will be handled by Controller
      orgTaxIdNumber: "",
      orgEmail: "",
      ceoTitle: "",
      ceoFirstName: "",
      ceoMiddleName: "",
      ceoSurname: "",
      ceoDesignation: "",
      ceoPhone: "",
      ceoEmail: "",
      ceoIdentificationType: {},
      ceoIdNumber: "",
      orgHouseNo: "",
      orgStreetName: "",
      orgDistrict: "",
      orgCityTown: "",
      orgState: "Kaduna",
      orgCountry: "Nigeria",
      orgPOBox: "",
      orgCO: "",
      orgAdditionalAddressInfo: "",
      repFirstName: "",
      repMiddleName: "",
      repSurname: "",
      repPhone1: "",
      repPhone2: "",
      repEmail: "",
      repIdentificationType: {},
      repIdNumber: "",
      plotLandUse: "",
      plotPurpose: "",
      plotDistrict: "",
      plotLGA: "",
      plotDescriptionAddress: "",
      docDigitalCertOfOccupancy: false,
      docKadgisAcknowledgement: false,
      docStructuralCalculations: false,
      docArchitecturalDrawings: false,
      docMechanicalElectricalDrawings: false,
      docStructuralDrawings: false,
      docSiteAnalysisReport: false,
      docKepasEnvImpactAssessment: false,
      docKadgisDlaSketchPlan: false,
      docSoilInvestigationReport: false,
      docServiceApprovals: false,
      docTaxClearanceCert: false,
      declaration: false,
    }
  });

  const onSubmit = (data: BpoPermitApplicationFormValues) => {
    console.log("Building Permit for Organization Form Data:", data);
    toast({
      title: "Application Submitted (Simulated)",
      description: "Your Building Permit for Organization application has been received for processing.",
      duration: 5000,
    });
    // Potentially redirect or clear form
  };

  const handleNextStep = async () => {
    const currentStepConfig = steps.find(step => step.id === currentStep);
    if (currentStepConfig && currentStepConfig.fields.length > 0) {
      const isValid = await trigger(currentStepConfig.fields);
      if (!isValid) {
        toast({
          title: "Validation Error",
          description: "Please correct the errors before proceeding.",
          variant: "destructive",
        });
        return;
      }
    }
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-center text-primary">
            Application For Grant of Building Permit (For Organisation)
          </CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">
            Kaduna State Urban Planning and Development Authority
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-destructive font-semibold mb-1">This Form is FREE</p>
          <p className="text-center text-xs sm:text-sm mb-1">
            Fill in CAPITAL LETTERS and tick the appropriate items. DO NOT FOLD this form.
          </p>
          <p className="text-center text-xs sm:text-sm mb-4">
            An application processing fee of N10,000 must be paid before or at the point of submission of the Permit Application.
          </p>
          <Card className="bg-muted/50 p-4">
            <CardTitle className="text-base font-semibold text-center mb-2">FOR OFFICIAL USE ONLY</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Application Date:</span> ______ / ______ / ______ (Day / Month / Year)</div>
              <div><span className="font-medium">Application Fees:</span> [ ] Application Processing Fee</div>
            </div>
          </Card>
        </CardContent>
      </Card>

      {/* Stepper UI */}
      <div className="mb-8 p-2 sm:p-4 border rounded-lg shadow-sm overflow-x-auto">
        <div className="flex items-start w-full min-w-[360px] sm:min-w-full">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center px-0.5 sm:px-1 py-1 flex-shrink-0" style={{width: `${100 / steps.length}%`}}>
                <div
                  className={cn(
                    "w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    currentStep > step.id ? "bg-primary border-primary text-primary-foreground" :
                    currentStep === step.id ? "bg-primary/20 border-primary text-primary scale-110" :
                    "bg-muted border-border text-muted-foreground"
                  )}
                >
                  {currentStep > step.id ? <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4" /> : step.id}
                </div>
                <p className={cn(
                  "mt-1 text-[10px] leading-tight sm:text-xs font-medium transition-all duration-300 break-words",
                   currentStep === step.id ? "text-primary font-semibold" : "text-muted-foreground"
                )}>{step.name}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                    "flex-1 h-0.5 sm:h-1 mt-2.5 sm:mt-3.5 mx-0.5 sm:mx-1 transition-all duration-300", 
                    currentStep > step.id ? "bg-primary" : "bg-border" 
                    )} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 px-1">
          <div>
            <Label htmlFor="kbpNumber">KBP Number</Label>
            <Input id="kbpNumber" {...register("kbpNumber")} />
          </div>
          <div>
            <Label htmlFor="kdlNumber">KDL / KADGIS FILE NUMBER</Label>
            <Input id="kdlNumber" {...register("kdlNumber")} />
          </div>
        </div>

        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">BOX 1: APPLICANT (Organisation)</CardTitle>
              <CardDescription className="text-xs sm:text-sm">All applicants must complete Box 1 in full. All applicants must submit the original documents used to identify the organisations; they will be copied and retained. The original identification document used to prove identity of the MD/CEO/Chairman must be submitted; it will be copied and retained.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orgName">Name of Organisation*</Label>
                  <Input id="orgName" {...register("orgName")} />
                  {errors.orgName && <p className="text-destructive text-xs mt-1">{errors.orgName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="cacNumber">Corporate Affairs Commission Number (CAC)</Label>
                  <Input id="cacNumber" {...register("cacNumber")} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dateOfRegistration">Date of Registration</Label>
                  <Controller
                    name="dateOfRegistration"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={"outline"} className="w-full justify-start text-left font-normal mt-1 text-sm sm:text-base">
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
                  {errors.dateOfRegistration && <p className="text-destructive text-xs mt-1">{errors.dateOfRegistration.message}</p>}
                </div>
                <div>
                  <Label htmlFor="orgTaxIdNumber">Tax Identification Number (Optional)</Label>
                  <Input id="orgTaxIdNumber" {...register("orgTaxIdNumber")} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orgPhone">Phone*</Label>
                  <Input id="orgPhone" type="tel" {...register("orgPhone")} />
                  {errors.orgPhone && <p className="text-destructive text-xs mt-1">{errors.orgPhone.message}</p>}
                </div>
                <div>
                  <Label htmlFor="orgEmail">Email</Label>
                  <Input id="orgEmail" type="email" {...register("orgEmail")} />
                  {errors.orgEmail && <p className="text-destructive text-xs mt-1">{errors.orgEmail.message}</p>}
                </div>
              </div>
              
              <Separator className="my-6" />
              <p className="font-semibold text-md">CEO/MD/Chairman Information</p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="ceoTitle">Title</Label>
                  <Input id="ceoTitle" {...register("ceoTitle")} />
                </div>
                <div className="md:col-span-1">
                  <Label htmlFor="ceoFirstName">First Name*</Label>
                  <Input id="ceoFirstName" {...register("ceoFirstName")} />
                  {errors.ceoFirstName && <p className="text-destructive text-xs mt-1">{errors.ceoFirstName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="ceoMiddleName">Middle Name</Label>
                  <Input id="ceoMiddleName" {...register("ceoMiddleName")} />
                </div>
                <div>
                  <Label htmlFor="ceoSurname">Surname*</Label>
                  <Input id="ceoSurname" {...register("ceoSurname")} />
                  {errors.ceoSurname && <p className="text-destructive text-xs mt-1">{errors.ceoSurname.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="ceoDesignation">Designation</Label>
                  <Input id="ceoDesignation" {...register("ceoDesignation")} />
                </div>
                <div>
                  <Label htmlFor="ceoPhone">Phone</Label>
                  <Input id="ceoPhone" type="tel" {...register("ceoPhone")} />
                   {errors.ceoPhone && <p className="text-destructive text-xs mt-1">{errors.ceoPhone.message}</p>}
                </div>
                 <div>
                  <Label htmlFor="ceoEmail">Email</Label>
                  <Input id="ceoEmail" type="email" {...register("ceoEmail")} />
                  {errors.ceoEmail && <p className="text-destructive text-xs mt-1">{errors.ceoEmail.message}</p>}
                </div>
              </div>

              <div>
                <Label className="text-sm sm:text-base">CEO/MD/Chairman Identification</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 sm:gap-x-4 gap-y-2 mt-2">
                  {identificationOptions.map(opt => (
                    <div key={opt.id} className="flex items-center space-x-2">
                      <Controller
                          name={`ceoIdentificationType.${opt.id}`}
                          control={control}
                          render={({ field }) => (
                              <Checkbox
                                  id={`ceo_${opt.id}`}
                                  checked={!!field.value} 
                                  onCheckedChange={field.onChange}
                              />
                          )}
                      />
                      <Label htmlFor={`ceo_${opt.id}`} className="font-normal text-xs sm:text-sm">{opt.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="ceoIdNumber">ID Number</Label>
                <Input id="ceoIdNumber" {...register("ceoIdNumber")} />
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">BOX 2: ORGANISATION ADDRESS</CardTitle>
              <CardDescription className="text-xs sm:text-sm">This should be the organisation's normal address.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orgHouseNo">House No</Label>
                  <Input id="orgHouseNo" {...register("orgHouseNo")} />
                </div>
                <div>
                  <Label htmlFor="orgStreetName">Street Name</Label>
                  <Input id="orgStreetName" {...register("orgStreetName")} placeholder="Ahmadu Bello Road" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="orgDistrict">District</Label>
                  <Input id="orgDistrict" {...register("orgDistrict")} placeholder="Sabon Gari" />
                </div>
                <div>
                  <Label htmlFor="orgCityTown">City/Town</Label>
                  <Input id="orgCityTown" {...register("orgCityTown")} placeholder="Zaria" />
                </div>
                <div>
                  <Label htmlFor="orgState">State</Label>
                  <Input id="orgState" {...register("orgState")} defaultValue="Kaduna" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="orgCountry">Country</Label>
                  <Input id="orgCountry" {...register("orgCountry")} defaultValue="Nigeria" />
                </div>
                <div>
                  <Label htmlFor="orgPOBox">P.O./P.M.B.</Label>
                  <Input id="orgPOBox" {...register("orgPOBox")} placeholder="040 Zaria" />
                </div>
                <div>
                  <Label htmlFor="orgCO">C/O</Label>
                  <Input id="orgCO" {...register("orgCO")} />
                </div>
              </div>
              <div>
                <Label htmlFor="orgAdditionalAddressInfo">Additional Address Information</Label>
                <Textarea id="orgAdditionalAddressInfo" {...register("orgAdditionalAddressInfo")} placeholder="G.R.A Res. Estate" />
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
           <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">BOX 3: REPRESENTATIVE (Optional)</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Applicants who wish to appoint a representative must complete Box 3 in full. The original identification document used to prove the identity of the representative must be submitted; it will be copied and returned. Applicants Note: the representative is authorised to submit and receive information and documents pertaining to this application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  {errors.repPhone1 && <p className="text-destructive text-xs mt-1">{errors.repPhone1.message}</p>}
                </div>
                <div>
                  <Label htmlFor="repPhone2">Phone 2</Label>
                  <Input id="repPhone2" type="tel" {...register("repPhone2")} />
                  {errors.repPhone2 && <p className="text-destructive text-xs mt-1">{errors.repPhone2.message}</p>}
                </div>
                <div>
                  <Label htmlFor="repEmail">Email</Label>
                  <Input id="repEmail" type="email" {...register("repEmail")} />
                  {errors.repEmail && <p className="text-destructive text-xs mt-1">{errors.repEmail.message}</p>}
                </div>
              </div>
              <div>
                <Label className="text-sm sm:text-base">Representative's Identification</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 sm:gap-x-4 gap-y-2 mt-2">
                  {identificationOptions.map(opt => (
                    <div key={opt.id} className="flex items-center space-x-2">
                      <Controller
                          name={`repIdentificationType.${opt.id}`}
                          control={control}
                          render={({ field }) => (
                              <Checkbox
                                  id={`rep_${opt.id}`}
                                  checked={!!field.value}
                                  onCheckedChange={field.onChange}
                              />
                          )}
                      />
                      <Label htmlFor={`rep_${opt.id}`} className="font-normal text-xs sm:text-sm">{opt.label}</Label>
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
        )}

        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">BOX 4: PLOT</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Please fill in the below information of the plot that has been or will be developed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="plotLandUse">Land Use</Label>
                  <Input id="plotLandUse" {...register("plotLandUse")} />
                </div>
                <div>
                  <Label htmlFor="plotPurpose">Purpose</Label>
                  <Input id="plotPurpose" {...register("plotPurpose")} />
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
        )}

        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">BOX 5: REQUIRED DOCUMENTS</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Applicants should submit all the relevant documents, with minimum requirement indicated below. If you have multiple relevant documents, please submit them and tick the documents that you acquire. 
                <strong className="text-primary"> Please note that any drawings should be endorsed by a relevant professional.</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {requiredDocumentsList.map(doc => (
                  <div key={doc.id} className="flex items-start space-x-2">
                     <Controller
                        name={doc.id}
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                id={doc.id}
                                checked={!!field.value}
                                onCheckedChange={field.onChange}
                                className="mt-1"
                            />
                        )}
                    />
                    <Label htmlFor={doc.id} className="font-normal text-xs sm:text-sm">
                        {doc.label}
                        {doc.id === 'docKadgisAcknowledgement' && <span className="block text-muted-foreground text-[10px] sm:text-xs">(in case you applied for digital CofO)</span>}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 6 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">BOX 6: SIGNATURE / DECLARATION</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                All applicants must affix their signature; the application will not be accepted without signature. In the case of a representative, they must also affix their signature.
                By checking the box below, you confirm that the information provided is true and accurate to the best of your knowledge.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start space-x-2 p-4 border rounded-md bg-muted/30">
                    <Controller
                        name="declaration"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                id="declaration"
                                checked={!!field.value}
                                onCheckedChange={field.onChange}
                                className="mt-1"
                            />
                        )}
                    />
                    <Label htmlFor="declaration" className="font-normal text-sm sm:text-base leading-snug">
                        I, the applicant or duly authorized representative, declare that the information provided in this application and any attached documents is true, correct, and complete to the best of my knowledge and belief. I understand that any false statement may result in the rejection of this application or revocation of any permit granted.
                    </Label>
                </div>
                {errors.declaration && <p className="text-destructive text-xs mt-1 px-1">{errors.declaration.message}</p>}
                <p className="text-sm text-muted-foreground px-1">
                    Applicant Signature: <span className="font-medium">[Digital acceptance via checkbox]</span>
                </p>
                <p className="text-sm text-muted-foreground px-1">
                    Representative Signature: <span className="font-medium">[Digital acceptance via checkbox, if representative details filled]</span>
                </p>
            </CardContent>
          </Card>
        )}


        <CardFooter className="flex flex-col items-center space-y-4 pt-6">
            <div className="flex w-full flex-col sm:flex-row sm:justify-between gap-2">
                <Button 
                  type="button" 
                  onClick={handlePreviousStep} 
                  disabled={currentStep === 1} 
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                {currentStep < steps.length ? (
                    <Button 
                      type="button" 
                      onClick={handleNextStep}
                      className="w-full sm:w-auto"
                    >
                        Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto py-3 text-base sm:text-lg"
                    >
                        Submit Application
                    </Button>
                )}
            </div>
          <Separator className="my-2" />
           <p className="text-xs text-muted-foreground text-center">
            KASUPDA Regulations, 2025 &nbsp;&nbsp;|&nbsp;&nbsp; Version 1.4 2028
          </p>
        </CardFooter>
      </form>
    </div>
  );
}

// Simple CheckIcon for stepper
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

    

    