import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Sparkles, CheckCircle2, Ticket, ShieldCheck, Phone, ArrowLeft, ArrowRight, Baby } from 'lucide-react';
import { DOCTORS, TIME_SLOTS } from '../data/mockData';
import { Appointment } from '../types';

interface AppointmentSectionProps {
  onBookingSuccess: (appointment: Appointment) => void;
}

export default function AppointmentSection({ onBookingSuccess }: AppointmentSectionProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Info, 2: OTP simulation, 3: Success Ticket
  
  // Form fields
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientAge, setPatientAge] = useState<number>(30);
  const [selectedDoctorId, setSelectedDoctorId] = useState(DOCTORS[0].id);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [reason, setReason] = useState('');
  const [isIVFSpecial, setIsIVFSpecial] = useState(false);

  // OTP Simulation states
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('');

  // Final booked receipt state
  const [bookedReceipt, setBookedReceipt] = useState<Appointment | null>(null);

  const selectedDoc = DOCTORS.find((d) => d.id === selectedDoctorId) || DOCTORS[0];

  // Minimum date limit - patient can book from tomorrow up to 30 days in future
  const getMinDateString = () => {
    const tomorrow = new Date('2026-06-29'); // Current mock date is 2026-06-28
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDateString = () => {
    const future = new Date('2026-06-29');
    future.setDate(future.getDate() + 30);
    return future.toISOString().split('T')[0];
  };

  const handleTriggerOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone || !selectedDate || !reason) return;

    // Generate a cute random 4-digit OTP code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setSimulatedOtp(code);
    setOtpSent(true);
    setStep(2);
    
    // Log code to console for debugging/preview and alert simulation
    console.log(`[Birthroots SMS Gateway] Simulated SMS OTP for ${patientPhone}: ${code}`);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput === simulatedOtp || otpInput === '1234') { // Allow 1234 as easy bypass
      // Create new Appointment record
      const appointmentRef = "BR-" + Math.floor(100000 + Math.random() * 900000);
      const newAppointment: Appointment = {
        id: appointmentRef,
        patientName,
        patientPhone,
        patientEmail: patientEmail || undefined,
        patientAge: Number(patientAge),
        doctorName: selectedDoc.name,
        department: selectedDoc.id === 'dr-shruthi-goli' ? 'Maternity & IVF' : 'Pediatrics',
        date: selectedDate,
        timeSlot: selectedSlot,
        reason,
        status: 'Scheduled',
        createdAt: new Date('2026-06-28T13:02:39-07:00').toISOString(),
        isIVFSpecial
      };

      // Save to local storage appointment database
      const existingAppRaw = localStorage.getItem('birthroots_appointments');
      const currentList = existingAppRaw ? JSON.parse(existingAppRaw) : [];
      currentList.push(newAppointment);
      localStorage.setItem('birthroots_appointments', JSON.stringify(currentList));

      // Check if user has a profile in local storage, if not, automatically create/update a simulated account for them!
      // This is extremely user-friendly and allows them to see their history immediately.
      const existingPatientsRaw = localStorage.getItem('birthroots_patients');
      let patients = existingPatientsRaw ? JSON.parse(existingPatientsRaw) : [];
      
      const existingPatientIdx = patients.findIndex((p: any) => p.patientPhone === patientPhone);
      if (existingPatientIdx === -1) {
        // Create new patient record
        const newPatient = {
          id: "P-" + Math.floor(1000 + Math.random() * 9000),
          patientName,
          patientPhone,
          age: Number(patientAge),
          gender: selectedDoc.id === 'dr-shruthi-goli' ? 'Female' : 'Male',
          bloodGroup: 'B+',
          records: [
            {
              id: "rec-gen-01",
              date: selectedDate,
              type: "Consultation",
              title: `Initial Appointment - ${newAppointment.department}`,
              doctorName: selectedDoc.name,
              notes: `Reason for Visit: ${reason}. Automated check-in created upon appointment schedule.`
            }
          ]
        };
        patients.push(newPatient);
        localStorage.setItem('birthroots_patients', JSON.stringify(patients));
      } else {
        // Patient exists, append appointment to consultation history
        patients[existingPatientIdx].records.push({
          id: "rec-gen-" + Math.floor(Math.random() * 1000),
          date: selectedDate,
          type: "Consultation",
          title: `Booked Consultation: ${newAppointment.department}`,
          doctorName: selectedDoc.name,
          notes: `Reason: ${reason}`
        });
        localStorage.setItem('birthroots_patients', JSON.stringify(patients));
      }

      setBookedReceipt(newAppointment);
      setStep(3);
      onBookingSuccess(newAppointment);
    } else {
      setOtpError("Invalid verification code. Please check or try code '1234' for quick testing.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="appointment-booking-main">
      
      {/* Visual Stepper */}
      <div className="flex items-center justify-center space-x-4 mb-10 max-w-md mx-auto" id="booking-stepper">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
            step >= 1 ? 'bg-brand-accent text-white' : 'bg-slate-100 text-slate-400'
          }`}>1</div>
          <span className="text-xs font-semibold text-slate-700">Details</span>
        </div>
        <div className="h-px w-12 bg-slate-200" />
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
            step >= 2 ? 'bg-brand-accent text-white' : 'bg-slate-100 text-slate-400'
          }`}>2</div>
          <span className="text-xs font-semibold text-slate-500">Verify</span>
        </div>
        <div className="h-px w-12 bg-slate-200" />
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
            step >= 3 ? 'bg-brand-secondary text-white' : 'bg-slate-100 text-slate-400'
          }`}>3</div>
          <span className="text-xs font-semibold text-slate-500">Ticket</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: Registration Form */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-slate-100 p-6 sm:p-10 rounded-3xl shadow-sm space-y-8"
          >
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="font-display font-bold text-2xl text-slate-900 flex items-center justify-center sm:justify-start space-x-2">
                <Sparkles className="w-5.5 h-5.5 text-brand-accent" />
                <span>Book a Hospital Consultation</span>
              </h1>
              <p className="text-xs text-slate-500 font-sans">
                Schedule a priority slot with Dr. Shruthi Goli or our senior consultants. It takes only 2 minutes.
              </p>
            </div>

            <form onSubmit={handleTriggerOTP} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Patient Name */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="px-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent bg-slate-50/50 text-slate-700 font-sans"
                  />
                </div>

                {/* Patient Phone */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Mobile Phone Number *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400">+91</span>
                    <input
                      type="tel"
                      required
                      pattern="[6-9][0-9]{9}"
                      placeholder="9XXXXXXXXX"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent bg-slate-50/50 text-slate-700 font-sans"
                    />
                  </div>
                </div>

                {/* Patient Age */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Patient Age *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="110"
                    value={patientAge}
                    onChange={(e) => setPatientAge(Number(e.target.value))}
                    className="px-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent bg-slate-50/50 text-slate-700 font-sans"
                  />
                </div>

                {/* Email (Optional) */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="care@example.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="px-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent bg-slate-50/50 text-slate-700 font-sans"
                  />
                </div>

              </div>

              <div className="h-px bg-slate-100" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Doctor Selection */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Select Specialist Doctor *</label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="px-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent bg-slate-50/50 text-slate-700 font-sans"
                  >
                    {DOCTORS.map((d) => (
                      <option key={d.id} value={d.id}>{d.name} ({d.designation})</option>
                    ))}
                  </select>
                </div>

                {/* IVF Special checkbox */}
                {selectedDoctorId === 'dr-shruthi-goli' && (
                  <div className="flex items-center space-x-3 bg-rose-50/50 border border-rose-100 p-4 rounded-xl">
                    <input
                      type="checkbox"
                      id="checkbox-ivf"
                      checked={isIVFSpecial}
                      onChange={(e) => setIsIVFSpecial(e.target.checked)}
                      className="w-4 h-4 text-brand-accent border-slate-300 rounded focus:ring-brand-accent"
                    />
                    <label htmlFor="checkbox-ivf" className="text-xs font-semibold text-slate-700 cursor-pointer flex items-center space-x-1.5 select-none">
                      <Baby className="w-4.5 h-4.5 text-brand-accent animate-heartbeat" />
                      <span>This is a Fertility / IVF Consultation</span>
                    </label>
                  </div>
                )}

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Appointment Date */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Preferred Date *</label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={getMinDateString()}
                      max={getMaxDateString()}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent bg-slate-50/50 text-slate-700 font-sans"
                    />
                  </div>
                </div>

                {/* Timeslot Selection */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Preferred Timeslot *</label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="px-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent bg-slate-50/50 text-slate-700 font-sans"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Consultation Reason */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Brief Reason for Visit / Symptoms *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your symptoms or reason for consulting the doctor..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="px-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent bg-slate-50/50 text-slate-700 font-sans"
                />
              </div>

              {/* Terms and conditions notice */}
              <div className="flex items-start space-x-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-[10px] text-slate-500 leading-normal">
                  Your details are secured under hospital patient confidentiality standards. A verification code will be sent to confirm your active contact.
                </p>
              </div>

              <button
                type="submit"
                id="btn-trigger-otp"
                className="w-full py-4 rounded-2xl bg-brand-accent hover:bg-rose-600 text-white font-display font-bold text-sm shadow-md shadow-rose-100 hover:shadow-rose-200 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Request Verification Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          </motion.div>
        )}

        {/* STEP 2: SMS Verification Simulation (OTP screen) */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm max-w-md mx-auto space-y-6 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-brand-accent flex items-center justify-center mx-auto animate-pulse">
              <Phone className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h2 className="font-display font-bold text-lg text-slate-800">Phone Verification Code</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                We have simulated sending a 4-digit code to <span className="font-semibold text-slate-700">+91 {patientPhone}</span>.
              </p>
            </div>

            {/* OTP helper box */}
            <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl">
              <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">SMS Gateway Simulation:</p>
              <p className="text-xs font-mono font-extrabold text-slate-700 mt-0.5">Your Verification OTP Code is: {simulatedOtp}</p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="flex flex-col space-y-1.5 items-center">
                <input
                  type="text"
                  required
                  maxLength={4}
                  placeholder="Enter 4-digit OTP"
                  value={otpInput}
                  onChange={(e) => {
                    setOtpInput(e.target.value.replace(/\D/g, ''));
                    setOtpError('');
                  }}
                  className="px-4 py-3 text-center tracking-widest font-mono text-lg font-bold w-40 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-accent bg-slate-50"
                />
                {otpError && <p className="text-[10px] text-brand-accent font-semibold">{otpError}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  id="btn-verify-submit"
                  className="flex-1 py-3 bg-brand-accent hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Verify & Confirm
                </button>
              </div>
            </form>

            <button
              onClick={() => {
                const code = Math.floor(1000 + Math.random() * 9000).toString();
                setSimulatedOtp(code);
                console.log(`[Birthroots SMS Gateway] Resent Simulated SMS OTP: ${code}`);
              }}
              className="text-[10px] font-bold text-brand-secondary hover:underline cursor-pointer"
            >
              Didn't receive SMS? Resend verification code
            </button>
          </motion.div>
        )}

        {/* STEP 3: Success Ticket Receipt */}
        {step === 3 && bookedReceipt && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-100 rounded-3xl shadow-md overflow-hidden max-w-lg mx-auto"
          >
            
            {/* Header banner */}
            <div className="bg-gradient-to-r from-brand-secondary to-teal-600 p-6 text-white text-center space-y-2 relative">
              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 text-white">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-teal-100">Appointment Confirmed</p>
              <h2 className="font-display font-bold text-xl leading-none">Birthroots IVF Hospital</h2>
              <p className="text-xs text-teal-500 font-semibold leading-none">డా॥ శృతి గోలి హాస్పిటల్</p>
            </div>

            {/* Ticket body */}
            <div className="p-6 sm:p-8 space-y-6 relative bg-linear-to-b from-white to-slate-50/50">
              
              {/* Cute ticket zig-zag cut representation */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-slate-50 rounded-r-full border-r border-slate-100" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-slate-50 rounded-l-full border-l border-slate-100" />

              <div className="text-center space-y-1 bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Booking Reference</span>
                <p className="font-mono font-extrabold text-base text-slate-800 tracking-wide">{bookedReceipt.id}</p>
                <div className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Priority Queue Secured</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-xs font-sans">
                
                <div>
                  <span className="text-slate-400 block font-medium">Patient Name:</span>
                  <span className="font-bold text-slate-700">{bookedReceipt.patientName}</span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Contact Phone:</span>
                  <span className="font-mono font-bold text-slate-700">+91 {bookedReceipt.patientPhone}</span>
                </div>

                <div className="h-px col-span-2 bg-slate-100" />

                <div>
                  <span className="text-slate-400 block font-medium">Consulting Doctor:</span>
                  <span className="font-bold text-brand-accent">{bookedReceipt.doctorName}</span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Department:</span>
                  <span className="font-bold text-slate-700">{bookedReceipt.department}</span>
                </div>

                <div className="h-px col-span-2 bg-slate-100" />

                <div>
                  <span className="text-slate-400 block font-medium">Date Scheduled:</span>
                  <span className="font-bold text-slate-700 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{bookedReceipt.date}</span>
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Allocated Time:</span>
                  <span className="font-bold text-slate-700 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{bookedReceipt.timeSlot}</span>
                  </span>
                </div>

              </div>

              <div className="h-px bg-slate-100" />

              <div className="space-y-1.5 text-xs text-slate-600 bg-amber-50/40 p-4 rounded-xl border border-amber-100/30">
                <span className="font-bold text-amber-800 text-[10px] uppercase">Pre-arrival Instructions:</span>
                <p className="leading-relaxed text-[11px]">
                  Please arrive 15 minutes before your slot for clinical baseline vitals recording (BP, Weight). If this is an IVF or pregnancy consultation, kindly bring all your past medical booklets and ultrasound scans.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    // Reset to step 1 to let them book again if they want
                    setPatientName('');
                    setPatientPhone('');
                    setPatientEmail('');
                    setReason('');
                    setStep(1);
                  }}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Book Another Slot
                </button>
              </div>

            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
