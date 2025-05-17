
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Upload, SendHorizontal, PaperclipIcon } from "lucide-react";
import { toast } from "sonner";
import MainLayout from "@/components/layouts/MainLayout";

// Issue categories
const issueCategories = [
  "Land Dispute",
  "Property Rights",
  "Family Matter",
  "Employment Issue",
  "Consumer Protection",
  "Abuse or Harassment",
  "Other Civil Matter"
];

// Form schema
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Valid phone number required" }),
  category: z.string({ required_error: "Please select an issue category" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  location: z.string().optional(),
  anonymous: z.boolean().default(false),
  contactMe: z.boolean().default(true),
});

type ReportFormValues = z.infer<typeof formSchema>;

const ReportIssue = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAttaching, setIsAttaching] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      category: "",
      description: "",
      location: "",
      anonymous: false,
      contactMe: true,
    },
  });

  const onSubmit = (data: ReportFormValues) => {
    console.log(data);
    toast.success("Report submitted successfully!", {
      description: "A legal professional will review your case soon.",
    });
    form.reset();
    setAttachments([]);
  };

  const handleAudioRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Mock recording start
      toast.info("Audio recording started", {
        description: "Speak clearly to describe your issue.",
      });
    } else {
      // Mock recording end
      toast.success("Audio recording completed", {
        description: "Your audio description has been added.",
      });
      setAttachments([...attachments, "audio_recording.mp3"]);
    }
  };

  const handleFileUpload = () => {
    // Mock file upload
    setIsAttaching(true);
    setTimeout(() => {
      setAttachments([...attachments, "document.pdf"]);
      setIsAttaching(false);
      toast.success("File uploaded successfully");
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6">Report a Civil Issue</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Issue Report Form</CardTitle>
                <CardDescription>
                  Submit your civil issue for review by legal professionals. All reports are treated confidentially.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Issue Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an issue category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {issueCategories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Description</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Textarea 
                                placeholder="Describe your issue in detail" 
                                className="min-h-32"
                                {...field} 
                              />
                              <div className="absolute bottom-2 right-2 flex space-x-2">
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="icon"
                                  onClick={handleAudioRecord}
                                  className={isRecording ? "bg-red-100 text-red-500" : ""}
                                >
                                  <Mic className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>
                            You can type or record your issue description.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Where did this issue occur?" {...field} />
                          </FormControl>
                          <FormDescription>
                            Providing location helps us connect you with the right legal support.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Attachments section */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium">Attachments</p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleFileUpload}
                          disabled={isAttaching}
                        >
                          {isAttaching ? "Uploading..." : "Add Files"}
                          <PaperclipIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      
                      {attachments.length > 0 ? (
                        <div className="bg-muted p-2 rounded-md">
                          <ul className="space-y-1">
                            {attachments.map((file, index) => (
                              <li key={index} className="text-sm flex items-center">
                                <PaperclipIcon className="h-3 w-3 mr-2" />
                                {file}
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 ml-auto text-red-500 hover:text-red-700"
                                  onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                                >
                                  Remove
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No attachments added yet.</p>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <FormField
                        control={form.control}
                        name="anonymous"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Submit anonymously</FormLabel>
                              <FormDescription>
                                Your personal details will not be shared with third parties.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactMe"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>I want to be contacted by a lawyer</FormLabel>
                              <FormDescription>
                                A qualified lawyer will reach out to you about your issue.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-ghana-green hover:bg-ghana-green/90">
                      <SendHorizontal className="mr-2 h-4 w-4" />
                      Submit Report
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Info sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-ghana-gold/20 text-ghana-gold flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Submit Your Issue</h3>
                    <p className="text-sm text-muted-foreground">Fill out the form with details about your civil legal issue.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-ghana-gold/20 text-ghana-gold flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Review Process</h3>
                    <p className="text-sm text-muted-foreground">A legal professional will review your case within 48 hours.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-ghana-gold/20 text-ghana-gold flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Get Connected</h3>
                    <p className="text-sm text-muted-foreground">You'll be matched with a qualified lawyer for consultation.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-ghana-gold/20 text-ghana-gold flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium">Resolution</h3>
                    <p className="text-sm text-muted-foreground">Work with your lawyer to resolve your legal issue.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="bg-muted p-4 rounded-md w-full">
                  <h3 className="font-medium mb-2">Need Urgent Assistance?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    For urgent legal matters requiring immediate attention, please call our legal helpline.
                  </p>
                  <div className="bg-ghana-green/10 text-ghana-green p-2 rounded-md text-center font-bold">
                    +233 30 000 0000
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportIssue;
