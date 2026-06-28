import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Clock, Star, Heart, Award, ArrowRight, ShieldCheck, CheckCircle2, Navigation, Baby } from 'lucide-react';
import { HOSPITAL_INFO, DOCTORS, SPECIALTIES, INITIAL_REVIEWS, HOSPITAL_PHOTOS } from '../data/mockData';

interface HomeSectionProps {
  setTab: (tab: string) => void;
  onOpenConsultation: () => void;
}

export default function HomeSection({ setTab, onOpenConsultation }: HomeSectionProps) {
  
  const stats = [
    { value: '10+', label: 'Years Experience', icon: Award, color: 'text-teal-600 bg-teal-50' },
    { value: '1,500+', label: 'Happy Families', icon: Heart, color: 'text-teal-600 bg-teal-50' },
    { value: '4.8★', label: '476 Google Reviews', icon: Star, color: 'text-teal-600 bg-teal-50' },
    { value: '24/7', label: 'Emergency Cover', icon: ShieldCheck, color: 'text-teal-600 bg-teal-50' }
  ];

  const handleDirections = () => {
    window.open('https://maps.google.com/?q=' + encodeURIComponent(HOSPITAL_INFO.address), '_blank');
  };

  return (
    <div className="space-y-16 pb-16" id="home-section-container">
      
      {/* 1. Hero Landing Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/50 via-teal-50/30 to-white pt-10 pb-16 md:py-20 px-4 sm:px-6 lg:px-8">
        
        {/* Floating background blobs for a cute, soft maternity-friendly atmosphere */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-teal-100/20 filter blur-3xl animate-soft-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-teal-100/20 filter blur-3xl animate-soft-pulse pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-teal-50/80 border border-teal-100 px-3.5 py-1.5 rounded-full shadow-xs"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
              </span>
              <span className="text-[11px] font-bold text-teal-700 tracking-wider font-sans uppercase">
                Best IVF & Maternity Hospital in Mancherial
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-3.5xl sm:text-4xl md:text-5xl lg:text-[45px] text-slate-900 leading-tight tracking-tight"
            >
              Dr Shruthi Goli Birthroots <br className="hidden sm:inline" />
              <span className="text-teal-600">
                IVF & Maternity
              </span> Hospital
            </motion.h1>

            {/* Telugu text presentation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.2 }}
              className="bg-teal-50/50 inline-block px-4 py-2 rounded-2xl border border-teal-100/60"
            >
              <p className="text-teal-700 font-bold text-sm tracking-wide">
                డాక్టర్ శృతి గోలి బర్త్‌రూట్స్ హాస్పిటల్
              </p>
              <p className="text-[11px] text-slate-500 font-medium leading-normal">
                ఐ.వి.ఎఫ్, సంతానలేమి, లాపరోస్కోపీ, ప్రసూతి మరియు పిల్లల వైద్యశాల
              </p>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed"
            >
              Dr. Shruthi Goli brings 10+ years of clinical excellence in reproductive medicine, laparoscopy, and high-risk maternity care from premier medical institutions in Delhi and Hyderabad. At Birthroots, we couple world-class fertility labs with compassionate care to bring your miracles to life.
            </motion.p>

            {/* Action CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={() => setTab('booking')}
                id="hero-btn-book"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-display font-bold text-sm shadow-lg shadow-teal-100/80 hover:shadow-teal-200/90 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Book Appointment Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setTab('services')}
                id="hero-btn-services"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-display font-bold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Our Specialties</span>
              </button>
            </motion.div>

            {/* Call highlight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start space-x-3 text-slate-500 text-xs pt-4"
            >
              <Phone className="w-4 h-4 text-teal-600 animate-pulse" />
              <span>Direct Emergency Helpline:</span>
              <a href={`tel:${HOSPITAL_INFO.phone}`} className="font-bold text-rose-500 hover:text-rose-600 hover:underline">
                {HOSPITAL_INFO.phone}
              </a>
            </motion.div>

          </div>

          {/* Hero visual / Interactive IVF & baby representation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 relative"
            id="hero-artwork-container"
          >
            <div className="relative mx-auto max-w-[420px] aspect-[4/5] rounded-[2.5rem] bg-gradient-to-tr from-teal-100 to-teal-50/50 border-4 border-white shadow-2xl overflow-hidden group">
              
              {/* Cute abstract illustration representing family & safe birth */}
              <div className="absolute inset-0 bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop" 
                  alt="Mother and cute newborn baby" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Glowing decorative frame */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
              
              {/* Overlay card for statistics */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-3xl shadow-lg border border-white/50 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Highly Rated on Google</h4>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-semibold text-slate-500">4.8 out of 5 stars (476 reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="h-px bg-slate-100" />
                <p className="text-xs text-slate-600 italic">
                  &ldquo;Birthroots made our family complete! Highly expert IVF guidance by Dr. Shruthi Goli.&rdquo;
                </p>
              </div>

            </div>

            {/* Mini cute floaties */}
            <div className="absolute -top-4 -right-4 bg-teal-100 text-teal-800 p-3.5 rounded-2xl shadow-md border-2 border-white text-xs font-bold font-display flex items-center space-x-1.5 animate-bounce">
              <Baby className="w-4 h-4 text-teal-600" />
              <span>IVF Success Rates</span>
            </div>
            
            <div className="absolute -bottom-2 -left-4 bg-white text-slate-800 py-2.5 px-4 rounded-2xl shadow-md border border-slate-100 text-xs font-bold font-sans flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Dr. Shruthi Goli in Hospital Today</span>
            </div>

          </motion.div>

        </div>
      </section>

      {/* 2. Key Metrics Stats Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="section-metrics">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
              >
                <div className={`p-3 rounded-xl mb-3 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-display font-bold text-2xl sm:text-3xl text-slate-900 leading-none">
                  {stat.value}
                </span>
                <span className="font-sans text-xs sm:text-sm text-slate-500 mt-2 font-medium">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Deep Dive into Dr. Shruthi Goli & Clinical Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="section-clinical-experts">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
            Our Distinguished Clinical Directors
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Meet the expert specialist doctors guiding Birthroots IVF, Maternity, and Pediatric Hospitals.
          </p>
        </div>

        {/* Doctor profiles in grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {DOCTORS.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-white border border-slate-100/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 relative overflow-hidden"
              id={`doctor-card-${doc.id}`}
            >
              
              {/* Doctor image representation */}
              <div className="w-full md:w-44 lg:w-48 shrink-0">
                <div className="aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 relative group/pic shadow-sm">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    className="w-full h-full object-cover object-center select-none transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle specialty tag */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider text-slate-700 border border-slate-100 shadow-xs">
                    {idx === 0 ? "Gyne & IVF" : "Pediatrics"}
                  </div>
                </div>
              </div>

              {/* Bio details */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-slate-800">{doc.name}</h3>
                  <p className="text-xs font-semibold text-teal-600 mt-0.5">{doc.designation}</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">{doc.qualifications}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                  <p className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                    <Award className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{doc.experience}</span>
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {doc.bio}
                </p>

                {/* Bullet specialities */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Expertise Areas:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {doc.specialties.slice(0, 3).map((spec) => (
                      <span key={spec} className="inline-flex items-center px-2 py-1 rounded-lg bg-teal-50 text-[10px] font-medium text-teal-800">
                        {spec}
                      </span>
                    ))}
                    {doc.specialties.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-lg bg-slate-50 text-[10px] font-medium text-slate-500">
                        +{doc.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Specialties Showcase Section */}
      <section className="bg-slate-50/50 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-100/60" id="section-quick-specialties">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                Our Comprehensive Medical Specialties
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                World-class treatments coupled with loving, personalized care.
              </p>
            </div>
            
            <button
              onClick={() => setTab('services')}
              id="btn-all-services"
              className="px-5 py-2.5 text-sm font-bold text-teal-600 hover:text-teal-700 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Explore All Departments</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALTIES.map((spec, idx) => (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => setTab('services')}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:border-teal-100 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-800 leading-snug group-hover:text-teal-600 transition-colors">
                      {spec.title}
                    </h3>
                    <p className="text-[11px] text-teal-600 font-semibold mt-0.5">
                      {spec.telugu}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 font-sans line-clamp-3 leading-relaxed">
                      {spec.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center text-xs font-bold text-slate-400 group-hover:text-teal-600 transition-colors mt-4">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Google Reviews Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="section-reviews">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Patient Recommended</span>
              </div>
              <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight leading-tight">
                Kind Words from Blessed Parents
              </h2>
            </div>
            
            <p className="text-slate-600 text-sm font-sans leading-relaxed">
              Dr. Shruthi Goli and team are proud to maintain a 4.8-star review score from over 476 verified patients. Read the experiences of families from Mancherial and nearby regions.
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="font-display font-bold text-4xl text-slate-800">4.8</div>
                <div>
                  <div className="flex text-amber-400">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-slate-500">Average based on 476 Google Maps Reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Review grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {INITIAL_REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm text-slate-800">{rev.author}</span>
                    <span className="text-[10px] text-slate-400 font-sans">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans italic">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-50 flex items-center space-x-1.5 mt-3 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Google Patient</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5.5. Hospital Infrastructure & comfort-first Facilities Photo Gallery */}
      {HOSPITAL_PHOTOS && HOSPITAL_PHOTOS.length > 0 && (
        <section className="bg-gradient-to-b from-white to-slate-50 py-16 border-t border-slate-100" id="section-hospital-gallery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center space-x-1.5 bg-teal-50 text-teal-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Baby className="w-3.5 h-3.5 text-teal-600" />
                <span>World-Class Infrastructure</span>
              </div>
              <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
                Our Modern Hospital & Fertility Clinic
              </h2>
              <p className="text-slate-500 text-sm sm:text-base font-sans">
                Take a tour of our high-tech medical facilities, specialized embryology laboratory, cozy pediatric ward, and safe delivery suites in Mancherial, Telangana.
              </p>
            </div>

            {/* Photo Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {HOSPITAL_PHOTOS.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.4 }}
                  className="group relative bg-white border border-slate-100 rounded-3xl p-4 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Photo Container */}
                    <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative shadow-inner">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 select-none"
                      />
                    </div>

                    {/* Information block */}
                    <div className="space-y-1 px-1">
                      <h3 className="font-display font-bold text-base text-slate-800 flex items-center space-x-2">
                        <span className="w-1.5 h-3.5 bg-brand-accent rounded-full shrink-0" />
                        <span>{photo.title}</span>
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        {photo.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-50 mt-4 flex justify-between items-center px-1">
                    <span className="text-[10px] text-teal-600 font-bold uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded-md">
                      {index === 0 ? "Clinic Lobby & Reception" : "IVF Labs & Delivery Suite"}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Birthroots IVF & Hospital</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Feature Alert */}
            <div className="bg-teal-50 border border-teal-100 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5 text-center sm:text-left">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-slate-800">Equipped for High-Risk Maternity & 24/7 Neonatal Support</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-sans">Our operation theaters, IVF incubators, and newborn NICU units are backed by central gas supplies and emergency backup power systems.</p>
                </div>
              </div>
              <button
                onClick={() => setTab('booking')}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-100 shrink-0 transition-all cursor-pointer font-sans"
              >
                Book Hospital Visit
              </button>
            </div>

          </div>
        </section>
      )}

      {/* 6. High-Contrast Contact, Access, Map & Directions Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="section-contact">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 text-white shadow-xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-teal-500/10 filter blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-teal-500/10 filter blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Info panel */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-2">
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  Reach Us Instantly
                </h2>
                <p className="text-slate-400 text-sm font-sans">
                  Located in the heart of Mancherial. Feel free to visit or call us directly.
                </p>
              </div>

              <div className="space-y-4">
                
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-white/10 text-teal-400 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Hospital Address</h4>
                    <p className="text-sm font-sans text-white leading-relaxed mt-0.5">
                      {HOSPITAL_INFO.address}
                    </p>
                    <p className="text-xs text-teal-300 font-semibold mt-1">
                      (Near IB Chowrasta, Beside Anjeneya Prasad Hospital)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-white/10 text-brand-secondary shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Phone Helpline</h4>
                    <p className="text-base sm:text-lg font-bold text-white mt-0.5">
                      {HOSPITAL_INFO.phone}
                    </p>
                    <p className="text-[11px] text-slate-400">Call anytime for obstetric/maternity & pediatric emergencies</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-white/10 text-amber-400 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Working Hours</h4>
                    <p className="text-sm font-sans text-slate-200 mt-0.5">
                      {HOSPITAL_INFO.workingHours}
                    </p>
                  </div>
                </div>

              </div>

              {/* Direct Maps action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDirections}
                  id="btn-directions-primary"
                  className="px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
                >
                  <Navigation className="w-4.5 h-4.5" />
                  <span>Navigate in Google Maps</span>
                </button>
                <button
                  onClick={() => setTab('booking')}
                  id="btn-booking-quick"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/10 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Clock className="w-4.5 h-4.5" />
                  <span>Request Appointment</span>
                </button>
              </div>

            </div>

            {/* Custom Interactive map visualizer card */}
            <div className="lg:col-span-6">
              <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-3xl space-y-4">
                
                {/* Simulated high-contrast surgical site location with roads */}
                <div className="aspect-[4/3] rounded-2xl bg-slate-950 relative overflow-hidden border border-slate-800 flex flex-col justify-between p-4">
                  
                  {/* Styled Grid lines representing roads */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <div className="w-full h-full" style={{
                      backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }} />
                  </div>

                  {/* Highlighted major roads labels */}
                  <div className="absolute top-1/4 left-0 w-full h-3.5 bg-slate-800 -rotate-12 flex items-center px-4">
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider font-mono">IB Chowrasta Main Road</span>
                  </div>
                  <div className="absolute top-0 left-1/3 w-4 h-full bg-slate-800 rotate-12 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider font-mono rotate-90 whitespace-nowrap">Reddy Colony Lane</span>
                  </div>

                  {/* Marker representation */}
                  <div className="absolute top-[48%] left-[45%] z-20 flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-8 h-8 rounded-full bg-teal-500/40 animate-ping" />
                      <div className="w-5 h-5 rounded-full bg-teal-600 border-2 border-white flex items-center justify-center shadow-lg">
                        <Heart className="w-2.5 h-2.5 text-white fill-current" />
                      </div>
                    </div>
                    <div className="mt-1 bg-slate-900 border border-teal-500/50 text-[9px] font-bold py-1 px-2.5 rounded-lg shadow-md text-white whitespace-nowrap">
                      Birthroots IVF Hospital
                    </div>
                  </div>

                  {/* Nearby Landmarks markers */}
                  <div className="absolute top-[28%] left-[62%] text-slate-500 text-[8px] flex items-center space-x-1 font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <span>Anjeneya Prasad Hospital</span>
                  </div>
                  <div className="absolute bottom-[20%] left-[25%] text-slate-500 text-[8px] flex items-center space-x-1 font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <span>Kakatiya Grills</span>
                  </div>

                  {/* Compass / Distance Indicator */}
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 px-2 py-1 rounded-md text-[8px] font-mono text-slate-400">
                    MANCHERIAL, TS | 18.87° N, 79.44° E
                  </div>

                  <div className="absolute top-3 right-3 bg-brand-secondary px-2 py-1 rounded text-[8px] font-bold text-white tracking-wide uppercase">
                    Reddy Colony
                  </div>

                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center space-x-1.5">
                    <Navigation className="w-3.5 h-3.5 text-teal-500" />
                    <span>Opposite Water Tank lane area</span>
                  </span>
                  <a 
                    href="https://maps.app.goo.gl/bCYeVq5LkCMzXiuA8?g_st=ac" 
                    target="_blank" 
                    className="text-teal-500 font-bold hover:underline"
                    referrerPolicy="no-referrer"
                  >
                    Google Maps Link ↗
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
