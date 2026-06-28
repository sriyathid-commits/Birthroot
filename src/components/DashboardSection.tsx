import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Phone, Calendar, ClipboardList, Clock, 
  PlusCircle, Stethoscope, FileText, ArrowRight, 
  Baby, Sparkles, CheckCircle, HelpCircle, 
  Heart, AlertCircle, RefreshCw, Send, ChevronRight 
} from 'lucide-react';
import { INITIAL_PATIENTS } from '../data/mockData';
import { PatientHistory, MedicalRecord } from '../types';

interface DashboardSectionProps {
  loggedInPatient: PatientHistory | null;
  onLoginSuccess: (patient: PatientHistory) => void;
  onLogout: () => void;
}

export default function DashboardSection({ loggedInPatient, onLoginSuccess, onLogout }: DashboardSectionProps) {
  const [phoneInput, setPhoneInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Local storage lists
  const [patientDatabase, setPatientDatabase] = useState<PatientHistory[]>([]);
  const [patientAppointments, setPatientAppointments] = useState<any[]>([]);

  // Selected sub-tabs in dashboard
  const [dashTab, setDashTab] = useState<'overview' | 'timeline' | 'records' | 'diary' | 'ai'>('overview');
  
  // Diary/Log state
  const [newSymptom, setNewSymptom] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newBP, setNewBP] = useState('');
  const [symptomLogs, setSymptomLogs] = useState<{date: string, symptom: string, weight?: string, bp?: string}[]>([]);
  
  // Custom Chat bot state
  const [chatMessages, setChatMessages] = useState<{sender: 'user' | 'ai', text: string}[]>([
    { sender: 'ai', text: "Hello! I am the Birthroots Care Helper. Ask me anything about IVF treatment steps, maternity milestones, or child vaccination, and I'll share Dr. Shruthi Goli's clinical recommendations." }
  ]);
  const [customQuestion, setCustomQuestion] = useState('');

  // Selected active report slip modal
  const [selectedReport, setSelectedReport] = useState<MedicalRecord | null>(null);

  useEffect(() => {
    // Sync patient data from localStorage
    const savedPatientsRaw = localStorage.getItem('birthroots_patients');
    if (!savedPatientsRaw) {
      localStorage.setItem('birthroots_patients', JSON.stringify(INITIAL_PATIENTS));
      setPatientDatabase(INITIAL_PATIENTS);
    } else {
      setPatientDatabase(JSON.parse(savedPatientsRaw));
    }

    // Sync appointments
    const savedAppRaw = localStorage.getItem('birthroots_appointments');
    if (savedAppRaw) {
      setPatientAppointments(JSON.parse(savedAppRaw));
    }
  }, []);

  // Filter appointments for the logged in user
  const userAppointments = loggedInPatient 
    ? patientAppointments.filter((app) => app.patientPhone === loggedInPatient.patientPhone)
    : [];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput) return;

    // Find in synchronized database
    const match = patientDatabase.find((p) => p.patientPhone === phoneInput);
    if (match) {
      onLoginSuccess(match);
      setLoginError('');
    } else {
      // If not found, let's look in initial lists, or offer to bootstrap a clean profile
      const defaultMatch = INITIAL_PATIENTS.find((p) => p.patientPhone === phoneInput);
      if (defaultMatch) {
        onLoginSuccess(defaultMatch);
        setLoginError('');
      } else {
        setLoginError("We couldn't find a file with that phone number. Try '9876543210' to load Anjali's pre-populated IVF timeline, or book an appointment first to register your profile!");
      }
    }
  };

  const handleLogSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymptom) return;

    const newLog = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      symptom: newSymptom,
      weight: newWeight || undefined,
      bp: newBP || undefined
    };

    const updatedLogs = [newLog, ...symptomLogs];
    setSymptomLogs(updatedLogs);
    
    // Append to Patient's medical records
    if (loggedInPatient) {
      const dbCopy = [...patientDatabase];
      const matchIdx = dbCopy.findIndex((p) => p.id === loggedInPatient.id);
      if (matchIdx !== -1) {
        const customRecord: MedicalRecord = {
          id: "log-" + Math.floor(Math.random() * 1000),
          date: new Date().toISOString().split('T')[0],
          type: 'Consultation',
          title: `Self-Logged: ${newSymptom.substring(0, 25)}...`,
          doctorName: "Patient Self-Report",
          notes: `Registered symptoms: ${newSymptom}. BP recorded: ${newBP || 'N/A'}. Weight: ${newWeight || 'N/A'}.`,
          metrics: { bp: newBP || undefined, weight: newWeight || undefined }
        };
        dbCopy[matchIdx].records.unshift(customRecord);
        localStorage.setItem('birthroots_patients', JSON.stringify(dbCopy));
        setPatientDatabase(dbCopy);
        onLoginSuccess(dbCopy[matchIdx]); // refresh active
      }
    }

    setNewSymptom('');
    setNewWeight('');
    setNewBP('');
  };

  const faqPrompts = [
    { q: "What should I eat during IVF stimulation?", a: "Dr. Shruthi Goli recommends a high-protein, antioxidant-rich Mediterranean diet. Focus on eggs, lentils, leafy greens, avocados, berries, and nuts. Stay hydrated with plenty of water and tender coconut water, while avoiding processed sugars." },
    { q: "Is mild cramping normal after egg retrieval?", a: "Yes, mild pelvic cramping and light bloating are common for 2-3 days following follicle retrieval as the ovaries recover. Rest, use a warm compress, and take prescribed mild analgesics. If severe pain, high fever, or heavy bleeding occurs, please contact the Birthroots helpline immediately." },
    { q: "When are anomalies scans recommended?", a: "The TIFFA (Targeted Imaging for Fetal Anomalies) ultrasound scan is crucial and is highly recommended between 18 to 22 weeks of pregnancy. It assesses the baby's growth, organ systems, and developmental landmarks in deep detail." },
    { q: "What is the vaccination schedule for toddlers?", a: "Dr. Rahul Goli suggests following the standard immunization chart. Important boosters occur at 15-18 months (MMR, Varicella, DTaP booster) and another round at 4-6 years (Polio, MMR, DTaP, Typhoid). Keep tracking milestones in your physical wellness booklet." }
  ];

  const handleAskBot = (questionText: string) => {
    const userMsg = { sender: 'user' as const, text: questionText };
    const matchedFaq = faqPrompts.find((f) => f.q.toLowerCase().includes(questionText.toLowerCase()) || questionText.toLowerCase().includes(f.q.toLowerCase()));
    
    let botReplyText = "Thanks for asking! Dr. Shruthi Goli recommends scheduling a quick appointment to evaluate physical parameters precisely. Let us know if you need help with IVF dates or maternity check schedules!";
    if (matchedFaq) {
      botReplyText = matchedFaq.a;
    }

    setChatMessages((prev) => [...prev, userMsg]);
    
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: 'ai', text: botReplyText }]);
    }, 600);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion) return;
    handleAskBot(customQuestion);
    setCustomQuestion('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="patient-dashboard-root">
      
      {/* 1. Login Gate (If not logged in) */}
      {!loggedInPatient ? (
        <div className="max-w-md mx-auto py-12" id="dashboard-login-gate">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm space-y-6 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-brand-secondary flex items-center justify-center mx-auto">
              <User className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h1 className="font-display font-bold text-xl text-slate-800">Secure Patient Portal</h1>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Log in to view your medical timeline, booked queues, scan records, and diagnostic reports securely.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400">+91</span>
                  <input
                    type="tel"
                    required
                    placeholder="Enter registered mobile number"
                    value={phoneInput}
                    onChange={(e) => {
                      setPhoneInput(e.target.value);
                      setLoginError('');
                    }}
                    className="w-full pl-12 pr-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary bg-slate-50 text-slate-700"
                  />
                </div>
                {loginError && <p className="text-[10px] text-brand-accent font-semibold leading-normal">{loginError}</p>}
              </div>

              <button
                type="submit"
                id="btn-dash-login"
                className="w-full py-3.5 rounded-xl bg-brand-secondary hover:bg-teal-700 text-white font-display font-bold text-xs shadow-sm shadow-teal-50 hover:shadow-teal-100 transition-all cursor-pointer"
              >
                Access Dashboard
              </button>
            </form>

            <div className="h-px bg-slate-100" />

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                <span>Quick Test Guide:</span>
              </p>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                To experience a pre-loaded IVF progress pipeline with custom ultrasound reports, use the demonstration number:
              </p>
              <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200">
                <code className="text-xs font-mono font-bold text-slate-800">9876543210</code>
                <button
                  type="button"
                  onClick={() => setPhoneInput('9876543210')}
                  className="text-[10px] font-bold text-brand-secondary hover:underline"
                >
                  Fill Number
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      ) : (
        
        // 2. Active Dashboard Workspace
        <div className="space-y-8" id="dashboard-workspace">
          
          {/* Welcome ribbon */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-secondary to-teal-500 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                {loggedInPatient.patientName.charAt(0)}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-secondary tracking-widest block">Welcome Back</span>
                <h1 className="font-display font-bold text-xl text-slate-800 leading-tight">
                  {loggedInPatient.patientName}
                </h1>
                <div className="flex items-center space-x-3 text-xs text-slate-400 font-medium mt-0.5">
                  <span>Age: {loggedInPatient.age} Yrs</span>
                  <span>|</span>
                  <span>ID: {loggedInPatient.id}</span>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onLogout}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <span>Logout Session</span>
              </button>
            </div>

          </div>

          {/* Sub Navigation tabs */}
          <div className="flex overflow-x-auto pb-1 gap-2" id="dashboard-internal-navbar">
            {[
              { id: 'overview', label: 'Overview', icon: ClipboardList },
              ...(loggedInPatient.ivfTimeline ? [{ id: 'timeline', label: 'IVF Timeline', icon: Baby }] : []),
              { id: 'records', label: 'Medical Folders', icon: FileText },
              { id: 'diary', label: 'Self-Report Logs', icon: PlusCircle },
              { id: 'ai', label: 'Birthroots AI Helper', icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = dashTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setDashTab(tab.id as any)}
                  className={`flex items-center space-x-1.5 px-4.5 py-2.5 rounded-xl font-display font-semibold text-xs whitespace-nowrap transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-brand-secondary text-white shadow-sm' 
                      : 'bg-white border border-slate-100 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            
            {/* TAB A: Overview Panel */}
            {dashTab === 'overview' && (
              <motion.div
                key="overview-pane"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Active queue card */}
                <div className="lg:col-span-6 space-y-6">
                  
                  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
                    <h2 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center space-x-2">
                      <Calendar className="w-4.5 h-4.5 text-brand-secondary" />
                      <span>Your Booked Queue Status</span>
                    </h2>

                    {userAppointments.length === 0 ? (
                      <div className="text-center py-6 space-y-2 text-slate-400">
                        <p className="text-xs">No active booked queue scheduled.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {userAppointments.map((app) => (
                          <div key={app.id} className="bg-teal-50/40 p-4 rounded-2xl border border-teal-100/40 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[10px] font-bold text-brand-secondary uppercase">{app.department}</span>
                                <h3 className="font-bold text-slate-700 text-xs mt-0.5">{app.doctorName}</h3>
                              </div>
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase">
                                Scheduled
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-[11px] text-slate-500 font-mono">
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{app.date}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{app.timeSlot}</span>
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded-lg border border-slate-100">
                              &ldquo;{app.reason}&rdquo;
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Physical metrics slip */}
                  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
                    <h2 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">
                      Recent Vitals Logged
                    </h2>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-slate-50 p-3.5 rounded-xl text-center">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Blood Pressure</span>
                        <p className="font-display font-extrabold text-base text-slate-700 mt-1">118/76</p>
                        <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">Optimal</span>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-xl text-center">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Weight Tracking</span>
                        <p className="font-display font-extrabold text-base text-slate-700 mt-1">62.2 kg</p>
                        <span className="text-[9px] text-slate-500 block mt-0.5">Checked June 25</span>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-xl text-center">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Hemoglobin</span>
                        <p className="font-display font-extrabold text-base text-slate-700 mt-1">12.4 g/dl</p>
                        <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">Healthy</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* IVF Timeline snapshot */}
                <div className="lg:col-span-6 space-y-6">
                  {loggedInPatient.ivfTimeline ? (
                    <div className="bg-gradient-to-br from-rose-50/70 to-white border border-rose-100/50 p-6 rounded-3xl shadow-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <h2 className="font-display font-bold text-sm text-brand-accent uppercase tracking-wider flex items-center space-x-2">
                          <Baby className="w-4.5 h-4.5 animate-heartbeat text-brand-accent" />
                          <span>Active IVF Timeline Stage</span>
                        </h2>
                        <button
                          onClick={() => setDashTab('timeline')}
                          className="text-[10px] font-bold text-brand-accent hover:underline"
                        >
                          View Full Timeline
                        </button>
                      </div>

                      {/* Active step highlight */}
                      {loggedInPatient.ivfTimeline.filter((s) => s.status === 'Active').map((step) => (
                        <div key={step.stage} className="bg-white p-4 rounded-2xl border border-rose-100/30 shadow-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-display font-bold text-sm text-slate-800">{step.stage}</span>
                            <span className="text-[9px] font-bold bg-rose-100 text-brand-accent px-2 py-0.5 rounded-full uppercase animate-pulse">
                              Active Stage
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-sans">{step.description}</p>
                          {step.notes && (
                            <div className="p-2.5 bg-rose-50/40 rounded-lg border border-rose-100/20 text-[10px] text-slate-500 italic">
                              Clinical note: {step.notes}
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Mini checklist progress bar */}
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                          <span>IVF Milestones</span>
                          <span>4 of 7 completed</span>
                        </div>
                        <div className="w-full h-1.5 bg-rose-100/50 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-accent rounded-full" style={{ width: '57%' }} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
                      <h2 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">
                        Patient Information Pack
                      </h2>
                      <div className="p-4 bg-teal-50/30 rounded-2xl border border-teal-100/30 space-y-2 text-slate-700 text-xs">
                        <p className="font-semibold text-teal-800">General Patient File Profile</p>
                        <p className="leading-relaxed font-sans text-slate-600">
                          Your records indicate a general outpatient consultation file with Dr. Rahul Goli or Dr. Shruthi Goli. Book more slots or self-report physical vitals in the logs tab.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Simple tips slider */}
                  <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-2xl">
                    <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider">Maternity & Pediatric Care Tip:</p>
                    <p className="text-xs text-slate-600 font-sans mt-1 leading-normal italic">
                      &ldquo;Regular fetal growth monitoring checks help ensure maternal safety and prevent labor risks. Track your milestones meticulously!&rdquo; — Dr. Shruthi Goli
                    </p>
                  </div>

                </div>

              </motion.div>
            )}

            {/* TAB B: Detailed IVF Stage Timeline progress */}
            {dashTab === 'timeline' && loggedInPatient.ivfTimeline && (
              <motion.div
                key="timeline-pane"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm space-y-8"
              >
                <div className="space-y-1">
                  <h2 className="font-display font-bold text-lg text-slate-800 flex items-center space-x-2">
                    <Baby className="w-5.5 h-5.5 text-brand-accent" />
                    <span>Your Comprehensive IVF Pathway Tracker</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-sans">
                    Detailed clinical tracking of your current In Vitro Fertilization treatment program under Dr. Shruthi Goli.
                  </p>
                </div>

                {/* Vertical Timeline list */}
                <div className="relative pl-6 border-l border-slate-150 space-y-8 ml-3" id="vertical-timeline-steps">
                  {loggedInPatient.ivfTimeline.map((step, idx) => {
                    const isCompleted = step.status === 'Completed';
                    const isActive = step.status === 'Active';
                    const isUpcoming = step.status === 'Upcoming';
                    
                    return (
                      <div key={step.stage} className="relative group" id={`timeline-step-${idx}`}>
                        
                        {/* Bullet indicators */}
                        <div className={`absolute -left-[35px] top-0.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isCompleted ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs' :
                          isActive ? 'bg-brand-accent border-brand-accent text-white scale-110 shadow-md ring-4 ring-rose-100' :
                          'bg-white border-slate-200 text-slate-300'
                        }`}>
                          {isCompleted && <CheckCircle className="w-3 h-3 fill-current text-emerald-500 bg-white rounded-full" />}
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <h3 className={`font-display font-bold text-sm ${
                              isActive ? 'text-brand-accent' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                            }`}>{step.stage}</h3>
                            <span className="font-mono text-[10px] text-slate-400 font-bold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md self-start sm:self-center">
                              Target: {step.date}
                            </span>
                          </div>
                          
                          <p className={`text-xs ${isUpcoming ? 'text-slate-400' : 'text-slate-600'} font-sans max-w-2xl`}>
                            {step.description}
                          </p>

                          {step.notes && (
                            <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100/20 text-[10px] text-slate-500 italic font-sans">
                              {step.notes}
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>

              </motion.div>
            )}

            {/* TAB C: Medical Folders & Records Slip View */}
            {dashTab === 'records' && (
              <motion.div
                key="records-pane"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                
                <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
                  <div className="space-y-1">
                    <h2 className="font-display font-bold text-base text-slate-800">Your Medical Records Safe Folder</h2>
                    <p className="text-xs text-slate-500">Click on any document to retrieve the clinical slip copy.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {loggedInPatient.records.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => setSelectedReport(rec)}
                        id={`btn-view-record-${rec.id}`}
                        className="bg-slate-50 hover:bg-white border border-slate-100 hover:border-brand-accent/30 p-4 rounded-2xl cursor-pointer transition-all flex justify-between items-center group"
                      >
                        <div className="flex items-center space-x-3.5">
                          <div className={`p-2.5 rounded-xl ${
                            rec.type === 'Scan' ? 'bg-indigo-50 text-indigo-600' :
                            rec.type === 'Lab Report' ? 'bg-teal-50 text-teal-600' :
                            rec.type === 'Prescription' ? 'bg-amber-50 text-amber-600' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{rec.type}</span>
                            <h3 className="font-display font-bold text-xs text-slate-700 mt-0.5 group-hover:text-brand-accent transition-colors">
                              {rec.title}
                            </h3>
                            <p className="text-[10px] text-slate-400 mt-0.5">{rec.date} | {rec.doctorName}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated diagnostic reports modal or overlay detail slips */}
                <AnimatePresence>
                  {selectedReport && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="bg-linear-to-b from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 text-white space-y-6"
                      id="report-detail-slip"
                    >
                      <div className="flex justify-between items-start border-b border-slate-700/60 pb-4">
                        <div>
                          <span className="text-[9px] font-mono bg-brand-accent/20 text-brand-accent border border-brand-accent/30 px-2.5 py-1 rounded-md uppercase font-bold">
                            {selectedReport.type} Record
                          </span>
                          <h3 className="font-display font-bold text-lg text-white mt-2">{selectedReport.title}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">Physician: {selectedReport.doctorName} | Date: {selectedReport.date}</p>
                        </div>
                        <button
                          onClick={() => setSelectedReport(null)}
                          className="px-3 py-1 bg-white/10 hover:bg-white/20 text-xs rounded-lg transition-colors cursor-pointer"
                        >
                          Close Slip
                        </button>
                      </div>

                      <div className="space-y-4">
                        
                        {/* Vitals metrics box */}
                        {selectedReport.metrics && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                            {selectedReport.metrics.bp && (
                              <div>
                                <span className="text-[9px] text-slate-400 uppercase font-bold">BP Vitals</span>
                                <p className="font-mono font-bold text-sm text-white">{selectedReport.metrics.bp}</p>
                              </div>
                            )}
                            {selectedReport.metrics.weight && (
                              <div>
                                <span className="text-[9px] text-slate-400 uppercase font-bold">Body Weight</span>
                                <p className="font-mono font-bold text-sm text-white">{selectedReport.metrics.weight}</p>
                              </div>
                            )}
                            {selectedReport.metrics.hbLevel && (
                              <div>
                                <span className="text-[9px] text-slate-400 uppercase font-bold">Hb level</span>
                                <p className="font-mono font-bold text-sm text-white">{selectedReport.metrics.hbLevel}</p>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="space-y-1.5">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clinical Notes:</h4>
                          <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-950 p-4 rounded-xl border border-slate-800">
                            {selectedReport.notes}
                          </p>
                        </div>

                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}

            {/* TAB D: Symptom Diary & self-report logger */}
            {dashTab === 'diary' && (
              <motion.div
                key="diary-pane"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Form to add logs */}
                <div className="lg:col-span-5">
                  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
                    <div className="space-y-1">
                      <h2 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">Log Physical Symptoms</h2>
                      <p className="text-xs text-slate-400">Record cramps, weight, or other patterns to share with Dr. Shruthi Goli.</p>
                    </div>

                    <form onSubmit={handleLogSymptom} className="space-y-4">
                      
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Describe Symptom / Log note *</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="E.g., Mild abdominal cramps, took routine supplements. Feel healthy otherwise."
                          value={newSymptom}
                          onChange={(e) => setNewSymptom(e.target.value)}
                          className="px-4.5 py-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-secondary bg-slate-50"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Weight (kg)</label>
                          <input
                            type="text"
                            placeholder="62"
                            value={newWeight}
                            onChange={(e) => setNewWeight(e.target.value)}
                            className="px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-secondary bg-slate-50"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Blood Pressure</label>
                          <input
                            type="text"
                            placeholder="120/80"
                            value={newBP}
                            onChange={(e) => setNewBP(e.target.value)}
                            className="px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-secondary bg-slate-50"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        id="btn-symptom-submit"
                        className="w-full py-3 rounded-xl bg-brand-secondary hover:bg-teal-700 text-white font-display font-bold text-xs shadow-xs transition-all cursor-pointer"
                      >
                        Append Log to History File
                      </button>

                    </form>
                  </div>
                </div>

                {/* History timeline list */}
                <div className="lg:col-span-7">
                  <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
                    <h2 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">Historical Logs</h2>
                    
                    {symptomLogs.length === 0 ? (
                      <div className="text-center py-10 space-y-2 text-slate-400">
                        <AlertCircle className="w-8 h-8 mx-auto text-slate-300" />
                        <p className="text-xs">No self-logged symptoms entered in this session.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {symptomLogs.map((log, idx) => (
                          <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                            <div className="flex justify-between text-slate-400">
                              <span className="font-bold">Patient Self-Entry</span>
                              <span className="font-mono">{log.date}</span>
                            </div>
                            <p className="text-slate-700 leading-relaxed font-sans italic">&ldquo;{log.symptom}&rdquo;</p>
                            
                            {(log.weight || log.bp) && (
                              <div className="flex space-x-4 pt-1.5 text-[10px] text-slate-500 font-mono font-bold">
                                {log.weight && <span>Weight: {log.weight} kg</span>}
                                {log.bp && <span>BP: {log.bp}</span>}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB E: Expert chat guidelines ("Birthroots AI Helper") */}
            {dashTab === 'ai' && (
              <motion.div
                key="ai-pane"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-100 rounded-3xl shadow-sm grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
              >
                
                {/* FAQ selector column */}
                <div className="lg:col-span-4 bg-slate-50 p-6 border-r border-slate-100 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xs text-slate-500 uppercase tracking-wider">Dr. Shruthi Goli's Guide Book</h3>
                    <p className="text-[11px] text-slate-400">Tap standard patient questions for immediate clinical recommendations:</p>
                  </div>

                  <div className="space-y-2.5">
                    {faqPrompts.map((faq) => (
                      <button
                        key={faq.q}
                        onClick={() => handleAskBot(faq.q)}
                        id={`btn-faq-ask-${faq.q.substring(0, 15).replace(/\s/g, '-')}`}
                        className="w-full p-3 rounded-xl bg-white border border-slate-150 hover:border-teal-600/40 text-left text-xs font-medium text-slate-700 hover:text-teal-600 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span className="truncate pr-2">{faq.q}</span>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat screen conversation panel */}
                <div className="lg:col-span-8 p-6 flex flex-col justify-between h-[420px]" id="chat-conversation-container">
                  
                  {/* Messages stream */}
                  <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4 scrollbar">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === 'user' 
                            ? 'bg-teal-600 text-white rounded-br-none' 
                            : 'bg-slate-100 text-slate-700 rounded-bl-none border border-slate-200/50'
                        }`}>
                          <p className="font-sans whitespace-pre-line">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input field form */}
                  <form onSubmit={handleCustomSend} className="flex gap-2.5">
                    <input
                      type="text"
                      placeholder="Ask another health question..."
                      value={customQuestion}
                      onChange={(e) => setCustomQuestion(e.target.value)}
                      className="flex-1 px-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 bg-slate-50"
                    />
                    <button
                      type="submit"
                      id="btn-chat-send"
                      className="p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>

                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>
      )}

    </div>
  );
}
