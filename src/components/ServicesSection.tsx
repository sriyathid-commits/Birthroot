import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Baby, Activity, HeartPulse, ShieldAlert, CheckCircle2, ChevronRight, Calculator, CalendarDays } from 'lucide-react';
import { SPECIALTIES } from '../data/mockData';

export default function ServicesSection() {
  const [selectedSpec, setSelectedSpec] = useState(SPECIALTIES[0].id);
  
  // Pregnancy Due Date Calculator state
  const [lmpDate, setLmpDate] = useState('');
  const [eddResult, setEddResult] = useState<any>(null);

  // IVF Estimator state
  const [ivfStartDate, setIvfStartDate] = useState('');
  const [ivfResult, setIvfResult] = useState<any>(null);

  const activeSpec = SPECIALTIES.find((s) => s.id === selectedSpec) || SPECIALTIES[0];

  // Map icon strings to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Baby': return <Baby className="w-6 h-6" />;
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      default: return <HeartPulse className="w-6 h-6" />;
    }
  };

  // Due Date Calculation logic
  const handleCalculateEDD = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lmpDate) return;

    const lmp = new Date(lmpDate);
    
    // Naegele's rule: add 280 days (40 weeks) to LMP
    const edd = new Date(lmp);
    edd.setDate(lmp.getDate() + 280);

    // Current Gestational age estimate based on 2026-06-28 current date
    const today = new Date('2026-06-28');
    const diffTime = Math.abs(today.getTime() - lmp.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    let trimester = 1;
    if (weeks >= 13 && weeks < 28) trimester = 2;
    if (weeks >= 28) trimester = 3;

    setEddResult({
      edd: edd.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      weeks,
      days,
      trimester,
      babySize: getBabySizeRepresentation(weeks),
      milestone: getPregnancyMilestone(weeks)
    });
  };

  const getBabySizeRepresentation = (weeks: number) => {
    if (weeks < 4) return "Poppy Seed";
    if (weeks < 8) return "Blueberry (Sweet & Small)";
    if (weeks < 12) return "Lime (Starts moving limbs!)";
    if (weeks < 16) return "Avocado (Beautiful heartbeat audible)";
    if (weeks < 20) return "Banana (Active flips & movements)";
    if (weeks < 24) return "Sweet Potato (Ears fully formed)";
    if (weeks < 28) return "Eggplant (Eyes begin to open)";
    if (weeks < 32) return "Squash (Sleep & Wake cycles)";
    if (weeks < 36) return "Papaya (Rapid brain development)";
    return "Watermelon (Ready to meet the world!)";
  };

  const getPregnancyMilestone = (weeks: number) => {
    if (weeks < 12) return "First Trimester Screening & Booking blood tests";
    if (weeks < 20) return "Anomaly TIFFA Ultrasound (Highly recommended around 19-20 weeks)";
    if (weeks < 28) return "Glucose Tolerance Test & Gestational diabetes profiling";
    if (weeks < 36) return "Growth Scan, Doppler, and Lactation guidance planning";
    return "Weekly maternal checks & Painless delivery consultation";
  };

  // IVF Cycle Estimator logic
  const handleCalculateIVF = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ivfStartDate) return;

    const base = new Date(ivfStartDate);

    // Cycle steps estimation
    const stimulation = new Date(base);
    stimulation.setDate(base.getDate() + 2);

    const retrieval = new Date(base);
    retrieval.setDate(base.getDate() + 12);

    const transfer = new Date(base);
    transfer.setDate(base.getDate() + 17); // 5-day blastocyst transfer

    const betaHcg = new Date(base);
    betaHcg.setDate(base.getDate() + 31); // 14 days post transfer

    setIvfResult({
      stimulation: stimulation.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      retrieval: retrieval.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      transfer: transfer.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      betaHcg: betaHcg.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="services-section-wrapper">
      
      {/* Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Specialized Clinical Departments
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Led by Dr. Shruthi Goli and specialized medical consultants. We host advanced fertility research labs and secure surgical suites designed for top clinical care.
        </p>
      </div>

      {/* Specialty Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Navigation (Menu items) */}
        <div className="lg:col-span-4 space-y-3" id="service-navigation-tabs">
          {SPECIALTIES.map((spec) => {
            const isSelected = selectedSpec === spec.id;
            return (
              <button
                key={spec.id}
                onClick={() => setSelectedSpec(spec.id)}
                id={`btn-service-tab-${spec.id}`}
                className={`w-full flex items-center justify-between p-4.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-teal-50/50 border-teal-500/50 shadow-xs' 
                    : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2.5 rounded-xl transition-colors ${
                    isSelected ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {getIcon(spec.icon)}
                  </div>
                  <div>
                    <h3 className={`font-display font-bold text-sm ${isSelected ? 'text-teal-700 font-semibold' : 'text-slate-700'}`}>
                      {spec.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{spec.telugu}</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-teal-600 translate-x-1' : 'text-slate-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Side Details panel (Bento styled, animated transitions) */}
        <div className="lg:col-span-8" id="service-details-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSpec}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full uppercase">
                  Featured Specialty
                </span>
                <h2 className="font-display font-bold text-2xl text-slate-800 mt-2">{activeSpec.title}</h2>
                <h3 className="text-xs font-semibold text-teal-600">{activeSpec.telugu}</h3>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed font-sans border-l-2 border-teal-500/30 pl-4">
                {activeSpec.longDesc}
              </p>

              {/* Speciality features bullets */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clinical Highlights:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSpec.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* 2. Custom Interactive Clinical Calculators (Maternity & IVF tools) */}
      <section className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100/80" id="section-clinical-tools">
        
        <div className="max-w-xl mx-auto text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center p-2 bg-white rounded-xl shadow-xs text-brand-accent">
            <Calculator className="w-5 h-5" />
          </div>
          <h2 className="font-display font-bold text-xl text-slate-800">
            Interactive Pregnancy & IVF Calculators
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Plan your parenting goals using our clinical estimators. Backed by Dr. Shruthi Goli's medical templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Tool A: Pregnancy Due Date (EDD) Calculator */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100/80 shadow-xs space-y-4">
            
            <div className="flex items-center space-x-3 text-slate-800">
              <CalendarDays className="w-5 h-5 text-brand-accent" />
              <div>
                <h3 className="font-display font-bold text-sm">Maternity Due Date Calculator</h3>
                <p className="text-[10px] text-slate-400">Calculate your estimated date of delivery (EDD)</p>
              </div>
            </div>

            <form onSubmit={handleCalculateEDD} className="space-y-3">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">First Day of Last Period (LMP):</label>
                <input
                  type="date"
                  required
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                  className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-slate-700 bg-slate-50/50"
                />
              </div>
              <button
                type="submit"
                id="btn-calc-edd"
                className="w-full py-2.5 rounded-xl bg-brand-accent hover:bg-rose-600 text-white font-display font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                Calculate Due Date
              </button>
            </form>

            <AnimatePresence>
              {eddResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-rose-50/40 rounded-xl border border-rose-100/50 space-y-2 text-slate-800 text-xs font-sans"
                >
                  <p className="font-semibold text-slate-700">Estimated Delivery Date:</p>
                  <p className="font-display font-extrabold text-sm text-brand-accent">{eddResult.edd}</p>
                  
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-rose-100/30 text-[11px]">
                    <div>
                      <span className="text-slate-400">Gestational Age:</span>
                      <p className="font-bold text-slate-700">{eddResult.weeks} weeks, {eddResult.days} days</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Current Trimester:</span>
                      <p className="font-bold text-slate-700">Trimester {eddResult.trimester}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-rose-100/30 text-[11px]">
                    <span className="text-slate-400">Baby Size Match:</span>
                    <p className="font-bold text-slate-800 flex items-center space-x-1">
                      <Baby className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
                      <span>{eddResult.babySize}</span>
                    </p>
                  </div>

                  <div className="pt-2 text-[11px] bg-white p-2.5 rounded-lg border border-slate-100 mt-1">
                    <span className="font-bold text-slate-400 text-[9px] uppercase tracking-wider block mb-0.5">Upcoming Critical Step:</span>
                    <p className="text-slate-600 italic font-medium">{eddResult.milestone}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Tool B: IVF Treatment Cycle Planner */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100/80 shadow-xs space-y-4">
            
            <div className="flex items-center space-x-3 text-slate-800">
              <Baby className="w-5 h-5 text-brand-secondary" />
              <div>
                <h3 className="font-display font-bold text-sm">IVF Cycle Timeline Planner</h3>
                <p className="text-[10px] text-slate-400">Estimate major fertility milestone steps</p>
              </div>
            </div>

            <form onSubmit={handleCalculateIVF} className="space-y-3">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Estimated Cycle Start Date:</label>
                <input
                  type="date"
                  required
                  value={ivfStartDate}
                  onChange={(e) => setIvfStartDate(e.target.value)}
                  className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary text-slate-700 bg-slate-50/50"
                />
              </div>
              <button
                type="submit"
                id="btn-calc-ivf"
                className="w-full py-2.5 rounded-xl bg-brand-secondary hover:bg-teal-700 text-white font-display font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                Generate IVF Schedule
              </button>
            </form>

            <AnimatePresence>
              {ivfResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-teal-50/40 rounded-xl border border-teal-100/40 space-y-2.5 text-slate-800 text-[11px] font-sans"
                >
                  <p className="font-semibold text-slate-700 text-xs">Estimated IVF Milestones:</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100">
                      <div>
                        <p className="font-bold text-slate-700">1. Hormone Stimulation</p>
                        <p className="text-[9px] text-slate-400">FSH injections initiate</p>
                      </div>
                      <span className="font-mono font-bold text-teal-700">{ivfResult.stimulation}</span>
                    </div>

                    <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100">
                      <div>
                        <p className="font-bold text-slate-700">2. Follicle Retrieval</p>
                        <p className="text-[9px] text-slate-400">Outpatient egg aspiration</p>
                      </div>
                      <span className="font-mono font-bold text-teal-700">{ivfResult.retrieval}</span>
                    </div>

                    <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100">
                      <div>
                        <p className="font-bold text-slate-700">3. Embryo Blastocyst Transfer</p>
                        <p className="text-[9px] text-slate-400">Healthy embryo implantation</p>
                      </div>
                      <span className="font-mono font-bold text-teal-700">{ivfResult.transfer}</span>
                    </div>

                    <div className="flex justify-between items-center bg-rose-50/60 p-2 rounded-lg border border-rose-100/40">
                      <div>
                        <p className="font-bold text-rose-800">4. Beta-hCG Pregnancy Test</p>
                        <p className="text-[9px] text-rose-400">Blood hormone validation</p>
                      </div>
                      <span className="font-mono font-bold text-rose-700">{ivfResult.betaHcg}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 leading-normal italic text-center pt-1">
                    *Timelines are typical estimates and vary based on personal physical factors. Consult Dr. Shruthi Goli for customized medical plans.
                  </p>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </section>

    </div>
  );
}
