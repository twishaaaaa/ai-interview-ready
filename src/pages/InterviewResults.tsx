
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircleIcon, ArrowUpCircleIcon, ChevronRightIcon, BarChart2Icon, PieChartIcon, BrainCircuitIcon, RepeatIcon } from "lucide-react";

const InterviewResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { 
    jobRole = "Software Engineer", 
    experience = "mid", 
    questions = [], 
    answers = [], 
    feedbacks = [] 
  } = location.state || {};
  
  // Calculate aggregate scores
  const overallScore = Math.round(
    feedbacks.reduce((sum: number, fb: any) => sum + fb.score, 0) / feedbacks.length
  );
  
  // Identify top strengths and improvements
  const allStrengths = feedbacks.flatMap((fb: any) => fb.strengths);
  const allImprovements = feedbacks.flatMap((fb: any) => fb.improvements);
  
  const strengthCounts = allStrengths.reduce((acc: Record<string, number>, strength: string) => {
    acc[strength] = (acc[strength] || 0) + 1;
    return acc;
  }, {});
  
  const improvementCounts = allImprovements.reduce((acc: Record<string, number>, improvement: string) => {
    acc[improvement] = (acc[improvement] || 0) + 1;
    return acc;
  }, {});
  
  const topStrengths = Object.entries(strengthCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([strength]) => strength);
  
  const topImprovements = Object.entries(improvementCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([improvement]) => improvement);
  
  // Generate overall feedback based on score
  const getOverallFeedback = (score: number) => {
    if (score >= 85) {
      return "Excellent job! Your interview responses demonstrate strong technical knowledge and effective communication. You're likely to make a positive impression on hiring managers.";
    } else if (score >= 70) {
      return "Good performance! Your responses show solid understanding of the role. With some targeted improvements, you can further increase your chances of success.";
    } else {
      return "You have a good foundation but need additional preparation. Focus on the improvement areas identified and consider practicing more interview scenarios.";
    }
  };
  
  const handleStartNewInterview = () => {
    navigate("/interview");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Interview Results
          </h1>
          <p className="text-gray-600">
            {jobRole} • {experience === "entry" ? "Entry Level" : experience === "mid" ? "Mid Level" : "Senior Level"}
          </p>
        </div>
        
        {/* Overall Score Card */}
        <Card className="mb-8 shadow-lg border-t-4 border-t-blue-600">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Overall Performance</span>
              <span className="text-3xl font-bold text-blue-600">{overallScore}/100</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Progress value={overallScore} className="h-2.5" />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Needs Improvement</span>
                <span>Outstanding</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">{getOverallFeedback(overallScore)}</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-medium text-green-800 mb-2 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
                  Your Strengths
                </h3>
                <ul className="space-y-1">
                  {topStrengths.map((strength, index) => (
                    <li key={index} className="text-gray-700 text-sm flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                  <ArrowUpCircleIcon className="h-5 w-5 mr-2 text-amber-600" />
                  Areas to Improve
                </h3>
                <ul className="space-y-1">
                  {topImprovements.map((improvement, index) => (
                    <li key={index} className="text-gray-700 text-sm flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Question-by-Question Analysis */}
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <BarChart2Icon className="h-5 w-5 mr-2 text-blue-600" />
          Question-by-Question Analysis
        </h2>
        
        <Accordion type="single" collapsible className="mb-8">
          {questions.map((question: string, index: number) => (
            <AccordionItem key={index} value={`question-${index}`} className="bg-white rounded-lg border mb-3 shadow-sm">
              <AccordionTrigger className="px-4 hover:bg-gray-50">
                <div className="flex items-center text-left">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{question.substring(0, 60)}...</div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      Score: <span className="text-blue-600 font-medium ml-1">{feedbacks[index]?.score || 0}/100</span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="pt-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Question:</h4>
                  <p className="text-gray-800 mb-4">{question}</p>
                  
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Your Answer:</h4>
                  <p className="text-gray-600 mb-4 p-3 bg-gray-50 rounded border border-gray-100">
                    {answers[index] || "No answer provided"}
                  </p>
                  
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Feedback:</h4>
                  <p className="text-gray-600 mb-3">{feedbacks[index]?.feedback}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div>
                      <h5 className="text-xs font-medium text-green-700 mb-1">Strengths:</h5>
                      <ul className="text-xs text-gray-600">
                        {feedbacks[index]?.strengths.map((s: string, i: number) => (
                          <li key={i} className="flex items-start mb-1">
                            <span className="text-green-500 mr-1">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium text-amber-700 mb-1">Areas to Improve:</h5>
                      <ul className="text-xs text-gray-600">
                        {feedbacks[index]?.improvements.map((s: string, i: number) => (
                          <li key={i} className="flex items-start mb-1">
                            <span className="text-amber-500 mr-1">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {/* Next Steps */}
        <Card className="mb-8 bg-blue-50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-blue-800">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <BrainCircuitIcon className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-800">Focus on improvement areas</h3>
                  <p className="text-sm text-gray-600">Work on the specific areas highlighted in your feedback.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <RepeatIcon className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-800">Practice regularly</h3>
                  <p className="text-sm text-gray-600">Try different job roles or experience levels to broaden your skills.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <PieChartIcon className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-800">Track your progress</h3>
                  <p className="text-sm text-gray-600">Complete multiple interviews to see your improvement over time.</p>
                </div>
              </li>
            </ul>
            
            <div className="mt-6">
              <Button 
                onClick={handleStartNewInterview}
                className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
              >
                Practice Another Interview
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterviewResults;
