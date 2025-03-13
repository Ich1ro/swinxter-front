import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const SignupHero = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-swinxter-dark via-black to-swinxter-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-repeat"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10 homepage-title">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text bg-gradient-to-r from-swinxter-primary via-swinxter-accent to-swinxter-primary animate-gradient leading-tight" style={{color: '#F97316'}}>
          Elite Lifestyle Community for Adventurous Couples & Open-Minded Singles
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-swinxter-light/90 leading-relaxed">
          Join the world's most trusted community of verified members! Connect instantly with swingers, explore lifestyle events, and discover lifestyle-friendly businesses and travel spots. With Swinxter, enjoy privacy and safety in every connection.
        </p>
        
        <Button 
          size="lg"
          className="bg-gradient-to-r from-swinxter-primary to-swinxter-accent hover:from-swinxter-accent hover:to-swinxter-primary text-white px-10 py-7 text-lg rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(251,146,60,0.3)] group"
          onClick={() => window.location.href = '/signup'}
        >
          Sign up free
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <p className="mt-8 text-sm text-gray-400 tracking-wide">
          Free to join • 1 month free for Verified members
        </p>
      </div>
    </div>
  );
};

export default SignupHero;