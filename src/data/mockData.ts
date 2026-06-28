import { Appointment, PatientHistory, Review } from '../types';

import drShruthiAi from '../assets/images/dr_shruthi_goli_ai_1782677351153.jpg';
import drRahulAi from '../assets/images/dr_rahul_goli_ai_1782678481150.jpg';

export interface HospitalPhoto {
  id: string;
  url: string;
  title: string;
  description: string;
}

export const HOSPITAL_PHOTOS: HospitalPhoto[] = [];

export const HOSPITAL_INFO = {
  name: "Dr Shruthi Goli Birthroots IVF Infertility, Laparoscopy, Maternity and Pediatric Care Hospital",
  teluguName: "డాక్టర్ శృతి గోలి బర్త్‌రూట్స్ హాస్పిటల్",
  tagline: "Cultivating hope, nurturing life, caring for your tomorrow.",
  address: "Birthroots Hospitals, near IB Chowrasta, beside Anjeneya Prasad Hospital, Reddy Colony, Mancherial, Telangana 504208",
  phone: "091779 85540",
  email: "care@birthroots.in",
  workingHours: "24/7 Maternity & Pediatric Emergency | Outpatient: Mon - Sat: 10:00 AM - 6:00 PM",
  rating: 4.8,
  reviewCount: 476,
  coordinates: { lat: 18.8742, lng: 79.4449 } // Mancherial
};

export const DOCTORS = [
  {
    id: "dr-shruthi-goli",
    name: "Dr. Shruthi Goli",
    designation: "Chief Gynecologist, Obstetrician & IVF Specialist",
    qualifications: "MBBS, MS (OBG), Fellowship in Reproductive Medicine (IVF), Trained in Gynae Laparoscopy",
    experience: "10+ Years of Extensive Expertise in Hyderabad & Delhi",
    specialties: [
      "Infertility & IVF (In Vitro Fertilization)",
      "High-Risk Pregnancy Management",
      "Gynae Endoscopy & Laparoscopic Surgeries",
      "Minimally Invasive Surgery",
      "Painless Delivery & Maternity Care"
    ],
    bio: "Dr. Shruthi Goli is a highly acclaimed gynecologist and infertility surgeon. Over the past decade, she has successfully treated thousands of couples with fertility issues, bringing joy to their lives. Renowned for her gentle approach and expertise in laparoscopic surgery and high-risk pregnancies, she ensures the highest quality of healthcare for mothers and newborns.",
    image: drShruthiAi
  },
  {
    id: "dr-rahul-pediatrician",
    name: "Dr. Rahul Goli",
    designation: "Senior Consultant Pediatrician & Neonatologist",
    qualifications: "MBBS, MD (Pediatrics), Fellowship in Neonatology",
    experience: "8+ Years of Compassionate Child Care",
    specialties: [
      "Neonatal Intensive Care (NICU)",
      "Childhood Asthma & Allergies",
      "Growth & Development Monitoring",
      "Immunization & Vaccination Guidance",
      "Pediatric Emergencies"
    ],
    bio: "Dr. Rahul specializes in neonatology and neonatal intensive care. He is dedicated to providing warm, comprehensive care to infants and children, ensuring their physical and developmental well-being at every step.",
    image: drRahulAi
  }
];

export const SPECIALTIES = [
  {
    id: "ivf",
    title: "IVF & Infertility Treatment",
    telugu: "ఐ.వి.ఎఫ్ & సంతానలేమి చికిత్స",
    icon: "Baby",
    shortDesc: "Advanced reproductive technologies including IVF, IUI, and ICSI to fulfill your dream of parenthood.",
    longDesc: "Birthroots is equipped with state-of-the-art IVF labs, offering comprehensive semen analysis, egg freezing, embryo biopsy, and standard/advanced clinical protocols customized for each couple.",
    features: ["Customized IVF Protocols", "Intrauterine Insemination (IUI)", "Intracytoplasmic Sperm Injection (ICSI)", "Blastocyst Culture & Transfer", "High IVF Success Rates"]
  },
  {
    id: "laparoscopy",
    title: "Gynae Laparoscopy",
    telugu: "గైనకాలజీ లాపరోస్కోపీ",
    icon: "Activity",
    shortDesc: "Minimally invasive keyhole surgical options for rapid recovery, minimal pain, and smaller scars.",
    longDesc: "Our laparoscopic surgery center provides modern procedures for fibroids removal, ovarian cyst excision, endometriosis management, and diagnostic hysteroscopy under Dr. Shruthi Goli's direct surgical expertise.",
    features: ["Keyhole Surgeries", "Painless Procedures", "Same-day Discharge Options", "Expert Endometriosis Care", "Uterine Fibroid Myomectomy"]
  },
  {
    id: "maternity",
    title: "Maternity & Obstetric Care",
    telugu: "ప్రసూతి మరియు మాతృత్వ రక్షణ",
    icon: "HeartPulse",
    shortDesc: "Comprehensive prenatal care, gentle painless deliveries, and advanced high-risk pregnancy monitoring.",
    longDesc: "Providing a warm, safe cocoon for mothers-to-be. From early pregnancy scans, nutritional counseling, fetal medicine to dedicated labor rooms and postpartum care.",
    features: ["High-Risk Pregnancy Management", "Painless Epidural Labor", "Lactation & Postpartum Support", "Preconceptional Counseling", "Continuous Fetal Monitoring"]
  },
  {
    id: "pediatrics",
    title: "Pediatrics & Neonatology",
    telugu: "పిల్లల వైద్యం మరియు నవజాత శిశు రక్షణ",
    icon: "ShieldAlert",
    shortDesc: "Dedicated medical, preventive, and emergency care for newborns, toddlers, and adolescents.",
    longDesc: "Under Dr. Rahul Goli, our pediatric ward offers comprehensive immunization schedules, critical care for preterm newborns, and friendly checkups designed to make children feel right at home.",
    features: ["Well-Baby Clinic & Vaccines", "Neonatal Intensive Care (NICU)", "Emergency Pediatric Cover", "Developmental Milestones Tracking", "Childhood Infectious Disease Care"]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Swapna Reddy",
    rating: 5,
    date: "2 weeks ago",
    text: "Dr. Shruthi Goli is like a godsend to us. We were trying for a child for 5 years and with her IVF treatment in Birthroots, we are blessed with a baby boy. She explained everything patiently and supported us throughout. Mancherial's best hospital!",
    isVerified: true
  },
  {
    id: "rev-2",
    author: "Venkatesh Madiga",
    rating: 5,
    date: "1 month ago",
    text: "Excellent maternity care. Dr. Shruthi Goli did my wife's high-risk delivery last month. The staff is highly helpful, clean rooms, and reasonable cost. Dr. Rahul Goli is also looking after the baby nicely. Highly recommended for couples.",
    isVerified: true
  },
  {
    id: "rev-3",
    author: "Pranitha K.",
    rating: 5,
    date: "3 weeks ago",
    text: "Dr. Shruthi is incredibly skilled in laparoscopy. I had ovarian cysts removed here and recovered within 2 days with virtually zero pain. Staff treated me like family.",
    isVerified: true
  },
  {
    id: "rev-4",
    author: "Mahesh Goud",
    rating: 5,
    date: "2 months ago",
    text: "Very friendly and experienced doctors. Best hospital in Reddy Colony, Mancherial. Dr. Rahul's neonatology guidance is outstanding for newborns.",
    isVerified: true
  }
];

// Initial patient database for simulation
export const INITIAL_PATIENTS: PatientHistory[] = [
  {
    id: "P-1082",
    patientName: "Anjali Sharma",
    patientPhone: "9876543210",
    age: 29,
    gender: "Female",
    bloodGroup: "O+",
    records: [
      {
        id: "rec-1",
        date: "2026-05-12",
        type: "Consultation",
        title: "IVF Cycle Planning & Consultation",
        doctorName: "Dr. Shruthi Goli",
        notes: "Discussed IVF treatment sequence. Egg retrieval scheduled next month. Initiated prenatal vitamins and follicular monitoring.",
        metrics: { bp: "120/80", weight: "62 kg", hbLevel: "12.4 g/dl" }
      },
      {
        id: "rec-2",
        date: "2026-06-02",
        type: "Lab Report",
        title: "Pre-IVF Hormonal Assessment",
        doctorName: "Dr. Shruthi Goli",
        notes: "AMH, FSH, and LH levels are within acceptable limits. Ovarian reserves indicate good response potential. Prepared prescription for ovulation induction.",
        metrics: { bp: "118/76", weight: "61.8 kg" }
      },
      {
        id: "rec-3",
        date: "2026-06-25",
        type: "Scan",
        title: "Follicular Monitoring Ultrasound",
        doctorName: "Dr. Shruthi Goli",
        notes: "Ultrasound showed 4 dominant follicles on the right ovary and 5 on the left ovary. Average size: 16mm. Trigger injection scheduled for tomorrow night.",
        metrics: { bp: "122/82", weight: "62.2 kg" }
      }
    ],
    ivfTimeline: [
      { stage: "Consultation & Diagnostics", date: "2026-05-12", status: "Completed", description: "Completed initial fertility profiling, hormonal tests, and baseline scans." },
      { stage: "Ovarian Stimulation", date: "2026-06-15", status: "Completed", description: "Hormonal therapy administered to stimulate multiple egg production." },
      { stage: "Trigger Injection", date: "2026-06-26", status: "Completed", description: "hCG/GnRH agonist shot administered to trigger final maturity of eggs." },
      { stage: "Egg Retrieval", date: "2026-06-28", status: "Active", description: "Minimally invasive outpatient procedure to collect mature follicles.", notes: "Today! Dr. Shruthi Goli confirmed successful aspiration of 9 high-quality eggs." },
      { stage: "Embryo Culture & Fertilization", date: "2026-06-30", status: "Upcoming", description: "Sperm fertilization using ICSI and monitoring developmental stages in the incubator." },
      { stage: "Embryo Transfer", date: "2026-07-03", status: "Upcoming", description: "Placement of healthy blastocyst into the uterus under ultrasound guidance." },
      { stage: "Pregnancy Test", date: "2026-07-15", status: "Upcoming", description: "Beta-hCG blood test to verify successful implantation." }
    ]
  },
  {
    id: "P-4321",
    patientName: "Karthik Reddy",
    patientPhone: "8765432109",
    age: 4,
    gender: "Male",
    bloodGroup: "A+",
    records: [
      {
        id: "rec-p1",
        date: "2026-04-10",
        type: "Consultation",
        title: "Pediatric Immunization & Growth Check",
        doctorName: "Dr. Rahul Goli",
        notes: "Administered booster vaccines. Height: 104 cm, Weight: 16.5 kg. Growth parameters are perfectly tracked in the 75th percentile. Safe diet and active play advised.",
        metrics: { bp: "95/60", weight: "16.5 kg", hbLevel: "11.8 g/dl" }
      }
    ]
  }
];

export const TIME_SLOTS = [
  "10:00 AM - 10:30 AM",
  "10:30 AM - 11:00 AM",
  "11:00 AM - 11:30 AM",
  "11:30 AM - 12:00 PM",
  "12:00 PM - 12:30 PM",
  "02:30 PM - 03:00 PM",
  "03:00 PM - 03:30 PM",
  "03:30 PM - 04:00 PM",
  "04:00 PM - 04:30 PM",
  "04:30 PM - 05:00 PM"
];
