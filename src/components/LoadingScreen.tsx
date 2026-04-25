import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate realistic loading with progressive speed
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        // Progressive loading - slower as it approaches 100%
        const increment = prev < 50 ? Math.random() * 8 + 2 : 
                         prev < 80 ? Math.random() * 4 + 1 : 
                         Math.random() * 2 + 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    // Fallback timeout to ensure loading doesn't hang
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 300);
    }, 2500);

    return () => {
      clearInterval(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-secondary z-[100] flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto px-6">
        {/* Enhanced Logo Animation */}
        <div className="relative mb-8">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse opacity-20"></div>
            <div className="absolute inset-1 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse opacity-40"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-background rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full animate-float"></div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground animate-fade-in mb-2">
            Saleixo
          </h1>
          <p className="text-muted-foreground animate-fade-in animate-delay-200 font-medium">
            Digital Studio
          </p>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="w-full max-w-xs mx-auto mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span className="animate-fade-in animate-delay-300">Loading</span>
            <span className="animate-fade-in animate-delay-300 font-medium">{Math.floor(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-success transition-all duration-500 ease-out rounded-full shadow-sm"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground animate-fade-in animate-delay-400">
          Crafting your creative journey...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;