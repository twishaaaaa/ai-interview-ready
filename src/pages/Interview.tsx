
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BriefcaseIcon, GraduationCapIcon } from "lucide-react";

const Interview = () => {
  const navigate = useNavigate();
  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleStart = () => {
    setIsLoading(true);
    
    // In a real app, we would start an API call here
    // For now, we'll simulate the creation process
    setTimeout(() => {
      navigate("/interview-session", { 
        state: { 
          jobRole, 
          experience 
        } 
      });
      setIsLoading(false);
    }, 1500);
  };
  
  const jobRoles = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Product Manager",
    "UX/UI Designer",
    "QA Engineer"
  ];
  
  const experienceLevels = [
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (3-5 years)" },
    { value: "senior", label: "Senior Level (6+ years)" }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Set Up Your Interview
          </h1>
          <p className="text-gray-600">
            Customize your mock interview by selecting your target job role and experience level.
          </p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Interview Preferences</CardTitle>
            <CardDescription>
              This helps us tailor the questions to your specific career goals.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <BriefcaseIcon className="h-4 w-4 mr-2" />
                  Job Role
                </div>
              </label>
              <Select value={jobRole} onValueChange={setJobRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a job role" />
                </SelectTrigger>
                <SelectContent>
                  {jobRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!jobRole && (
                <p className="text-xs text-gray-500 mt-1">
                  Choose the position you're applying for
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <GraduationCapIcon className="h-4 w-4 mr-2" />
                  Experience Level
                </div>
              </label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!experience && (
                <p className="text-xs text-gray-500 mt-1">
                  This helps calibrate the technical depth of questions
                </p>
              )}
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              onClick={handleStart}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!jobRole || !experience || isLoading}
            >
              {isLoading ? "Setting up interview..." : "Start Interview"}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">What to expect</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
              <span>You'll receive 5 interview questions tailored to your selected role and experience</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
              <span>Answer verbally or by typing to simulate a real interview environment</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
              <span>Get detailed feedback on your performance when the interview is complete</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Interview;
