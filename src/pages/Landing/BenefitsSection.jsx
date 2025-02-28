import { Heart, MessageCircle, Shield } from "lucide-react";

const BenefitsSection = () => {
  return (
    <div className="bg-gradient-to-br from-swinxter-dark via-black to-swinxter-dark text-white py-24 relative">
      <div className="absolute inset-0  opacity-5 bg-repeat"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text bg-gradient-to-r from-swinxter-primary to-swinxter-accent">
          Why Choose Swinxter?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-swinxter-primary/30 transition-all duration-500 group">
            <div className="p-4 rounded-full bg-gradient-to-br from-swinxter-primary/20 to-swinxter-accent/20 mb-6 group-hover:scale-110 transition-transform duration-500">
              <Heart className="w-8 h-8 text-swinxter-primary group-hover:text-swinxter-accent transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-white/90">Meaningful Connections</h3>
            <p className="text-gray-400 leading-relaxed">Find people who share your interests and values</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-swinxter-primary/30 transition-all duration-500 group">
            <div className="p-4 rounded-full bg-gradient-to-br from-swinxter-primary/20 to-swinxter-accent/20 mb-6 group-hover:scale-110 transition-transform duration-500">
              <MessageCircle className="w-8 h-8 text-swinxter-primary group-hover:text-swinxter-accent transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-white/90">Real Conversations</h3>
            <p className="text-gray-400 leading-relaxed">Connect through genuine interactions</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-swinxter-primary/30 transition-all duration-500 group">
            <div className="p-4 rounded-full bg-gradient-to-br from-swinxter-primary/20 to-swinxter-accent/20 mb-6 group-hover:scale-110 transition-transform duration-500">
              <Shield className="w-8 h-8 text-swinxter-primary group-hover:text-swinxter-accent transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-white/90">Safe Environment</h3>
            <p className="text-gray-400 leading-relaxed">Your safety is our top priority</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;