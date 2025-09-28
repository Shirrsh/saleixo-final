import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background z-[100] flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground animate-fade-in">
            Alvaio
          </h1>
          <p className="text-muted-foreground animate-fade-in animate-delay-200">
            Digital Studio
          </p>
        </div>
        
        <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        <p className="text-sm text-muted-foreground mt-4 animate-fade-in animate-delay-400">
          {Math.floor(progress)}% loaded
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;