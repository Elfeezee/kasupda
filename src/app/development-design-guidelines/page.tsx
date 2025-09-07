
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks, AlertTriangle, Info, CheckCircle } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architectural Design Guidelines | KASUPDA',
  description: 'Architectural query guidelines for development design vetting at KASUPDA.',
};

export default function DevelopmentDesignGuidelinesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
            Architectural Guidelines
          </CardTitle>
          <CardDescription>
            Official guidelines for development design vetting.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 text-left">
          
          <section>
            <h2 className="flex items-center text-xl font-semibold text-destructive mb-3">
              <AlertTriangle className="mr-3 h-6 w-6" /> Major Queries
            </h2>
            <p className="text-muted-foreground">
              A query is considered major if it falls within any of the below planning standards where an applicant fails to adhere to any of the requirements.
            </p>
             {/* The image implies major queries are any that are not minor, so no list is provided here. */}
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
            <div className="bg-muted/50 border-l-4 border-primary p-4 rounded-r-lg">
                <h3 className="flex items-center text-lg font-semibold text-primary mb-2">
                    <Info className="mr-3 h-5 w-5" /> Note
                </h3>
                <p className="text-sm text-foreground">
                    Text in red represent our adopted setbacks in some cases whereas the text in black is the KASUPDA Manual which has generally been adopted and being used as a guide in vetting.
                </p>
            </div>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
