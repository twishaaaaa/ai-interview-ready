
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { MicIcon, StopCircleIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

// Predefined questions based on roles
const questionSets = {
  "Software Engineer": [
    "Tell me about a challenging project you've worked on recently and how you overcame obstacles.",
    "How do you approach debugging a complex issue in your code?",
    "Explain the concept of object-oriented programming and its core principles.",
    "What's your experience with version control systems and CI/CD pipelines?",
    "How do you stay updated with new technologies and programming languages?"
  ],
  "Frontend Developer": [
    "Explain the difference between React's state and props.",
    "How do you optimize the performance of a web application?",
    "What are the key considerations for creating accessible web applications?",
    "Tell me about a responsive design challenge you faced and how you solved it.",
    "How do you handle state management in large-scale applications?"
  ],
  "Backend Developer": [
    "Explain RESTful API design principles.",
    "How do you approach database optimization for a high-traffic application?",
    "What strategies do you use for error handling in a backend service?",
    "Tell me about your experience with microservices architecture.",
    "How do you ensure the security of API endpoints you develop?"
  ],
  "Data Scientist": [
    "Explain the difference between supervised and unsupervised learning.",
    "How do you handle missing data in a dataset?",
    "Tell me about a data analysis project where you extracted valuable insights.",
    "What techniques do you use for feature selection?",
    "How do you evaluate the performance of a machine learning model?"
  ],
  "default": [
    "Tell me about your background and experience in this field.",
    "What are your technical strengths and areas you're looking to develop?",
    "Describe a challenging problem you solved in a previous role.",
    "How do you approach learning new technologies or methodologies?",
    "Where do you see yourself professionally in the next few years?"
  ]
};

// Mock feedback generation to simulate AI feedback
const generateFeedback = (answer: string) => {
  if (!answer || answer.length < 20) {
    return {
      score: 60,
      feedback: "Your answer was quite brief. Consider providing more details and concrete examples to strengthen your response.",
      strengths: ["Concise communication"],
      improvements: ["Add specific examples", "Elaborate on your approach", "Connect to job requirements"]
    };
  } else if (answer.length < 100) {
    return {
      score: 75,
      feedback: "You provided a good answer with some details. Including more specific examples and technical context would make it even stronger.",
      strengths: ["Clear explanation", "Logical structure"],
      improvements: ["Add more technical details", "Provide measurable outcomes"]
    };
  } else {
    return {
      score: 90,
      feedback: "Excellent response with detailed examples and technical depth. Your answer demonstrates both knowledge and practical experience.",
      strengths: ["Comprehensive explanation", "Relevant examples", "Technical proficiency"],
      improvements: ["Consider mentioning alternative approaches"]
    };
  }
};

const InterviewSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { jobRole = "Software Engineer", experience = "mid" } = location.state || {};
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);
  
  const questions = questionSets[jobRole as keyof typeof questionSets] || questionSets.default;
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if SpeechRecognition is supported
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setSpeechRecognitionSupported(true);
      
      // Set up speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        
        setAnswers(prev => {
          const newAnswers = [...prev];
          newAnswers[currentQuestionIndex] = transcript;
          return newAnswers;
        });
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
        
        toast({
          title: "Speech Recognition Error",
          description: "There was an issue with the microphone. You can type your answer instead.",
          variant: "destructive"
        });
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [currentQuestionIndex, toast]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[currentQuestionIndex] = ""; // Clear answer when starting recording
        return newAnswers;
      });
      
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }
    
    // Generate feedback for the current answer
    setIsSubmitting(true);
    
    setTimeout(() => {
      const answerFeedback = generateFeedback(answers[currentQuestionIndex]);
      setFeedback(answerFeedback);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleContinue = () => {
    setFeedback(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, navigate to results
      navigate("/interview-results", {
        state: {
          jobRole,
          experience,
          questions,
          answers,
          feedbacks: answers.map(generateFeedback)
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Mock Interview: {jobRole}
          </h1>
          <p className="text-gray-600">
            Experience Level: {experience === "entry" ? "Entry Level" : experience === "mid" ? "Mid Level" : "Senior Level"}
          </p>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round((currentQuestionIndex / questions.length) * 100)}% Complete</span>
            </div>
            <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
          </div>
        </div>
        
        {!feedback ? (
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
              <CardDescription>
                Answer as you would in a real interview. Be specific and provide examples.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-gray-800 font-medium">{questions[currentQuestionIndex]}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="block text-sm font-medium text-gray-700">Your Answer</label>
                  {speechRecognitionSupported && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={toggleRecording}
                      className={isRecording ? "text-red-500 border-red-200 bg-red-50" : ""}
                    >
                      {isRecording ? (
                        <>
                          <StopCircleIcon className="h-4 w-4 mr-2" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <MicIcon className="h-4 w-4 mr-2" />
                          Start Recording
                        </>
                      )}
                    </Button>
                  )}
                </div>
                
                <Textarea 
                  value={answers[currentQuestionIndex]}
                  onChange={handleInputChange}
                  placeholder="Type your answer here or use voice recording..."
                  className="min-h-[200px] resize-none"
                />
                
                {isRecording && (
                  <div className="text-sm text-blue-600 animate-pulse flex items-center">
                    <span className="relative flex h-3 w-3 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    Listening... Speak your answer clearly
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={handleNext}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!answers[currentQuestionIndex].trim() || isSubmitting}
              >
                {isSubmitting ? "Analyzing your answer..." : "Submit Answer"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="mb-8 shadow-md">
            <CardHeader className="border-b">
              <CardTitle className="text-xl">Answer Feedback</CardTitle>
              <CardDescription>
                Here's an assessment of your response to Question {currentQuestionIndex + 1}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700">Overall Score</h3>
                  <span className="text-2xl font-bold text-blue-600">{feedback.score}/100</span>
                </div>
                <Progress value={feedback.score} className="h-2" />
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Feedback</h3>
                <p className="text-gray-600">{feedback.feedback}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                  <ul className="space-y-1">
                    {feedback.strengths.map((strength: string, index: number) => (
                      <li key={index} className="text-gray-600 text-sm">• {strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <h4 className="font-medium text-amber-700 mb-2">Areas to Improve</h4>
                  <ul className="space-y-1">
                    {feedback.improvements.map((improvement: string, index: number) => (
                      <li key={index} className="text-gray-600 text-sm">• {improvement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={handleContinue}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestionIndex < questions.length - 1 
                  ? "Next Question" 
                  : "See Interview Results"}
              </Button>
            </CardFooter>
          </Card>
        )}
        
        <div className="text-center text-sm text-gray-500">
          <p>You can take as much time as you need to answer each question.</p>
          <p>Your responses are analyzed to provide helpful feedback.</p>
        </div>
      </div>
    </div>
  );
};

export default InterviewSession;
