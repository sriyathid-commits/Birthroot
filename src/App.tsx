import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Clock, MapPin, Heart, AlertCircle, Baby, CheckCircle2, ChevronRight, MessageSquareCode, Sparkles } from 'lucide-react';

import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import ServicesSection from './components/ServicesSection';
import AppointmentSection from './components/AppointmentSection';
import DashboardSection from './components/DashboardSection';

import { HOSPITAL_INFO, INITIAL_PATIENTS } from './data/mockData';
import { PatientHistory, Appointment } from './types';

export default function App() {
  const [currentTab, setTab] = useState<string>('home');
  const [loggedInPatient, setLoggedInPatient] = useState<PatientHistory | null>(null);
  
  // Controls simulated login modal activation
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginPhone, setLoginPhone] = useState('');
  const [loginError, setLoginError] = useState('');

  // Emergency widget overlay toggle
  const [emergencyOpen, setEmergencyOpen] = useState(true);

  // Load initial simulated logged-in user to make testing frictionless if preferred
  useEffect(() => {
    // Check if patient was already active in session
    const activeRaw = localStorage.getItem('birthroots_active_session');
    if (activeRaw) {
      setLoggedInPatient(JSON.parse(activeRaw));
    }
  }, []);

  const handleLoginSuccess = (patient: PatientHistory) => {
    setLoggedInPatient(patient);
    localStorage.setItem('birthroots_active_session', JSON.stringify(patient));
    setIsLoginOpen(false);
    setLoginPhone('');
    setLoginError('');
    // Automatically switch to dashboard tab
    setTab('dashboard');
  };

  const handleLogout = () => {
    setLoggedInPatient(null);
    localStorage.removeItem('birthroots_active_session');
    setTab('home');
  };

  const handleModalLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone) return;

    // Fetch synchronized patient catalog
    const savedPatientsRaw = localStorage.getItem('birthroots_patients');
    const db = savedPatientsRaw ? JSON.parse(savedPatientsRaw) : INITIAL_PATIENTS;

    const match = db.find((p: PatientHistory) => p.patientPhone === loginPhone);
    if (match) {
      handleLoginSuccess(match);
    } else {
      setLoginError("No record found. Try demonstration number: 9876543210");
    }
  };

  const handleBookingSuccess = (newApp: Appointment) => {
    // If the booked patient matches a registered telephone, refresh session
    const savedPatientsRaw = localStorage.getItem('birthroots_patients');
    if (savedPatientsRaw) {
      const db = JSON.parse(savedPatientsRaw);
      const match = db.find((p: PatientHistory) => p.patientPhone === newApp.patientPhone);
      if (match) {
        setLoggedInPatient(match);
        localStorage.setItem('birthroots_active_session', JSON.stringify(match));
      }
    }
    // Stay on booking ticket view first, let booking component present the ticket
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-600 text-slate-800" id="main-application-frame">
      
      {/* 1. Header Navigation bar */}
      <Navbar 
        currentTab={currentTab} 
        setTab={setTab} 
        loggedInPatient={loggedInPatient}
        onLogout={handleLogout}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* 2. Primary Layout workspace with animated transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="w-full"
            id={`main-content-${currentTab}`}
          >
            {currentTab === 'home' && (
              <HomeSection 
                setTab={setTab} 
                onOpenConsultation={() => setTab('booking')}
              />
            )}

            {currentTab === 'services' && (
              <ServicesSection />
            )}

            {currentTab === 'booking' && (
              <AppointmentSection 
                onBookingSuccess={handleBookingSuccess}
              />
            )}

            {currentTab === 'dashboard' && (
              <DashboardSection 
                loggedInPatient={loggedInPatient}
                onLoginSuccess={handleLoginSuccess}
                onLogout={handleLogout}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Site Footer info */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800" id="global-portal-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Logo & address column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3 text-white">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-lg animate-heartbeat">
                <Baby className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base leading-tight">Birthroots IVF & Hospital</h3>
                <span className="text-[10px] text-teal-400 font-semibold leading-none block">డా॥ శృతి గోలి హాస్పిటల్</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Providing modern fertility treatments, gynae laparoscopy, safe maternity packages, and compassionate neonatal pediatric care to Mancherial, Telangana, and surrounding districts.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-slate-500">
              <Heart className="w-4.5 h-4.5 text-teal-600 fill-current shrink-0" />
              <span>Cultivating hope, nurturing life.</span>
            </div>
          </div>

          {/* Contact quicklinks column */}
          <div className="md:col-span-4 space-y-3.5">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Hospital Helpline Details</h4>
            <div className="space-y-2 text-xs font-sans">
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-slate-200">{HOSPITAL_INFO.phone}</p>
                  <p className="text-[10px] text-slate-500">Emergency & Ambulance Call Center</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <p className="leading-relaxed text-[11px]">
                  {HOSPITAL_INFO.address}
                </p>
              </div>
            </div>
          </div>

          {/* Working hours & legal links */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Clinical Timing</h4>
            <div className="space-y-2 text-xs font-sans">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-slate-200">Outpatient Consultation:</p>
                  <p className="text-[11px] text-slate-400">Monday - Saturday: 10:00 AM - 6:00 PM</p>
                  <p className="text-[11px] text-teal-400 font-bold mt-1">24/7 Maternity Emergency</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dr. Shruthi Goli Birthroots Hospital. All rights reserved. Managed under clinical excellence standards.</p>
        </div>
      </footer>

      {/* 4. Global Simulated login modal (from navbar CTAs) */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs" id="login-modal-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-100 shadow-xl space-y-6 text-center relative"
              id="global-login-modal"
            >
              <button
                onClick={() => {
                  setIsLoginOpen(false);
                  setLoginError('');
                }}
                className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-base text-slate-800">Retrieve Patient Portal Access</h3>
                <p className="text-xs text-slate-500 leading-normal font-sans">
                  Enter your mobile number to load active IVF charts, scan report slips, or check-in lists instantly.
                </p>
              </div>

              <form onSubmit={handleModalLoginSubmit} className="space-y-4">
                <div className="flex flex-col space-y-1 text-left">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400">+91</span>
                    <input
                      type="tel"
                      required
                      placeholder="9XXXXXXXXX"
                      value={loginPhone}
                      onChange={(e) => {
                        setLoginPhone(e.target.value);
                        setLoginError('');
                      }}
                      className="w-full pl-12 pr-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 bg-slate-50 text-slate-700 font-sans"
                    />
                  </div>
                  {loginError && <p className="text-[10px] text-teal-600 font-semibold leading-normal mt-1">{loginError}</p>}
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white font-display font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Authenticate
                  </button>
                </div>
              </form>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-left space-y-1.5 text-[11px] font-sans">
                <span className="font-bold text-slate-500 text-[10px] uppercase">Demonstration Accounts:</span>
                <p className="text-slate-600">Type <code className="font-mono font-bold text-slate-800">9876543210</code> to view Anjali Sharma's pre-filled pregnancy ultrasound report slips and active IVF cycle steps.</p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Floating Quick Emergency reassurance widget */}
      <div className="fixed bottom-6 right-6 z-40 max-w-[280px]" id="floating-emergency-widget">
        <AnimatePresence>
          {emergencyOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white border border-teal-100 rounded-2xl p-4 shadow-xl border-t-4 border-t-teal-600 space-y-2.5"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                    <AlertCircle className="w-4.5 h-4.5 animate-pulse" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 font-display">Maternity & Child Helpline</span>
                </div>
                <button
                  onClick={() => setEmergencyOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-[10px] text-slate-500 leading-normal font-sans">
                Our labor suites, neonatal incubators, and surgical pediatric care team operate 24/7. Call for quick dispatch or advice.
              </p>

              <a
                href={`tel:${HOSPITAL_INFO.phone}`}
                className="flex items-center justify-center space-x-1.5 py-2 w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-[10px] font-bold shadow-sm cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span>Call {HOSPITAL_INFO.phone}</span>
              </a>
            </motion.div>
          ) : (
            <button
              onClick={() => setEmergencyOpen(true)}
              className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-100 hover:shadow-teal-200 animate-bounce cursor-pointer"
            >
              <Phone className="w-5 h-5 fill-current" />
            </button>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
