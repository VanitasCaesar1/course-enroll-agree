import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const TermsAcceptance = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    accepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.mobile) {
      toast({
        title: "INCOMPLETE FORM",
        description: "All fields are mandatory. Complete the form.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.accepted) {
      toast({
        title: "TERMS NOT ACCEPTED",
        description: "You must accept the terms to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission - will be replaced with Supabase integration
    setTimeout(() => {
      toast({
        title: "SUBMISSION RECORDED",
        description: "Your acceptance has been logged in the system.",
      });
      setIsSubmitting(false);
      setFormData({ name: "", email: "", mobile: "", accepted: false });
    }, 1000);
  };

  return (
    <div className="min-h-screen brutal-grid bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="brutal-title mb-4">TERMS &amp; CONDITIONS</h1>
          <div className="brutal-box p-4 inline-block">
            <p className="brutal-text text-brutal-warning font-bold">
              COURSE ENROLLMENT AGREEMENT
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Terms Text */}
          <div className="brutal-box p-8">
            <h2 className="brutal-subtitle mb-6 text-brutal-accent">
              LEGAL AGREEMENT
            </h2>
            <div className="space-y-6 brutal-text">
              <div className="border-l-4 border-foreground pl-4">
                <p className="font-bold mb-2">COURSE FEE GUARANTEE:</p>
                <p>
                  By enrolling in this course, the student agrees that the course fee 
                  specified at the time of registration is final and will not be increased 
                  under any circumstances until the completion of the course.
                </p>
              </div>

              <div className="border-l-4 border-foreground pl-4">
                <p className="font-bold mb-2">CERTIFICATION TERMS:</p>
                <p>
                  Students will receive an internship certificate based on their performance 
                  during the course and internship period, and a course completion certificate 
                  will be awarded to all students upon successfully completing the program, 
                  in collaboration with our partnered companies.
                </p>
              </div>

              <div className="border-l-4 border-foreground pl-4">
                <p className="font-bold mb-2">ATTENDANCE REQUIREMENTS:</p>
                <p>
                  Students are expected to attend classes regularly, actively participate 
                  in learning activities, and complete assigned tasks to ensure the best outcomes.
                </p>
              </div>

              <div className="border-l-4 border-foreground pl-4">
                <p className="font-bold mb-2">PROMOTIONAL SUPPORT:</p>
                <p>
                  Students are encouraged to support our growth by promoting the course 
                  to friends or peers who may benefit from it.
                </p>
              </div>

              <div className="brutal-box bg-brutal-warning/20 p-4 border-brutal-warning">
                <p className="font-bold">
                  By accepting these terms and conditions, the student confirms that they 
                  have read, understood, and agreed to abide by the above terms for the 
                  entire duration of the course.
                </p>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="brutal-box p-8">
            <h2 className="brutal-subtitle mb-6">
              REGISTER YOUR ACCEPTANCE
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="brutal-text font-bold block mb-2">
                  FULL NAME *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="brutal-input h-12 text-lg"
                  placeholder="Enter your complete name"
                  required
                />
              </div>

              <div>
                <label className="brutal-text font-bold block mb-2">
                  EMAIL ADDRESS *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="brutal-input h-12 text-lg"
                  placeholder="your.email@domain.com"
                  required
                />
              </div>

              <div>
                <label className="brutal-text font-bold block mb-2">
                  MOBILE NUMBER *
                </label>
                <Input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="brutal-input h-12 text-lg"
                  placeholder="+1234567890"
                  required
                />
              </div>

              <div className="brutal-box bg-card p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="accept-terms"
                    checked={formData.accepted}
                    onCheckedChange={(checked) => 
                      setFormData({...formData, accepted: checked as boolean})
                    }
                    className="mt-1 border-2 border-foreground data-[state=checked]:bg-foreground"
                  />
                  <label htmlFor="accept-terms" className="brutal-text font-bold cursor-pointer">
                    I HAVE READ, UNDERSTOOD, AND AGREE TO ALL TERMS AND CONDITIONS 
                    STATED ABOVE. I ACCEPT FULL RESPONSIBILITY FOR COMPLIANCE WITH 
                    THESE TERMS.
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full brutal-box-hover h-16 brutal-text font-black text-xl uppercase bg-brutal-accent hover:bg-brutal-accent text-foreground border-foreground"
              >
                {isSubmitting ? "PROCESSING..." : "SUBMIT ACCEPTANCE"}
              </Button>
            </form>

            <div className="mt-6 p-4 border-2 border-brutal-warning bg-brutal-warning/10">
              <p className="brutal-text font-bold text-brutal-warning">
                WARNING: This is a legally binding agreement. Ensure all information 
                is accurate before submission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAcceptance;