import { Bot, Sparkles, TrendingUp, UserCheck, Image, Calculator, Building2, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AIFeatures = () => {
  const aiChatbots = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Photography Consultant AI",
      description: "Instant photo style recommendations, pricing estimates, shoot planning, and equipment suggestions",
      status: "UI Ready",
      color: "text-primary"
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: "Portfolio Showcase AI",
      description: "Smart image categorization, style matching, and instant similar work suggestions",
      status: "UI Ready",
      color: "text-accent"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Trend Analysis Assistant",
      description: "Daily photography trends, market insights, competitive analysis, and opportunity identification",
      status: "UI Ready",
      color: "text-success"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Client Onboarding Wizard",
      description: "Smart questionnaires, auto-generated mood boards, timeline planning, and automated follow-ups",
      status: "UI Ready",
      color: "text-orange-500"
    }
  ];

  const customerFeatures = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Immersive Portfolio Experience",
      description: "AI-powered categorization, smart search, mood board generator, and before/after comparisons",
      status: "Coming Soon",
      color: "text-purple-500"
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Intelligent Pricing Calculator",
      description: "AI-powered estimates, dynamic pricing, package optimization, and ROI predictions",
      status: "Coming Soon",
      color: "text-blue-500"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Virtual Studio Tour",
      description: "Interactive exploration, equipment showcase, workflow visualization, and quality assurance",
      status: "Coming Soon",
      color: "text-pink-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Client Success Visualization",
      description: "Impact metrics, timeline journey, testimonial integration, and ROI calculators",
      status: "Coming Soon",
      color: "text-green-500"
    }
  ];

  return (
    <section id="ai-features" className="py-16 md:py-24 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <Badge className="mb-4 animate-pulse-glow">AI-Powered Innovation</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 animate-fade-in">
            Experience the Future of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Photography Services
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground animate-fade-in animate-delay-200">
            Cutting-edge AI assistants and intelligent tools that revolutionize how you work with photography
          </p>
        </div>

        {/* AI Chatbots */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">AI Chatbot Assistants</h3>
              <p className="text-muted-foreground">Instant, intelligent support available 24/7</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiChatbots.map((chatbot, index) => (
              <Card key={index} className="card-sweep border-border hover:border-primary/30 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`${chatbot.color} group-hover:scale-110 transition-transform duration-300`}>
                      {chatbot.icon}
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                      {chatbot.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mt-4">{chatbot.title}</CardTitle>
                  <CardDescription className="text-base">{chatbot.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">Instant Replies</Badge>
                    <Badge variant="secondary" className="text-xs">24/7 Available</Badge>
                    <Badge variant="secondary" className="text-xs">Lovable AI</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Customer Features */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">Smart Customer Experience</h3>
              <p className="text-muted-foreground">Overwhelmingly delightful, AI-enhanced interactions</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customerFeatures.map((feature, index) => (
              <Card key={index} className="card-sweep border-border hover:border-primary/30 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      {feature.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mt-4">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">AI-Powered</Badge>
                    <Badge variant="secondary" className="text-xs">Real-time</Badge>
                    <Badge variant="secondary" className="text-xs">Personalized</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-3xl mx-auto border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Experience AI-Enhanced Photography?</h3>
              <p className="text-muted-foreground mb-6">
                These are UI mockups. Full AI functionality will be implemented with Lovable Cloud backend.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Get Early Access
                </button>
                <button 
                  className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all duration-300"
                  onClick={() => {
                    const chatbot = document.querySelector('[aria-label="Open AI chatbot"]') as HTMLElement;
                    chatbot?.click();
                  }}
                >
                  Try AI Chatbot Demo
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;