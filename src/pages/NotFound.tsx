
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-24 w-24 rounded-full bg-ghana-red/10 text-ghana-red flex items-center justify-center text-4xl font-bold mb-6">
          404
        </div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground text-lg mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4">
          <Button
            className="bg-ghana-green hover:bg-ghana-green/90"
            onClick={() => navigate("/")}
          >
            Return to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
