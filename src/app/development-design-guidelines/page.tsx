
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks, AlertTriangle, Info, CheckCircle, Home, FilePen } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architectural Design Guidelines | KASUPDA',
  description: 'Architectural query guidelines and development standards for residential projects at KASUPDA.',
};

export default function DevelopmentDesignGuidelinesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="max-w-6xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
            Architectural Guidelines
          </CardTitle>
          <CardDescription>
            Official guidelines for development design vetting.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-12 text-left">
          
          <section>
            <h2 className="flex items-center text-xl font-semibold text-destructive mb-3">
              <AlertTriangle className="mr-3 h-6 w-6" /> Major Queries
            </h2>
            <p className="text-muted-foreground">
              A query is considered major if it falls within any of the below planning standards where an applicant fails to adhere to any of the requirements.
            </p>
          </section>
          
          <section>
            <h2 className="flex items-center text-xl font-semibold text-primary mb-3">
              <ListChecks className="mr-3 h-6 w-6" /> Minor Queries
            </h2>
            <p className="text-muted-foreground mb-4">
              All architectural queries are considered major queries except for a few amendments that may not affect billing. These include:
            </p>
            <ul className="space-y-3 list-inside">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 shrink-0" />
                <span>Reconciling site plan to conform with survey sketch.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 shrink-0" />
                <span>Submitting fence plan.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 shrink-0" />
                <span>Some minor amendments on plans, especially dimensions where it is not legible. The applicant is expected to make them legible for proper vetting.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="flex items-center text-2xl font-bold text-primary mb-4 border-b pb-2">
              <Home className="mr-3 h-7 w-7" /> Residential Development Guidelines
            </h2>
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plot Size</TableHead>
                    <TableHead>Density</TableHead>
                    <TableHead>Type of Development</TableHead>
                    <TableHead>Building Coverage % (Max.)</TableHead>
                    <TableHead>Setbacks (m)</TableHead>
                    <TableHead>Inter Building Setbacks</TableHead>
                    <TableHead>No. of Floors</TableHead>
                    <TableHead>No. of Structures</TableHead>
                    <TableHead>Ancilliary Facilities Allowed</TableHead>
                    <TableHead>No. of Families</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>&le; 450m&sup2;</TableCell>
                    <TableCell>High <br/><span className="text-xs text-muted-foreground">(Kaduna Metro)</span></TableCell>
                    <TableCell>Bungalow, Duplexes, Block of Flats or studio apartments</TableCell>
                    <TableCell>60</TableCell>
                    <TableCell>Building line subject to min. of 4m <br/> F: 4 (<span className="text-red-600">3</span>) <br/> S: 2; 2, (<span className="text-red-600">1.5</span>) <br/> B: 2 (<span className="text-red-600">1.5</span>)</TableCell>
                    <TableCell rowSpan={7} className="text-center align-middle writing-vertical-rl -rotate-180 p-2 border-l border-r">
                      AVERAGE HEIGHT OF THE BUILDINGS (3 METRES)
                    </TableCell>
                    <TableCell>1 - 3</TableCell>
                    <TableCell>2 GH/BQ Main</TableCell>
                    <TableCell>Parking: 6 No.; Ramp for the physically challenged; 4 trees (min.)</TableCell>
                    <TableCell>2 - 8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>&ge; 450m&sup2; &lt; 600m&sup2;</TableCell>
                    <TableCell>High density adjoining commercial district employment centre</TableCell>
                    <TableCell>Block of flats</TableCell>
                    <TableCell>60% for every additional 2 floors, reduce coverage by 3%</TableCell>
                    <TableCell>F: 4 (<span className="text-red-600">3</span>) <br/> S: 2; 2, (<span className="text-red-600">1.5</span>) <br/> B: 2 (<span className="text-red-600">1.5</span>)</TableCell>
                    <TableCell>4 - 6</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>Lift and adequate alternative power supply must be provided. Basement parking for min of 4 additional lots for each additional floor</TableCell>
                    <TableCell>8 - 12 max</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>&ge; 600m&sup2; &lt; 900m&sup2;</TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>Block of Flats / Terrace, Studio Apartments</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell>F: 6 (<span className="text-red-600">3</span>) <br/> S: 3; 3 (<span className="text-red-600">1.5</span>) <br/> B: 3 (<span className="text-red-600">1.5</span>)</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>Parking: 12 No.; Ramp for the physically challenged; 6 trees (min.)</TableCell>
                    <TableCell>6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>&ge; 900m&sup2; &lt; 2500m&sup2;</TableCell>
                    <TableCell>Low</TableCell>
                    <TableCell>Bungalows, Duplexes, Maisonette</TableCell>
                    <TableCell>40</TableCell>
                    <TableCell>F: 6 (<span className="text-red-600">3</span>) <br/> S: 3.5; 3.5(<span className="text-red-600">1.5</span>) <br/> B: 3 (<span className="text-red-600">1.5</span>)</TableCell>
                    <TableCell>Max. 2 suspended floor excluding a penthouse</TableCell>
                    <TableCell>2; made up of 1 principal and two (2) ancillary</TableCell>
                    <TableCell>Parking: 6; Soft landscaping 20% (min.); Swimming pool; Games court; Gazebo; Gate/generator house; 10 trees (min.)</TableCell>
                    <TableCell>Max 2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={2}>&ge;2500m&sup2; &lt; 5000m&sup2;</TableCell>
                    <TableCell rowSpan={2}>Special Residential Plot</TableCell>
                    <TableCell>Luxury Flats; Service Flats;</TableCell>
                    <TableCell rowSpan={2}>40</TableCell>
                    <TableCell>F: 6<br/>S: 4; 4<br/>B: 4</TableCell>
                    <TableCell rowSpan={2}>** 4 - 6</TableCell>
                    <TableCell rowSpan={2}>2</TableCell>
                    <TableCell>Soft landscaping of not less than 30%; Swimming pool Games court Gazebo; Gate/generator house; Lift; 10 trees</TableCell>
                    <TableCell rowSpan={2}>N/A</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mixed Development</TableCell>
                    <TableCell>F: 6<br/>* S: 8; 8<br/>* B: 6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>&ge; 5000m&sup2;</TableCell>
                    <TableCell>Comprehensive Development</TableCell>
                    <TableCell>Condominiums; Mixed Development; Terrace Building.</TableCell>
                    <TableCell>40</TableCell>
                    <TableCell>F: 15<br/>S: 8; 8<br/>B: 6</TableCell>
                    <TableCell>4 (min)</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>Parking; Soft landscaping; Outdoor Recreational facilities; Shopping; Day care; Swimming</TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>-</TableCell>
                    <TableCell>Mass Housing</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>1 - 4</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Parking: 2 per unit; Outdoor recreation; day care/crèche; retail shops; soft landscaping 20%; power plant; firefighting facilities; clinic; solid waste mgt; Centralized water supply system; encourage central sewage</TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>-</TableCell>
                    <TableCell>Ancillary residential facilities</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>*** Crèches</TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
             <div className="text-sm text-muted-foreground space-y-1 pt-4">
                <p><span className="font-bold">*</span> Where applicable</p>
                <p><span className="font-bold">**</span> All residential developments having more than three (3) suspended floors require a lift</p>
                <p><span className="font-bold">***</span> 1/5 of the depth of the shortest plot in the block shall be set aside as the building line subject to the minimum of 6m front setback</p>
            </div>
          </section>

          <section>
            <h2 className="flex items-center text-2xl font-bold text-primary mb-4 border-b pb-2">
              <FilePen className="mr-3 h-7 w-7" /> Development Query Details
            </h2>
            <div className="border rounded-lg overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type of Development</TableHead>
                            <TableHead>Minor Quarries</TableHead>
                            <TableHead>Major Quarries</TableHead>
                            <TableHead>Remarks</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <ul className="list-none space-y-1">
                                    <li>Bungalow Duplexes</li>
                                    <li>Block of Flats or studio apartments</li>
                                    <li>Block of flats</li>
                                    <li>Block of Flats / Terrace</li>
                                    <li>Studio Apartments</li>
                                    <li>Bungalows Duplexes Maisonette</li>
                                </ul>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-center text-primary">
                                <CheckCircle className="h-6 w-6 inline-block" />
                            </TableCell>
                            <TableCell>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>Non-compliance with minimum standards for setbacks and functional space sizes.</li>
                                    <li>Inadequate provision of designated parking spaces.</li>
                                    <li>Submission of designs with building scales that exceed plot sizes.</li>
                                    <li>Incomplete design submissions, omitting essential building features indicated on site plans.</li>
                                    <li>Failure to provide complete design details for all building elements shown on the site plan.</li>
                                    <li>Failure to meet the minimum 30% plot coverage requirement.</li>
                                    <li>Omission of remodeling schedules from design submissions.</li>
                                    <li>Incomplete or omitted section lines.</li>
                                    <li>Failure to meet these standard requirements may necessitate revisions or redesigns, potentially leading to delays of billings.</li>
                                </ul>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
          </section>

          <section>
            <div className="bg-muted/50 border-l-4 border-primary p-4 rounded-r-lg">
                <h3 className="flex items-center text-lg font-semibold text-primary mb-2">
                    <Info className="mr-3 h-5 w-5" /> Note
                </h3>
                <p className="text-sm text-foreground">
                    Text in <span className="text-red-600 font-semibold">red</span> represent our adopted setbacks whereas the text in black is the KASUPDA Manual which has generally been adopted and being used as a guide in vetting.
                </p>
                 <p className="text-sm text-muted-foreground mt-2">
                    <span className="font-semibold">KASUPDA MANUAL which is generally adopted without changes except for the text in red.</span>
                </p>
            </div>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
