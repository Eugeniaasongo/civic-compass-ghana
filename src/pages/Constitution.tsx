
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, BookOpen, Volume2, Bookmark } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";

// Mock data for constitution chapters
const constitutionChapters = [
  {
    id: 1,
    title: "CHAPTER ONE - THE CONSTITUTION",
    articles: [
      {
        number: 1,
        title: "The Constitution",
        content: "The Sovereignty of Ghana resides in the people of Ghana in whose name and for whose welfare the powers of government are to be exercised in the manner and within the limits laid down in this Constitution."
      },
      {
        number: 2,
        title: "Supremacy of the Constitution",
        content: "This Constitution shall be the supreme law of Ghana and any other law found to be inconsistent with any provision of this Constitution shall, to the extent of the inconsistency, be void."
      },
      {
        number: 3,
        title: "Defence of the Constitution",
        content: "(1) Parliament shall have no power to enact a law establishing a one-party state.\n(2) Any activity of a person or group of persons which suppresses or seeks to suppress the lawful political activity of any other person or any class of persons, or persons generally is unlawful.\n(3) Any person who participates in or assists in the operation of a political party is guilty of a criminal offence and liable on conviction on indictment to a fine or to imprisonment not exceeding fifteen years or both."
      }
    ]
  },
  {
    id: 2,
    title: "CHAPTER TWO - FUNDAMENTAL HUMAN RIGHTS AND FREEDOMS",
    articles: [
      {
        number: 4,
        title: "Protection of Fundamental Human Rights and Freedoms",
        content: "All the laws of Ghana shall conform to this Constitution and any law inconsistent with any provision of this Constitution shall, to the extent of the inconsistency, be void."
      },
      {
        number: 5,
        title: "Right to Life",
        content: "No person shall be deprived of his life intentionally except in the exercise of the execution of a sentence of a court in respect of a criminal offence under the laws of Ghana of which he has been convicted."
      }
    ]
  },
  {
    id: 3,
    title: "CHAPTER THREE - CITIZENSHIP",
    articles: [
      {
        number: 6,
        title: "Citizenship of Ghana",
        content: "Every person who, on the coming into force of this Constitution, is a citizen of Ghana by law shall continue to be a citizen of Ghana."
      }
    ]
  }
];

const Constitution = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedChapter, setSelectedChapter] = useState(1);

  // Language options
  const languages = [
    { code: "en", name: "English" },
    { code: "ak", name: "Akan (Twi)" },
    { code: "ee", name: "Ewe" },
    { code: "gaa", name: "Ga" },
    { code: "ha", name: "Hausa" }
  ];

  // Filter articles based on search
  const filteredArticles = constitutionChapters
    .flatMap(chapter => chapter.articles)
    .filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const currentChapter = constitutionChapters.find(chapter => chapter.id === selectedChapter);
  
  return (
    <MainLayout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6">Constitution of Ghana</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar for navigation */}
          <div className="md:col-span-1">
            <div className="bg-muted p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language.code} value={language.code}>
                        {language.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-medium mb-3">Chapters</h3>
              <div className="space-y-2">
                {constitutionChapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      selectedChapter === chapter.id 
                        ? "bg-ghana-green text-white" 
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedChapter(chapter.id)}
                  >
                    {chapter.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-2">
            <Tabs defaultValue="browse" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="browse" className="flex gap-2">
                  <BookOpen className="h-4 w-4" />
                  Browse
                </TabsTrigger>
                <TabsTrigger value="search" className="flex gap-2">
                  <Search className="h-4 w-4" />
                  Search Results
                </TabsTrigger>
                <TabsTrigger value="bookmarks" className="flex gap-2">
                  <Bookmark className="h-4 w-4" />
                  Bookmarks
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="browse">
                {currentChapter && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">{currentChapter.title}</h2>
                      <div className="space-y-8">
                        {currentChapter.articles.map((article) => (
                          <div key={article.number}>
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-semibold">
                                Article {article.number}: {article.title}
                              </h3>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                  <Volume2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Bookmark className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="whitespace-pre-line">
                              {article.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="search">
                {searchTerm ? (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">Search Results for "{searchTerm}"</h2>
                      {filteredArticles.length > 0 ? (
                        <div className="space-y-8">
                          {filteredArticles.map((article) => (
                            <div key={article.number}>
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold">
                                  Article {article.number}: {article.title}
                                </h3>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Volume2 className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Bookmark className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="whitespace-pre-line">
                                {article.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-6">
                          <p>No articles found matching your search criteria.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <p>Enter a search term to find relevant articles in the Constitution.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="bookmarks">
                <div className="text-center p-6 bg-muted rounded-lg">
                  <p>Your bookmarked articles will appear here.</p>
                  <Button variant="outline" className="mt-4">
                    Sign in to save bookmarks
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Constitution;
