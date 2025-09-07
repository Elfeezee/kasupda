
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users2 } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Development Control Officers | KASUPDA',
  description: 'List of Development Control Department Patrol Teams and their areas of coverage.',
};

const officers = [
  { name: "Jibril Abubakar Sultan", area: "UNG. Rimi, UNG. Sarki, Malali, Badarawa." },
  { name: "Sadiya Yusuf", area: "Central Area" },
  { name: "Godiya Ishaya", area: "Kurmin Mashi, Gwamna road, Badikko, Hayin Banki, NASFAT, Ung. Shanu, Ung.Kanawa, Abakwa." },
  { name: "Hassan Sabo", area: "Kabala, Marafa, shooting Range." },
  { name: "Suleiman Balarabe", area: "Barakallahu, Hayin dogo, Ung.Hazo, Rigachikun." },
  { name: "Ahmed Abdullahi", area: "Trade Fair layout, NDC, KSDPC layout, Malalin Gabas." },
  { name: "Sani Aliyu Abdullahi", area: "Sobawa, Dankande, Maraba Jos, Birnin Yero Jaji." },
  { name: "Auwal Nuhu Birnin Gwari", area: "Keke A, Keke B, Keken Makera, Dokan Mai Jama'a, Sabon Vero." },
  { name: "Sani Idris", area: "Karji, Babban Saura, PW, Janruwa, Kamazo TPO.1272, Rimi." },
  { name: "Mustafa Suleiman", area: "Rigasa South, Miyatti Allah, Hayin Malam Bello, Nariya, Tudun Barde, Shanono." },
  { name: "Hassan Abdullahi", area: "Kabala West, Ung.Muazu, Bakin Ruwa(A.A.Youghurt area)." },
  { name: "Sani Abdulkadir Jamoh", area: "Unguwan Dosa, Kwaru." },
  { name: "Kennedy Poul Galadima", area: "Kakuri Makera, Romi, Romi New extension, Federal Housing" },
];

export default function DevelopmentControlOfficersPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="max-w-5xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <div className="inline-block bg-primary text-primary-foreground p-3 rounded-full mx-auto mb-4">
              <Users2 className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
            Development Control Department Patrol Team
          </CardTitle>
          <CardDescription>
            List of patrol teams and their areas of coverage as of 23rd June 2025.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">S/N</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Area of Coverage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {officers.map((officer, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{officer.name}</TableCell>
                    <TableCell>{officer.area}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
