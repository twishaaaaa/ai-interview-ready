
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MicIcon, BrainCircuitIcon, AwardIcon, BarChartIcon } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Ace Your <span className="text-blue-600">Technical Interviews</span> with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Practice with our AI interviewer, get instant feedback, and improve your chances of landing that dream job.
            </p>
            <Button 
              onClick={() => navigate("/interview")} 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto"
            >
              Start Practice Interview
            </Button>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <BrainCircuitIcon className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">AI-Powered Questions</h3>
              </div>
              <p className="text-gray-600">
                Realistic technical interview questions tailored to your job role and experience level.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <MicIcon className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Speech Recognition</h3>
              </div>
              <p className="text-gray-600">
                Answer questions naturally by speaking, just like in a real interview setting.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <BarChartIcon className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Detailed Analysis</h3>
              </div>
              <p className="text-gray-600">
                Get insights on your answers with personalized feedback and improvement tips.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Select Your Role</h3>
              <p className="text-gray-600">Choose your target job position and experience level.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Answer Questions</h3>
              <p className="text-gray-600">Respond to interview questions by speaking or typing.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get Feedback</h3>
              <p className="text-gray-600">Receive detailed feedback and actionable improvements.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate("/interview")} 
              variant="outline" 
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Try it Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonial/Stats Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Get Interview Ready</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">93%</div>
              <p className="text-gray-600">of users report improved interview confidence</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
              <p className="text-gray-600">technical questions across different roles</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600">available for practice anytime, anywhere</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to ace your next interview?</h2>
          <p className="text-xl mb-8">Start practicing with our AI interviewer and get the job you deserve.</p>
          <Button 
            onClick={() => navigate("/interview")} 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto"
          >
            Start Free Practice
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-gray-800 text-gray-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p>© 2025 AI-Interview-Ready. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
