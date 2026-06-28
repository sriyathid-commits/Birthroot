import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartPulse, Menu, X, Baby, Stethoscope, User, LogOut, CalendarRange } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/mockData';

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  loggedInPatient: any;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export default function Navbar({ currentTab, setTab, loggedInPatient, onLogout, onOpenLogin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: HeartPulse },
    { id: 'services', label: 'Our Specialties', icon: Stethoscope },
    { id: 'booking', label: 'Book Appointment', icon: CalendarRange },
    { id: 'dashboard', label: 'Patient Dashboard', icon: User },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => { setTab('home'); setMobileMenuOpen(false); }}
            id="nav-logo-container"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-teal-600 text-white shadow-md shadow-teal-100 transition-all duration-300">
              <Baby className="w-5 h-5 absolute z-10 text-white animate-heartbeat" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-tight leading-none text-slate-800">
                BIRTHROOTS
              </span>
              <span className="text-[10px] text-teal-600 font-bold tracking-widest uppercase mt-0.5">
                Dr. Shruthi Goli
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2" id="desktop-nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  id={`nav-item-${item.id}`}
                  className={`relative flex items-center space-x-1.5 px-4 py-2 rounded-xl font-display font-medium text-[13.5px] tracking-tight transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'text-teal-600 bg-teal-50/80 font-bold' 
                      : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* User Section / Emergency CTA */}
          <div className="hidden md:flex items-center space-x-3" id="desktop-user-section">
            {loggedInPatient ? (
              <div className="flex items-center space-x-3 bg-slate-50 p-1.5 pr-3 rounded-2xl border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                  {loggedInPatient.patientName.charAt(0)}
                </div>
                <div className="flex flex-col max-w-[120px]">
                  <span className="text-xs font-semibold text-slate-700 truncate">{loggedInPatient.patientName}</span>
                  <span className="text-[10px] text-teal-600 font-mono font-bold truncate">{loggedInPatient.id}</span>
                </div>
                <button
                  onClick={onLogout}
                  title="Logout from dashboard"
                  id="btn-nav-logout"
                  className="p-1 hover:bg-teal-50 hover:text-teal-600 rounded-lg text-slate-400 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                id="btn-nav-login"
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-display font-bold text-xs shadow-md shadow-teal-100 transition-all cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Patient Portal</span>
              </button>
            )}

            {/* Quick Emergency CTA in Header as in Design HTML */}
            <a
              href={`tel:${HOSPITAL_INFO.phone}`}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-md shadow-teal-100 flex items-center gap-1.5 transition-all"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              <span>Emergency Hotline</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2" id="mobile-menu-controls">
            {loggedInPatient && (
              <div 
                onClick={() => setTab('dashboard')}
                className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                {loggedInPatient.patientName.charAt(0)}
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="btn-toggle-mobile-menu"
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-50 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-100 bg-white"
            id="mobile-nav-menu"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl font-display font-medium text-base transition-colors ${
                      isActive 
                        ? 'text-teal-600 bg-teal-50' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-slate-200">
                {loggedInPatient ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                          {loggedInPatient.patientName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{loggedInPatient.patientName}</p>
                          <p className="text-xs text-teal-600 font-mono font-bold">ID: {loggedInPatient.id}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="p-2 bg-white border border-slate-100 hover:text-teal-600 rounded-lg text-slate-400 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onOpenLogin();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-display font-semibold transition-all"
                  >
                    <User className="w-5 h-5" />
                    <span>Login Patient Portal</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
