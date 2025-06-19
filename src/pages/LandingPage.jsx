import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Database, 
  Zap, 
  Shield, 
  BarChart2, 
  Globe, 
  Star, 
  Menu, 
  X,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
];

const featuresData = [
  {
    icon: Database,
    title: 'Smart Data Integration',
    description: 'Seamlessly connect to various data sources with our intelligent connectors.',
    color: 'text-teal-500',
  },
  {
    icon: Layers,
    title: 'Visual Pipeline Builder',
    description: 'Design complex data workflows with an intuitive drag-and-drop interface.',
    color: 'text-blue-500',
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Process and analyze data streams in real-time for instant insights.',
    color: 'text-green-500',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Protect your data with robust security features and compliance controls.',
    color: 'text-cyan-500',
  },
  {
    icon: BarChart2,
    title: 'Advanced Analytics',
    description: 'Unlock deeper insights with powerful analytics and visualization tools.',
    color: 'text-blue-500',
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Scale your data operations globally with our resilient infrastructure.',
    color: 'text-green-500',
  },
];

const testimonialsData = [
  {
    quote: "DataFlow Pro has revolutionized how we handle data. Our team is more productive, and insights are faster than ever!",
    name: 'Sarah Chen',
    title: 'Data Engineer at TechCorp',
    stars: 5,
  },
  {
    quote: "The visual pipeline builder is a game-changer. We've cut down our development time by 60%. Highly recommended!",
    name: 'Michael Rodriguez',
    title: 'CTO at StartupXYZ',
    stars: 5,
  },
  {
    quote: "Switching to DataFlow Pro was the best decision for our analytics department. The platform is powerful yet easy to use.",
    name: 'Emily Johnson',
    title: 'Analytics Director at Enterprise Co',
    stars: 5,
  },
];

const pricingData = [
  {
    name: 'Starter',
    price: '$19',
    period: '/month',
    features: [
      'Up to 10 data sources',
      '1M records/month',
      'Basic integrations',
      'Email support',
      'Standard templates',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outline',
  },
  {
    name: 'Professional',
    price: '$199',
    period: '/month',
    features: [
      'Unlimited data sources',
      '10M records/month',
      'Custom integrations',
      'Priority support',
      'Advanced analytics',
      'API access',
    ],
    badge: 'Most Popular',
    buttonText: 'Get Started',
    buttonVariant: 'default',
    buttonClass: 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: [
      'Unlimited everything',
      'Custom SLA',
      'Dedicated support',
      'On-premise option',
      'Custom development',
      'Training & on-boarding',
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'outline',
  },
];

function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthAction = (path) => {
    navigate(path);
  };

  const handleGenericClick = (featureName) => {
    toast({
      title: `🚧 ${featureName} feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`
    });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>DataFlow Pro - Automate Your Data Workflows</title>
        <meta name="description" content="Transform raw data into actionable insights with DataFlow Pro's powerful automation platform. Build, deploy, and scale data pipelines without writing code." />
      </Helmet>

      <div className="min-h-screen bg-white text-gray-800">
        {/* Header */}
        <motion.header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled || isMobileMenuOpen ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <RouterLink to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className={`font-bold text-2xl ${isScrolled || isMobileMenuOpen ? 'text-gray-800' : 'text-white'}`}>DataFlow Pro</span>
            </RouterLink>
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className={`hover:text-blue-600 transition-colors ${isScrolled || isMobileMenuOpen ? 'text-gray-600' : 'text-white'}`}
                >
                  {link.name}
                </a>
              ))}
              <Button variant="ghost" onClick={() => handleAuthAction('/login')} className={`${isScrolled || isMobileMenuOpen ? 'text-gray-600 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
                Sign in
              </Button>
              <Button onClick={() => handleAuthAction('/login')} className="gradient-button text-white px-6 py-2 rounded-md font-semibold">
                Get Started
              </Button>
            </nav>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`${isScrolled || isMobileMenuOpen ? 'text-gray-800' : 'text-white'}`}>
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white shadow-lg"
              >
                <nav className="flex flex-col items-center space-y-4 py-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                  <Button variant="ghost" onClick={() => handleAuthAction('/login')} className="text-gray-600 hover:text-blue-600">
                    Sign in
                  </Button>
                  <Button onClick={() => handleAuthAction('/login')} className="gradient-button text-white px-6 py-2 rounded-md font-semibold w-full max-w-xs">
                    Get Started
                  </Button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* Hero Section */}
        <section className="relative teal-gradient-bg text-white pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-10 py-2 text-center text-sm">
            <CheckCircle className="inline-block w-4 h-4 mr-1" /> Trusted by 10,000+ companies worldwide
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Automate Your Data Workflows with Intelligence
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                  Transform raw data into actionable insights with our powerful automation platform. Build, deploy, and scale data pipelines without writing code.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                  <Button
                    size="lg"
                    onClick={() => handleAuthAction('/login')}
                    className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg transform hover:scale-105 transition-transform"
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleGenericClick('Watch Demo')}
                    className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold shadow-lg transform hover:scale-105 transition-transform"
                  >
                    Watch Demo
                  </Button>
                </div>
                <div className="flex space-x-6 text-sm text-blue-200">
                  <span>No credit card required</span>
                  <span>14-day free trial</span>
                </div>
              </motion.div>
              <motion.div
                className="relative hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 100 }}
              >
                <div className="bg-gray-800 p-4 rounded-lg shadow-2xl transform perspective-1000 rotate-y-15 hover:rotate-y-0 transition-transform duration-500">
                  <img 
                    className="rounded-md w-full h-auto"
                    alt="DataFlow Pro Dashboard Mockup"
                   src="https://images.unsplash.com/photo-1516383274235-5f42d6c6426d" />
                </div>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-sm text-white flex items-center">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 pulse-dot"></span>
            </span>
            Processing 1.3M records/sec
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for Modern Data Teams
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to build, deploy, and manage data pipelines at scale
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuresData.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-opacity-10 ${feature.color.replace('text-', 'bg-')}`}>
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Loved by Data Teams Worldwide
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See what our customers are saying about DataFlow Pro
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonialsData.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col justify-between bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div>
                      <div className="flex mb-4">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.title}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the plan that's right for your team
              </p>
            </motion.div>
            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
              {pricingData.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col ${plan.badge ? 'border-2 border-blue-600 rounded-xl shadow-2xl' : ''}`}
                >
                  <Card className={`h-full flex flex-col rounded-lg ${plan.badge ? 'relative' : 'shadow-lg'}`}>
                    {plan.badge && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
                          {plan.badge}
                        </span>
                      </div>
                    )}
                    <CardHeader className="text-center pt-10 pb-6">
                      <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                      <p className="text-4xl font-extrabold text-gray-900">
                        {plan.price}
                        <span className="text-base font-normal text-gray-500">{plan.period}</span>
                      </p>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-3 text-gray-600 mb-8">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Button
                        onClick={() => handleGenericClick(`Get Started with ${plan.name}`)}
                        variant={plan.buttonVariant}
                        className={`w-full font-semibold ${plan.buttonClass || ''} ${plan.buttonVariant === 'outline' ? 'border-blue-600 text-blue-600 hover:bg-blue-50' : ''}`}
                      >
                        {plan.buttonText}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-16 md:py-24 teal-gradient-bg text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Ready to Transform Your Data Workflows?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of companies already using DataFlow Pro to automate their data processes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button
                size="lg"
                onClick={() => handleAuthAction('/login')}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg transform hover:scale-105 transition-transform"
              >
                Start Your Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleGenericClick('Contact Sales')}
                className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold shadow-lg transform hover:scale-105 transition-transform"
              >
                Contact Sales
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary-blue text-blue-200 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-1">
                <RouterLink to="/" className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">D</span>
                  </div>
                  <span className="font-bold text-2xl text-white">DataFlow Pro</span>
                </RouterLink>
                <p className="text-sm">
                  Automate, enrich, and integrate your data with our intelligent platform.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('#features'); }} className="hover:text-white">Features</a></li>
                  <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('#pricing'); }} className="hover:text-white">Pricing</a></li>
                  <li><a href="#" onClick={() => handleGenericClick('Integrations')} className="hover:text-white">Integrations</a></li>
                  <li><a href="#" onClick={() => handleGenericClick('API Documentation')} className="hover:text-white">API Documentation</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" onClick={() => handleGenericClick('About Us')} className="hover:text-white">About Us</a></li>
                  <li><a href="#" onClick={() => handleGenericClick('Careers')} className="hover:text-white">Careers</a></li>
                  <li><a href="#" onClick={() => handleGenericClick('Blog')} className="hover:text-white">Blog</a></li>
                  <li><a href="#" onClick={() => handleGenericClick('Contact Us')} className="hover:text-white">Contact Us</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" onClick={() => handleGenericClick('Help Center')} className="hover:text-white">Help Center</a></li>
                  <li><a href="#" onClick={() => handleGenericClick('Status')} className="hover:text-white">Status</a></li>
                  <li><a href="#" onClick={() => handleGenericClick('Terms of Service')} className="hover:text-white">Terms of Service</a></li>
                  <li><a href="#" onClick={() => handleGenericClick('Privacy Policy')} className="hover:text-white">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-blue-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
              <p>&copy; {new Date().getFullYear()} DataFlow Pro. All rights reserved.</p>
              <p className="mt-4 sm:mt-0">Built with <span role="img" aria-label="love">❤️</span> by Hostinger Horizons</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;