'use client';
import { useState, useEffect } from 'react';
import { Sparkles, Copy, Loader2, Rocket, Target, Zap, Award, CheckCircle2, TrendingUp, Users, Star, ArrowRight, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Home() {
  interface LandingPageResult {
    hero: string;
    subheadline: string;
    cta: string;
    features: Array<{ title: string; description: string }>;
    socialProof: string;
    urgency: string;
  }

  const [formData, setFormData] = useState({
    product: '',
    audience: '',
    benefit: '',
    tone: 'professional',
    theme: 'modern'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LandingPageResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const generateLanding = async () => {
    // Validation
    if (!formData.product.trim() || !formData.audience.trim() || !formData.benefit.trim()) {
      setError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate landing page');
      }
      
      setResult(data);
      
    } catch (err) {
      setError((err as Error).message || 'Something went wrong. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

const copyHTML = () => {
    if (!result) {
      setError('No landing page generated yet.');
      return;
    }
    const themes = {
      modern: { primary: 'indigo', secondary: 'purple', bg: 'from-slate-50 via-blue-50 to-indigo-100', accent: 'from-indigo-600 to-purple-600', text: 'text-indigo-600' },
      luxury: { primary: 'yellow', secondary: 'gray', bg: 'from-gray-50 via-yellow-50 to-gray-100', accent: 'from-yellow-600 to-gray-800', text: 'text-yellow-600' },
      bold: { primary: 'red', secondary: 'orange', bg: 'from-red-50 via-orange-50 to-red-100', accent: 'from-red-600 to-orange-600', text: 'text-red-600' },
      minimal: { primary: 'gray', secondary: 'black', bg: 'from-white via-gray-50 to-white', accent: 'from-gray-600 to-black', text: 'text-gray-600' },
      vibrant: { primary: 'pink', secondary: 'purple', bg: 'from-pink-50 via-purple-50 to-pink-100', accent: 'from-pink-600 to-purple-600', text: 'text-pink-600' }
    };
    const theme = themes[formData.theme as keyof typeof themes];
    const featuresHtml = result.features.map((f, i) => `<div class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp delay-${(i + 1) * 100}"><div class="w-14 h-14 bg-linear-to-br from-${theme.primary}-500 to-${theme.secondary}-600 rounded-xl flex items-center justify-center mb-5"><svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><h3 class="text-2xl font-bold mb-4 text-gray-900">${f.title}</h3><p class="text-gray-600 leading-relaxed">${f.description}</p></div>`).join('');
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.product} - ${result.hero}</title>
    <meta name="description" content="${result.subheadline}">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
    </style>
</head>
<body class="bg-linear-to-br ${theme.bg} min-h-screen">
    
    <!-- Main Container -->
    <div class="container mx-auto px-4 py-16 max-w-6xl">
        
        <!-- Hero Section -->
        <div class="text-center mb-20 animate-fadeInUp">
            <h1 class="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r ${theme.accent} mb-6 leading-tight">
                ${result.hero}
            </h1>
            <p class="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                ${result.subheadline}
            </p>
            <button class="bg-linear-to-r ${theme.accent} text-white px-10 py-5 rounded-xl text-xl font-bold hover:scale-105 transition-all duration-200 shadow-2xl hover:shadow-${theme.primary}-500/50">
                ${result.cta}
            </button>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-3 gap-8 mb-20">
            ${featuresHtml}
        </div>

        <!-- Social Proof Section -->
        <div class="bg-white p-10 rounded-2xl shadow-xl mb-12 animate-fadeInUp delay-300">
            <div class="flex items-start gap-4">
                <div class="shrink-0">
                    <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                    </div>
                </div>
                <div class="flex-1">
                    <p class="text-lg text-gray-800 italic leading-relaxed">"${result.socialProof}"</p>
                    <p class="text-sm text-gray-500 mt-3 font-semibold">— Verified Customer</p>
                </div>
            </div>
        </div>

        <!-- Urgency Banner -->
        <div class="bg-linear-to-r from-red-500 to-pink-600 p-6 rounded-xl text-center animate-fadeInUp delay-400">
            <p class="text-white font-bold text-lg md:text-xl">
                ⚡ ${result.urgency}
            </p>
        </div>

        <!-- Final CTA -->
        <div class="text-center mt-12">
            <button class="bg-linear-to-r ${theme.accent} text-white px-12 py-6 rounded-xl text-2xl font-bold hover:scale-105 transition-all duration-200 shadow-2xl hover:shadow-${theme.primary}-500/50">
                ${result.cta}
            </button>
        </div>
    </div>

    <!-- Footer -->
    <div class="text-center py-8 text-gray-500 text-sm">
        <p>© ${new Date().getFullYear()} ${formData.product}. All rights reserved.</p>
    </div>

</body>
</html>`;
    
    navigator.clipboard.writeText(html)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(err => {
        console.error('Copy failed:', err);
        setError('Failed to copy to clipboard. Please try again.');
      });
  };

  // Example templates for quick start
  const loadExample = (type: 'saas' | 'ecommerce' | 'course') => {
    const examples = {
      saas: {
        product: 'CloudFlow CRM',
        audience: 'Small business owners and sales teams',
        benefit: 'Close 3x more deals with AI-powered automation',
        tone: 'professional',
        theme: 'modern'
      },
      ecommerce: {
        product: 'LuxeWatch Premium Timepieces',
        audience: 'Successful professionals aged 30-50',
        benefit: 'Own a luxury Swiss watch for 70% less than retail',
        tone: 'luxury',
        theme: 'luxury'
      },
      course: {
        product: 'CodeMaster Pro',
        audience: 'Career changers wanting to become developers',
        benefit: 'Land your first $80k+ dev job in 6 months or get your money back',
        tone: 'urgent',
        theme: 'bold'
      }
    };
    setFormData(examples[type]);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { name: "Sarah Chen", role: "Marketing Director", company: "TechFlow Inc", text: "This tool saved us 20 hours of copywriting work. The landing pages convert 3x better than our old ones." },
    { name: "Marcus Rodriguez", role: "Founder", company: "StartupXYZ", text: "From idea to live landing page in under 5 minutes. The AI understands marketing psychology perfectly." },
    { name: "Emily Watson", role: "E-commerce Manager", company: "Luxury Brands Co", text: "Our conversion rate jumped 40% after using these AI-generated landing pages. Game changer!" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg animate-float">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">AI Landing Pro</h1>
                <p className="text-xs text-gray-500">Powered by Groq AI</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="font-medium">High Converting</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 rounded-full">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span className="font-medium">2-3 Seconds</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Pro Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-600/5 via-purple-600/5 to-pink-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Star className="w-4 h-4" />
              Trusted by 50,000+ Marketers Worldwide
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Generate <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600">High-Converting</span><br />
              Landing Pages in Seconds
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Professional copywriting powered by advanced AI. Perfect for marketers, founders, and agencies who need results fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => document.getElementById('product')?.focus()}
                size="lg"
                className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-200"
              >
                Start Creating <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => setShowDemo(true)}
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-indigo-600 text-gray-700 hover:text-indigo-600 px-8 py-4 text-lg font-semibold"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-black text-indigo-600 mb-2">50K+</div>
              <div className="text-sm text-gray-600 font-medium">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-600 mb-2">2-3s</div>
              <div className="text-sm text-gray-600 font-medium">Generation Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-pink-600 mb-2">300%</div>
              <div className="text-sm text-gray-600 font-medium">Avg. Conversion Lift</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600 font-medium">AI Availability</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Examples */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Try These Examples</h2>
          <p className="text-gray-600">Click any example to pre-fill the form</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => loadExample('saas')}
            className="group px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-indigo-600 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                <span className="text-2xl">📊</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 group-hover:text-indigo-600">SaaS CRM</div>
                <div className="text-sm text-gray-500">CloudFlow Platform</div>
              </div>
            </div>
          </button>
          <button
            onClick={() => loadExample('ecommerce')}
            className="group px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-600 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                <span className="text-2xl">🛍️</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 group-hover:text-purple-600">E-commerce</div>
                <div className="text-sm text-gray-500">Luxury Watches</div>
              </div>
            </div>
          </button>
          <button
            onClick={() => loadExample('course')}
            className="group px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-pink-600 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-600 transition-colors">
                <span className="text-2xl">🎓</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 group-hover:text-pink-600">Online Course</div>
                <div className="text-sm text-gray-500">CodeMaster Pro</div>
              </div>
            </div>
          </button>
        </div>
      </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Input Form */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-t-xl">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 animate-pulse" />
                Landing Page Details
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Tell us about your product and we'll create conversion-optimized copy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">

              <div className="space-y-3">
                <Label htmlFor="product" className="text-base font-semibold text-gray-900">
                  Product/Service Name *
                </Label>
                <Input
                  id="product"
                  placeholder="e.g., FunderPro Trading Platform"
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  className="h-12 text-base border-2 border-gray-200 focus:border-indigo-600 rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="audience" className="text-base font-semibold text-gray-900">
                  Target Audience *
                </Label>
                <Input
                  id="audience"
                  placeholder="e.g., Aspiring forex traders aged 25-45"
                  value={formData.audience}
                  onChange={(e) => setFormData({...formData, audience: e.target.value})}
                  className="h-12 text-base border-2 border-gray-200 focus:border-indigo-600 rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="benefit" className="text-base font-semibold text-gray-900">
                  Main Benefit *
                </Label>
                <Input
                  id="benefit"
                  placeholder="e.g., Trade with up to $200k in funded capital with no personal risk"
                  value={formData.benefit}
                  onChange={(e) => setFormData({...formData, benefit: e.target.value})}
                  className="h-12 text-base border-2 border-gray-200 focus:border-indigo-600 rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="tone" className="text-base font-semibold text-gray-900">
                  Copy Tone
                </Label>
                <Select value={formData.tone} onValueChange={(value) => setFormData({...formData, tone: value})}>
                  <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-indigo-600 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">💼 Professional</SelectItem>
                    <SelectItem value="casual">😊 Casual & Friendly</SelectItem>
                    <SelectItem value="urgent">⚡ Urgent & Direct</SelectItem>
                    <SelectItem value="luxury">👑 Luxury & Exclusive</SelectItem>
                    <SelectItem value="friendly">🤝 Warm & Approachable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="theme" className="text-base font-semibold text-gray-900">
                  Design Theme
                </Label>
                <Select value={formData.theme} onValueChange={(value) => setFormData({...formData, theme: value})}>
                  <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-indigo-600 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">🎨 Modern & Clean</SelectItem>
                    <SelectItem value="luxury">💎 Luxury & Elegant</SelectItem>
                    <SelectItem value="bold">🔥 Bold & Dynamic</SelectItem>
                    <SelectItem value="minimal">✨ Minimal & Simple</SelectItem>
                    <SelectItem value="vibrant">🌈 Vibrant & Colorful</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <p className="text-red-800 text-sm font-medium">{error}</p>
                  </div>
                </div>
              )}

              <Button
                onClick={generateLanding}
                disabled={loading}
                className="w-full h-14 text-lg font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-[1.02] transition-all duration-200"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Your Landing Page...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Landing Page
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  Average generation time: 2-3 seconds
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          {result ? (
            <Card className="shadow-2xl border-0 animate-fadeIn">
              <CardHeader className="bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6" />
                      Generated Successfully!
                    </CardTitle>
                    <CardDescription className="text-green-100">
                      Your high-converting landing page is ready
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={copyHTML} 
                    variant="secondary" 
                    size="sm"
                    className="font-semibold"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copied ? '✓ Copied!' : 'Copy HTML'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                
                {/* Live Preview */}
                <div className="bg-linear-to-br from-blue-50 to-indigo-100 p-6 md:p-8 rounded-xl shadow-inner">
                  
                  {/* Hero */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                      {result.hero}
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {result.subheadline}
                    </p>
                    <Button size="lg" className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg font-bold px-8">
                      {result.cta}
                    </Button>
                  </div>

                  {/* Features */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {result.features.map((feature, i) => (
                      <div key={i} className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          {i === 0 && <Target className="w-6 h-6 text-indigo-600" />}
                          {i === 1 && <Zap className="w-6 h-6 text-purple-600" />}
                          {i === 2 && <Award className="w-6 h-6 text-pink-600" />}
                          <h3 className="font-bold text-lg">{feature.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Social Proof */}
                  <div className="bg-white p-6 rounded-xl shadow-lg mb-4">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-yellow-600 shrink-0 mt-1" />
                      <p className="text-gray-700 italic leading-relaxed">"{result.socialProof}"</p>
                    </div>
                  </div>

                  {/* Urgency */}
                  <div className="bg-linear-to-r from-red-500 to-pink-600 p-4 rounded-lg text-center">
                    <p className="text-white font-bold">
                      ⚡ {result.urgency}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <Button 
                    onClick={copyHTML}
                    className="w-full h-12 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        HTML Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 mr-2" />
                        Copy Production-Ready HTML
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    💡 Paste into any HTML file or website builder
                  </p>
                </div>

              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-2xl border-0 bg-linear-to-br from-gray-50 to-gray-100">
              <CardContent className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-linear-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Ready to Generate?
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Fill in your product details and click "Generate Landing Page" to create professional, conversion-optimized copy in seconds.
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="text-3xl font-black text-indigo-600">2-3s</div>
                      <div className="text-xs text-gray-600 mt-1">Generation Time</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="text-3xl font-black text-purple-600">AI</div>
                      <div className="text-xs text-gray-600 mt-1">Powered</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="text-3xl font-black text-pink-600">Pro</div>
                      <div className="text-xs text-gray-600 mt-1">Quality</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <div className="inline-block bg-white px-6 py-4 rounded-xl shadow-lg">
            <p className="text-gray-600 text-sm font-medium">
              Built with Next.js 14, React, Tailwind CSS, shadcn/ui, and Groq AI
            </p>
            <p className="text-gray-400 text-xs mt-1">
              © {new Date().getFullYear()} • Professional Landing Page Generator
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
