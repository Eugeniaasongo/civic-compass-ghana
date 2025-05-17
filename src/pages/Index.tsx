
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Gavel, User, BookOpen, PenSquare } from 'lucide-react';
import MainLayout from "@/components/layouts/MainLayout";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Find Lawyers",
      description: "Connect with verified legal practitioners for advice or representation.",
      icon: User,
      path: "/lawyers",
      color: "bg-ghana-gold"
    },
    {
      title: "Constitution of Ghana",
      description: "Access and search the full Constitution with multilingual support.",
      icon: BookOpen,
      path: "/constitution",
      color: "bg-ghana-green"
    },
    {
      title: "Report an Issue",
      description: "File a civil issue report and get connected with legal help.",
      icon: PenSquare,
      path: "/report-issue",
      color: "bg-ghana-red"
    }
  ];

  return (
    <MainLayout>
      <div className="py-6">
        {/* Hero Section */}
        <div className="w-full py-12 px-4 md:px-6 text-center bg-gradient-to-r from-ghana-green/10 to-ghana-gold/10 rounded-lg mb-8">
          <div className="mx-auto max-w-4xl">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-ghana-green flex items-center justify-center">
                <Gavel className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Welcome to CivicJustice</h1>
            <p className="text-xl mb-6">
              Empowering citizens with accessible legal support and resources
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/report-issue')}
                className="bg-ghana-red hover:bg-ghana-red/90"
              >
                Report an Issue
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/lawyers')}
              >
                Find a Lawyer
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature) => (
            <Card key={feature.title} className="border overflow-hidden">
              <CardContent className="p-6">
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
                <p className="mb-4 text-muted-foreground">{feature.description}</p>
                <Button variant="ghost" onClick={() => navigate(feature.path)}>
                  Explore &rarr;
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About Section */}
        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">About CivicJustice</h2>
          <p className="mb-4">
            CivicJustice is a platform designed to empower citizens in Ghana by making civil legal
            support accessible, efficient, and multilingual. Our mission is to bridge the gap between
            citizens and legal practitioners, providing tools for civil issue reporting, legal
            consultations, and access to constitutional resources.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-ghana-green/20 text-ghana-green rounded-full text-sm">
              Civil Rights
            </span>
            <span className="px-3 py-1 bg-ghana-gold/20 text-ghana-black rounded-full text-sm">
              Legal Support
            </span>
            <span className="px-3 py-1 bg-ghana-red/20 text-ghana-red rounded-full text-sm">
              Constitution Access
            </span>
            <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
              Multilingual
            </span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
