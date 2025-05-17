
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Phone, Mail } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";

// Mock data for lawyers
const lawyersMockData = [
  {
    id: 1,
    name: "Kofi Annan",
    specialty: "Land Dispute",
    location: "Accra, Greater Accra",
    languages: ["English", "Akan (Twi)"],
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    contact: { email: "kofi.annan@example.com", phone: "+233 50 123 4567" }
  },
  {
    id: 2,
    name: "Ama Serwaa",
    specialty: "Family Law",
    location: "Kumasi, Ashanti",
    languages: ["English", "Akan (Twi)", "Hausa"],
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    contact: { email: "ama.serwaa@example.com", phone: "+233 24 987 6543" }
  },
  {
    id: 3,
    name: "Kwame Nkrumah",
    specialty: "Constitutional Law",
    location: "Cape Coast, Central",
    languages: ["English", "Fante", "Ga"],
    rating: 5.0,
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    contact: { email: "kwame.nkrumah@example.com", phone: "+233 27 456 7890" }
  },
  {
    id: 4,
    name: "Abena Mensah",
    specialty: "Property Rights",
    location: "Takoradi, Western",
    languages: ["English", "Akan (Twi)", "Ewe"],
    rating: 4.6,
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    contact: { email: "abena.mensah@example.com", phone: "+233 55 765 4321" }
  },
  {
    id: 5,
    name: "Daniel Ofori",
    specialty: "Civil Rights",
    location: "Tamale, Northern",
    languages: ["English", "Dagbani", "Hausa"],
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    contact: { email: "daniel.ofori@example.com", phone: "+233 20 123 9876" }
  }
];

// Available specialties
const specialties = [
  "All Specialties",
  "Land Dispute",
  "Family Law",
  "Constitutional Law",
  "Property Rights",
  "Civil Rights",
  "Human Rights"
];

// Available regions
const regions = [
  "All Regions",
  "Greater Accra",
  "Ashanti",
  "Central",
  "Western",
  "Northern",
  "Eastern",
  "Volta"
];

// Available languages
const languages = [
  "All Languages",
  "English",
  "Akan (Twi)",
  "Ewe",
  "Ga",
  "Hausa",
  "Dagbani",
  "Fante"
];

const Lawyers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");

  // Filter lawyers based on search and filters
  const filteredLawyers = lawyersMockData.filter(lawyer => {
    return (
      (lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSpecialty === "All Specialties" || lawyer.specialty === selectedSpecialty) &&
      (selectedRegion === "All Regions" || lawyer.location.includes(selectedRegion)) &&
      (selectedLanguage === "All Languages" || lawyer.languages.includes(selectedLanguage))
    );
  });

  return (
    <MainLayout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6">Find a Lawyer</h1>
        
        {/* Search and Filters */}
        <div className="bg-muted p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                type="text"
                placeholder="Search by name or specialty"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLawyers.length > 0 ? (
            filteredLawyers.map((lawyer) => (
              <Card key={lawyer.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={lawyer.image}
                        alt={lawyer.name}
                        className="w-full h-full object-cover aspect-square"
                      />
                    </div>
                    <div className="p-5 md:w-2/3">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold">{lawyer.name}</h2>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-ghana-gold text-ghana-gold" />
                          <span className="ml-1">{lawyer.rating}</span>
                        </div>
                      </div>
                      <div className="text-ghana-green font-medium mt-1">{lawyer.specialty}</div>
                      
                      <div className="flex items-center mt-3">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{lawyer.location}</span>
                      </div>
                      
                      <div className="mt-2 mb-4">
                        <div className="text-sm font-medium">Languages:</div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {lawyer.languages.map((lang) => (
                            <span key={lang} className="px-2 py-1 bg-ghana-gold/10 text-xs rounded-full">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{lawyer.contact.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{lawyer.contact.email}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button className="w-full bg-ghana-green hover:bg-ghana-green/90">
                          Request Consultation
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center p-6 bg-muted rounded-lg">
              <p>No lawyers found matching your criteria. Please try different filters.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Lawyers;
