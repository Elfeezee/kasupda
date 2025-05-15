"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ApplyForPermitPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Apply for Permit</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="applicantName">Applicant Name</Label>
              <Input id="applicantName" placeholder="Enter your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email</Label>
              <Input id="contactEmail" type="email" placeholder="Enter your email address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone Number</Label>
              <Input id="contactPhone" type="tel" placeholder="Enter your phone number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyAddress">Property Address</Label>
              <Input id="propertyAddress" placeholder="Enter the property address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="permitType">Type of Permit Requested</Label>
              <Select>
                <SelectTrigger id="permitType">
                  <SelectValue placeholder="Select permit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temporary">Temporary building permit application</SelectItem>
                  <SelectItem value="building">Building permit application</SelectItem>
                  <SelectItem value="outdoor">Outdoor advertisement licensing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea id="projectDescription" placeholder="Provide a brief description of the project" rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions / Specifications</Label>
              <Textarea id="dimensions" placeholder="Include relevant dimensions, area, or specifications" rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="images">Upload Images</Label>
              <Input id="images" type="file" accept="image/*" multiple />
            </div>
            {/* Add other necessary fields as needed */}
            {/*
            <div className="space-y-2">
              <Label htmlFor="propertyOwner">Property Owner Name</Label>
              <Input id="propertyOwner" placeholder="Enter property owner's name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parcelNumber">Parcel Number</Label>
              <Input id="parcelNumber" placeholder="Enter parcel number (if applicable)" />
            </div>
            */}
            <Button type="submit" className="w-full whitespace-normal">Submit Application</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}