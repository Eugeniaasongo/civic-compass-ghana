
import { ReactNode } from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Gavel, User, BookOpen, PenSquare, Home, Globe } from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="flex items-center px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-ghana-green flex items-center justify-center">
                <Gavel className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">CivicJustice</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <div className="flex flex-col gap-1 px-2">
              <Button 
                variant="ghost"
                className="justify-start"
                onClick={() => navigate('/')}
              >
                <Home className="mr-2 h-5 w-5" />
                Home
              </Button>
              <Button 
                variant="ghost"
                className="justify-start"
                onClick={() => navigate('/lawyers')}
              >
                <User className="mr-2 h-5 w-5" />
                Find Lawyers
              </Button>
              <Button 
                variant="ghost"
                className="justify-start"
                onClick={() => navigate('/constitution')}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Constitution
              </Button>
              <Button 
                variant="ghost"
                className="justify-start"
                onClick={() => navigate('/report-issue')}
              >
                <PenSquare className="mr-2 h-5 w-5" />
                Report Issue
              </Button>
            </div>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <select 
                className="bg-transparent focus:outline-none text-sm"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="ak">Akan (Twi)</option>
                <option value="ee">Ewe</option>
                <option value="gaa">Ga</option>
                <option value="ha">Hausa</option>
              </select>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
