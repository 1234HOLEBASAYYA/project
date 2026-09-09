import React from 'react';
import { useTrip } from '../context/TripContext';
import { HeroNetworkVisualizer } from '../components/features/HeroNetworkVisualizer';
import { Button } from '../components/common/Button';
import {
  Plane,
  Brain,
  GitFork,
  Zap,
  BarChart3,
  Sliders,
  Bot,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
  ChevronDown,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setShowDisruptionModal } = useTrip();

  const features = [
    {
      icon: Brain,
      title: 'Smart Impact Analysis',
      desc: 'Understand how one disruption affects your entire journey. Automatically tracks downstream temporal cascade.',
      tag: 'CASCADING ENGINE',
      color: 'from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30',
    },
    {
      icon: GitFork,
      title: 'Dependency Intelligence',
      desc: 'Your bookings are connected, not isolated. Analyzes buffer times between flights, cabs, hotels, and tours.',
      tag: 'GRAPH TOPOLOGY',
      color: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30',
    },
    {
      icon: Zap,
      title: 'Instant Recovery Plans',
      desc: 'Get multiple recovery options within seconds. Synthesizes Pareto-optimal trade-offs across speed and cost.',
      tag: 'PARALLEL SOLVER',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      icon: BarChart3,
      title: 'Smart Plan Ranking',
      desc: 'Compare cost, time, convenience, and risk metrics dynamically with multi-factor utility scoring.',
      tag: 'MULTI-OBJECTIVE',
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
    },
    {
      icon: Sliders,
      title: 'What-If Simulation',
      desc: 'See the consequences before making a decision. Sandbox alternative flights, trains, and hotel choices.',
      tag: 'SCENARIO SANDBOX',
      color: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30',
    },
    {
      icon: Bot,
      title: 'Explainable AI',
      desc: 'Understand exactly why a recovery plan is recommended with transparent natural language reasoning.',
      tag: 'TRANSPARENT AI',
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Create Trip',
      desc: 'Define your travel itinerary, destination, and baseline travel preferences (Budget vs Balanced vs Speed).',
    },
    {
      num: '02',
      title: 'Add Travel Bookings',
      desc: 'Connect flights, airport cabs, hotel check-ins, conferences, and tours into a topological dependency chain.',
    },
    {
      num: '03',
      title: 'Disruption Occurs',
      desc: 'Real-time telemetry detects flight delay, train cancellation, or severe weather incident.',
    },
    {
      num: '04',
      title: 'Analyze Impact',
      desc: 'ReRoute engine evaluates cascading buffer conflicts and marks downstream bookings as Missed or At-Risk.',
    },
    {
      num: '05',
      title: 'Generate Recovery Plans',
      desc: 'Synthesizes Plan A (Cheapest), Plan B (Fastest), and Plan C (AI Recommended) with Pareto scoring.',
    },
    {
      num: '06',
      title: 'Continue Your Journey',
      desc: 'One-click recovery executes automated rebookings, pushes mobile hotel keys, and restores your schedule.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-slate-100 overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none" />

      {/* Navigation Bar */}
      <header className="relative z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-glow-cyan">
            <Plane className="w-5 h-5 text-white transform -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white">ReRoute</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wide">
              Travel Recovery Engine • Hack Bros
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              const el = document.getElementById('how-it-works');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden sm:inline-flex"
          >
            How It Works
          </Button>
          <Button
            variant="glow"
            size="md"
            onClick={() => setCurrentView('dashboard')}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Launch Platform
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-8 pb-16 text-center space-y-8">
        {/* Hackathon Problem Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 shadow-md text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>PS-2: Intelligent Travel Disruption Recovery Engine</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-slate-400 font-mono">Team Hack Bros</span>
        </div>

        {/* Hero Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Travel Plans Change. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Your Journey Shouldn't.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            ReRoute AI detects travel disruptions, predicts cascading impacts across connected bookings, and creates intelligent recovery plans for your entire journey.
          </p>
        </div>

        {/* Hero CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button
            size="lg"
            variant="glow"
            onClick={() => setCurrentView('dashboard')}
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            className="shadow-glow-cyan text-base px-8 py-4"
          >
            Explore Interactive Demo
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => {
              const el = document.getElementById('how-it-works');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            icon={<ChevronDown className="w-4 h-4" />}
            className="text-base px-6 py-4"
          >
            View How It Works
          </Button>
        </div>

        {/* Animated Interactive Hero Travel Network Visualizer */}
        <div className="pt-6">
          <HeroNetworkVisualizer />
        </div>
      </section>

      {/* Problem Demonstration Narrative Banner */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#0F172A] to-slate-900/90 border border-slate-700/80 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30">
              THE CASCADING DISRUPTION PROBLEM
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
              One Delay Destroys Your Entire Day
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Isolated booking apps don't talk to each other. When your flight slips 3 hours, the domino effect begins:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 text-xs">
              <span className="text-lg block mb-1">✈️</span>
              <p className="font-bold text-red-300">Flight Delayed</p>
              <p className="text-[10px] text-slate-400">+3h departure slip</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs">
              <span className="text-lg block mb-1">🚕</span>
              <p className="font-bold text-amber-300">Cab Missed</p>
              <p className="text-[10px] text-slate-400">Driver leaves airport</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-yellow-950/40 border border-yellow-500/40 text-xs">
              <span className="text-lg block mb-1">🏨</span>
              <p className="font-bold text-yellow-300">Hotel Check-in Risk</p>
              <p className="text-[10px] text-slate-400">Room release window</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs">
              <span className="text-lg block mb-1">🎫</span>
              <p className="font-bold text-amber-300">Tour Conflicted</p>
              <p className="text-[10px] text-slate-400">Non-refundable cutoff</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs">
              <span className="text-lg block mb-1">✨</span>
              <p className="font-bold text-emerald-300">ReRoute AI Recovers</p>
              <p className="text-[10px] text-slate-400">Stabilizes entire trip</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            CORE CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Intelligent Travel Operations
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Built as an autonomous resilience layer that sits on top of your bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${f.color}`}>
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs text-cyan-400 font-semibold group-hover:text-cyan-300">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            STEP-BY-STEP RECOVERY WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            How ReRoute AI Recovers Your Journey
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            From initial flight telemetry anomaly to synchronized itinerary execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((st, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-[#0F172A]/90 border border-slate-800 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-extrabold font-mono text-slate-700 block mb-2">
                  {st.num}
                </span>
                <h3 className="text-base font-bold text-white">{st.title}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Demo Action CTA Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900/40 via-cyan-950/60 to-purple-900/40 border border-cyan-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to See ReRoute AI in Action?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Experience the live interactive simulation with the Bangalore → Mumbai Business Trip scenario.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              variant="glow"
              onClick={() => setCurrentView('dashboard')}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="px-8 py-4"
            >
              Launch Hackathon Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 py-8 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">ReRoute AI</span>
            <span>•</span>
            <span>Intelligent Travel Disruption Recovery Engine</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>Problem Statement: PS-2</span>
            <span>•</span>
            <span className="text-cyan-400">Team: Hack Bros</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
