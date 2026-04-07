import { db } from "../src/lib/db";
import { Prisma } from "@prisma/client";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Helper to create specs JSON string
function specs(specsObj: Record<string, string | number>): string {
  return JSON.stringify(specsObj);
}

// Helper to create images JSON array string
function images(paths: string[]): string {
  return JSON.stringify(paths);
}

const categoriesData = [
  {
    name: "THREE PHASE PANELS",
    slug: "three-phase-panels",
    description: "Three phase electrical panels for motor control and power distribution",
    order: 1,
  },
  {
    name: "SINGLE PHASE SUMMERSIBLE PANELS",
    slug: "single-phase-summersible-panels",
    description: "Single phase submersible motor control panels",
    order: 2,
  },
  {
    name: "AUTOMATIC CHANGEOVERS",
    slug: "automatic-changeovers",
    description: "Automatic changeover switches for seamless power switching",
    order: 3,
  },
  {
    name: "AUTOMATIC SEQUENCE TIMER PANELS",
    slug: "automatic-sequence-timer-panels",
    description: "Sequence timer panels for automated motor control sequencing",
    order: 4,
  },
  {
    name: "AUTOMATIC TEMPERATURE CONTROL PANELS",
    slug: "automatic-temperature-control-panels",
    description: "Temperature control panels for heating applications",
    order: 5,
  },
  {
    name: "OIL IMMERSED STARTERS",
    slug: "oil-immersed-starters",
    description: "Oil immersed motor starters for heavy duty applications",
    order: 6,
  },
  {
    name: "BUSBAR",
    slug: "busbar",
    description: "Heavy duty busbar systems for power distribution",
    order: 7,
  },
  {
    name: "AIR BREAK STARTERS & SWITCHES",
    slug: "air-break-starters-switches",
    description: "Air break starters and switches for motor control",
    order: 8,
  },
  {
    name: "MAIN SWITCHES & CHANGEOVERS",
    slug: "main-switches-changecovers",
    description: "Main switches, changeovers, and distribution boxes",
    order: 9,
  },
  {
    name: "A.C. BOX & SOCKET TYPE DISTRIBUTION PANELS",
    slug: "ac-box-socket-distribution-panels",
    description: "AC boxes, socket type distribution panels, and feeder pillars",
    order: 10,
  },
  {
    name: "AUTOMATIC WATER LEVEL CONTROLLERS",
    slug: "automatic-water-level-controllers",
    description: "Automatic water level controllers for pumps and tanks",
    order: 11,
  },
  {
    name: "DIGITAL MEASURING INSTRU. & A.C Drives",
    slug: "digital-measuring-instruments-ac-drives",
    description: "Digital measuring instruments and AC drive panels",
    order: 12,
  },
  {
    name: "AUTOMATIC POWER FAC. CONTROL PANEL",
    slug: "automatic-power-factor-control-panel",
    description: "Automatic power factor control panels for power optimization",
    order: 13,
  },
  {
    name: "AUTOMATIC MAINS FAILURE",
    slug: "automatic-mains-failure",
    description: "AMF panels for automatic generator start on mains failure",
    order: 14,
  },
  {
    name: "SOLAR PANELS",
    slug: "solar-panels",
    description: "Customized solar panel systems in IP 65 enclosures",
    order: 15,
  },
  {
    name: "HUT TYPE PANEL (IP 55)",
    slug: "hut-type-panel-ip55",
    description: "Hut type feeder pillar panels with IP 55 protection",
    order: 16,
  },
];

const productsData: {
  name: string;
  slug: string;
  categorySlug: string;
  description: string;
  specifications: string;
  price: number | null;
  images: string;
  order: number;
  featured: boolean;
}[] = [
  // ===== THREE PHASE PANELS =====
  {
    name: "Heavy Duty DOL Three Phase Motor Control Panel Deluxe (NTP)",
    slug: "heavy-duty-dol-three-phase-motor-control-panel-deluxe-ntp",
    categorySlug: "three-phase-panels",
    description: "Heavy Duty Direct On Line three phase motor control panel deluxe model for reliable motor starting and protection.",
    specifications: specs({
      model: "NTP",
      type: "DOL Motor Control Panel",
      phase: "Three Phase",
      variants: "1HP / 2HP / 3HP / 5HP / 7.5HP - ₹5800, 10HP - ₹6600, 15HP - ₹7800, 20HP - ₹8800",
    }),
    price: 5800,
    images: images(["/images/THREE PHASE PANELS/2-3.PNG"]),
    order: 1,
    featured: true,
  },
  {
    name: "Star Delta Air Break Three Phase Motor Control Panel (NTPSD)",
    slug: "star-delta-air-break-three-phase-motor-control-panel-ntpsd",
    categorySlug: "three-phase-panels",
    description: "Star Delta air break three phase motor control panel for smooth motor starting with reduced inrush current.",
    specifications: specs({
      model: "NTPSD",
      type: "Star Delta Motor Control Panel",
      phase: "Three Phase",
      variants: "7.5/10/15HP - ₹13000, 20HP - ₹14000, 30HP - ₹18500, 40HP - ₹31000, 50HP - ₹36000",
    }),
    price: 13000,
    images: images(["/images/THREE PHASE PANELS/2-2.PNG"]),
    order: 2,
    featured: true,
  },

  // ===== SINGLE PHASE SUMMERSIBLE PANELS =====
  {
    name: "Submersible Motor-Control Panels for Oil Filled (NSSP)",
    slug: "submersible-motor-control-panels-oil-filled-nssp",
    categorySlug: "single-phase-summersible-panels",
    description: "Submersible motor control panels designed for oil filled submersible pumps. Compact and reliable design.",
    specifications: specs({
      model: "NSSP",
      type: "Oil Filled Submersible Panel",
      phase: "Single Phase",
      variants: "0.75/1HP - ₹950, 1.5HP - ₹1000, 1.5HP - ₹1050",
    }),
    price: 950,
    images: images(["/images/SINGLE PHASE SUMMERSIBLE PANELS/3-1.PNG"]),
    order: 1,
    featured: false,
  },
  {
    name: "Control Panels for Water Filled Submersible (NSPWR)",
    slug: "control-panels-water-filled-submersible-nspwr",
    categorySlug: "single-phase-summersible-panels",
    description: "Control panels for water filled submersible pumps with built-in protection features.",
    specifications: specs({
      model: "NSPWR",
      type: "Water Filled Submersible Panel",
      phase: "Single Phase",
      variants: "1HP - ₹1820, 1.5HP - ₹1900, 2HP - ₹2000",
    }),
    price: 1820,
    images: images(["/images/SINGLE PHASE SUMMERSIBLE PANELS/3-2.PNG"]),
    order: 2,
    featured: false,
  },
  {
    name: "Control Panels for Water Filled Submersible with Digital Meter (NSP DLX)",
    slug: "control-panels-water-filled-submersible-digital-meter-nsp-dlx",
    categorySlug: "single-phase-summersible-panels",
    description: "Deluxe control panels for water filled submersible pumps with digital meter for real-time monitoring.",
    specifications: specs({
      model: "NSP DLX",
      type: "Water Filled Submersible Deluxe Panel",
      phase: "Single Phase",
      variants: "1HP - ₹2800, 1.5HP - ₹3000, 2HP - ₹3400, 3HP - ₹4000, 5HP - ₹8000",
    }),
    price: 2800,
    images: images(["/images/SINGLE PHASE SUMMERSIBLE PANELS/3-3.PNG"]),
    order: 3,
    featured: true,
  },

  // ===== AUTOMATIC CHANGEOVERS =====
  {
    name: "Single Phase Automatic Changeover (NACO MCB)",
    slug: "single-phase-automatic-changeover-naco-mcb",
    categorySlug: "automatic-changeovers",
    description: "Single phase automatic changeover switch with MCB protection for seamless transfer between mains and backup power.",
    specifications: specs({
      model: "NACO MCB",
      type: "Automatic Changeover",
      phase: "Single Phase",
      variants: "30A - ₹1275, 60A - ₹3270, 100A - ₹8000",
    }),
    price: 1275,
    images: images(["/images/AUTOMATIC CHANGEOVERS/Single Phase Automa.PNG"]),
    order: 1,
    featured: false,
  },
  {
    name: "Three Phase Automatic Changeover Switch (NACO)",
    slug: "three-phase-automatic-changeover-switch-naco",
    categorySlug: "automatic-changeovers",
    description: "Three phase automatic changeover switch for reliable power transfer in three phase installations.",
    specifications: specs({
      model: "NACO",
      type: "Automatic Changeover",
      phase: "Three Phase",
      variants: "60A - ₹5820, 100A - ₹14000, 200A - ₹24500",
    }),
    price: 5820,
    images: images(["/images/AUTOMATIC CHANGEOVERS/Three Phase Automa.PNG"]),
    order: 2,
    featured: true,
  },
  {
    name: "Automatic Phase Sequence Corrector (NPSC)",
    slug: "automatic-phase-sequence-corrector-npsc",
    categorySlug: "automatic-changeovers",
    description: "Automatic phase sequence corrector that ensures correct phase rotation for three phase equipment protection.",
    specifications: specs({
      model: "NPSC",
      type: "Phase Sequence Corrector",
      phase: "Three Phase",
      variants: "30A - ₹5500, 60A - ₹8200, 100A - ₹17300, 200A - ₹25500",
    }),
    price: 5500,
    images: images(["/images/AUTOMATIC CHANGEOVERS/Automatic Phase.PNG"]),
    order: 3,
    featured: false,
  },
  {
    name: "Automatic Phase Changeover (NPCO)",
    slug: "automatic-phase-changeover-npco",
    categorySlug: "automatic-changeovers",
    description: "Automatic phase changeover switch for switching between phases to balance load and ensure continuous power supply.",
    specifications: specs({
      model: "NPCO",
      type: "Phase Changeover",
      phase: "Three Phase",
      variants: "60A - ₹7300, 100A - ₹17000, 200A - ₹25000",
    }),
    price: 7300,
    images: images(["/images/AUTOMATIC CHANGEOVERS/Automatic Phase change.PNG"]),
    order: 4,
    featured: false,
  },

  // ===== AUTOMATIC SEQUENCE TIMER PANELS =====
  {
    name: "Single Phase Automatic Sequence Timer",
    slug: "single-phase-automatic-sequence-timer",
    categorySlug: "automatic-sequence-timer-panels",
    description: "Single phase automatic sequence timer panel for controlling multiple pumps or motors in a timed sequence.",
    specifications: specs({
      type: "Sequence Timer Panel",
      phase: "Single Phase",
      variants: "1-3HP - ₹8200",
    }),
    price: 8200,
    images: images(["/images/AUTOMATIC SEQUENCE TIMER PANELS/4.PNG"]),
    order: 1,
    featured: false,
  },
  {
    name: "Three Phase Automatic Sequence Timer",
    slug: "three-phase-automatic-sequence-timer",
    categorySlug: "automatic-sequence-timer-panels",
    description: "Three phase automatic sequence timer panel for industrial motor sequencing applications.",
    specifications: specs({
      type: "Sequence Timer Panel",
      phase: "Three Phase",
      variants: "1-7.5HP - ₹10000",
    }),
    price: 10000,
    images: images(["/images/AUTOMATIC SEQUENCE TIMER PANELS/4.PNG"]),
    order: 2,
    featured: false,
  },

  // ===== AUTOMATIC TEMPERATURE CONTROL PANELS =====
  {
    name: "Single Phase Temperature Controller",
    slug: "single-phase-temperature-controller",
    categorySlug: "automatic-temperature-control-panels",
    description: "Single phase automatic temperature controller panel for precise temperature management in heating systems.",
    specifications: specs({
      type: "Temperature Controller",
      phase: "Single Phase",
      variants: "1-3KW - ₹8000, 1-5KW - ₹10200",
    }),
    price: 8000,
    images: images(["/images/AUTOMATIC TEMPERATURE CONTROL PANELS/5-1.PNG"]),
    order: 1,
    featured: false,
  },
  {
    name: "Three Phase Temperature Controller",
    slug: "three-phase-temperature-controller",
    categorySlug: "automatic-temperature-control-panels",
    description: "Three phase automatic temperature controller panel for industrial heating applications.",
    specifications: specs({
      type: "Temperature Controller",
      phase: "Three Phase",
      variants: "Up to 10KW - ₹12000",
    }),
    price: 12000,
    images: images(["/images/AUTOMATIC TEMPERATURE CONTROL PANELS/5-2.PNG"]),
    order: 2,
    featured: false,
  },

  // ===== OIL IMMERSED STARTERS =====
  {
    name: "Direct Online Oil Immersed Motor Starter (NOI)",
    slug: "direct-online-oil-immersed-motor-starter-noi",
    categorySlug: "oil-immersed-starters",
    description: "Direct online oil immersed motor starter for reliable motor starting in harsh environments.",
    specifications: specs({
      model: "NOI",
      type: "DOL Oil Immersed Starter",
      variants: "7.5/10/15HP - ₹2200, 20HP - ₹2400",
    }),
    price: 2200,
    images: images(["/images/OIL IMMERSED STARTERS/6-1.PNG"]),
    order: 1,
    featured: false,
  },
  {
    name: "Semi Automatic Star Delta Immersed Motor Starter (NSA)",
    slug: "semi-automatic-star-delta-immersed-motor-starter-nsa",
    categorySlug: "oil-immersed-starters",
    description: "Semi automatic star delta oil immersed motor starter for controlled starting of three phase motors.",
    specifications: specs({
      model: "NSA",
      type: "Semi Auto Star Delta Oil Immersed Starter",
      variants: "10/15HP - ₹6000, 20HP - ₹6200, 30HP - ₹6600, 35HP - ₹6600",
    }),
    price: 6000,
    images: images(["/images/OIL IMMERSED STARTERS/6-2.PNG"]),
    order: 2,
    featured: false,
  },
  {
    name: "Fully Automatic Star Delta Immersed Motor Starter (NFA)",
    slug: "fully-automatic-star-delta-immersed-motor-starter-nfa",
    categorySlug: "oil-immersed-starters",
    description: "Fully automatic star delta oil immersed motor starter for hands-free motor starting and protection.",
    specifications: specs({
      model: "NFA",
      type: "Fully Auto Star Delta Oil Immersed Starter",
      variants: "10/15HP - ₹6200, 20HP - ₹7000, 30HP - ₹7000, 35HP - ₹7000",
    }),
    price: 6200,
    images: images(["/images/OIL IMMERSED STARTERS/6-3.PNG"]),
    order: 3,
    featured: false,
  },
  {
    name: "Manually Operated Oil Immersed Star-Delta (NSD)",
    slug: "manually-operated-oil-immersed-star-delta-nsd",
    categorySlug: "oil-immersed-starters",
    description: "Manually operated oil immersed star-delta starter for heavy duty motor starting applications.",
    specifications: specs({
      model: "NSD",
      type: "Manual Star Delta Oil Immersed Starter",
      variants: "20/25/30HP - ₹10000, 40HP - ₹10500, 50/60HP - ₹11000, 60/80HP - ₹19800, 100HP - ₹20500, 150HP - ₹22100, 200HP - ₹32000",
    }),
    price: 10000,
    images: images(["/images/OIL IMMERSED STARTERS/6-1.PNG"]),
    order: 4,
    featured: true,
  },
  {
    name: "NPD Type Heavy Duty",
    slug: "npd-type-heavy-duty",
    categorySlug: "oil-immersed-starters",
    description: "NPD type heavy duty oil immersed starter with double contact for enhanced reliability in demanding applications.",
    specifications: specs({
      model: "NPD",
      type: "Heavy Duty Oil Immersed Starter",
      note: "Same as NSD but with double contact",
      variants: "20/25/30HP - ₹10000, 40HP - ₹10500, 50/60HP - ₹11000, 60/80HP - ₹19800, 100HP - ₹20500, 150HP - ₹22100, 200HP - ₹32000",
    }),
    price: 10000,
    images: images(["/images/OIL IMMERSED STARTERS/6-2.PNG"]),
    order: 5,
    featured: false,
  },

  // ===== BUSBAR =====
  {
    name: "Heavy Duty 3 Phase 4 Wire 415V (TPN)",
    slug: "heavy-duty-3-phase-4-wire-415v-tpn",
    categorySlug: "busbar",
    description: "Heavy duty three phase four wire 415V TPN busbar system for reliable power distribution in industrial and commercial installations.",
    specifications: specs({
      type: "TPN Busbar",
      phase: "Three Phase 4 Wire",
      voltage: "415V",
      variants: "63A/415V - ₹1400, 100A/415V - ₹2300, 200A/415V - ₹4100, 300A/415V - ₹5400, 400A/415V - ₹7000, 500A/415V - ₹8500, 600A/415V - ₹10000",
    }),
    price: 1400,
    images: images(["/images/BUSBAR/7.PNG"]),
    order: 1,
    featured: true,
  },

  // ===== AIR BREAK STARTERS & SWITCHES =====
  {
    name: "Reversing Switches",
    slug: "reversing-switches",
    categorySlug: "air-break-starters-switches",
    description: "Air break reversing switches for changing motor rotation direction in three phase installations.",
    specifications: specs({
      type: "Reversing Switch",
      variants: "16A - ₹350, 25A - ₹415, 32A - ₹900, 63A - ₹2500",
    }),
    price: 350,
    images: images(["/images/AIR BREAK STARTERS & SWITCHES/8-1.PNG"]),
    order: 1,
    featured: false,
  },
  {
    name: "Air Break Direct Online Motor Starter",
    slug: "air-break-direct-online-motor-starter",
    categorySlug: "air-break-starters-switches",
    description: "Air break direct online motor starter for three phase motor starting with overcurrent protection.",
    specifications: specs({
      type: "DOL Motor Starter",
      phase: "Three Phase",
      variants: "1-7.5HP (TP) - ₹1300, 10HP (TP) - ₹1400",
    }),
    price: 1300,
    images: images(["/images/AIR BREAK STARTERS & SWITCHES/8-2.PNG"]),
    order: 2,
    featured: false,
  },
  {
    name: "Star Delta Fully Automatic Motor Starter (NFS)",
    slug: "star-delta-fully-automatic-motor-starter-nfs",
    categorySlug: "air-break-starters-switches",
    description: "Fully automatic star delta motor starter for smooth starting of three phase motors with reduced inrush current.",
    specifications: specs({
      model: "NFS",
      type: "Star Delta Motor Starter",
      phase: "Three Phase",
      variants: "7.5/10HP - ₹4800, 15HP - ₹5500",
    }),
    price: 4800,
    images: images(["/images/AIR BREAK STARTERS & SWITCHES/8-3.PNG"]),
    order: 3,
    featured: true,
  },
  {
    name: "Reversing Starter",
    slug: "reversing-starter",
    categorySlug: "air-break-starters-switches",
    description: "Reversing starter for three phase motors that enables forward and reverse rotation with built-in protection.",
    specifications: specs({
      type: "Reversing Starter",
      phase: "Three Phase",
      variants: "1-7.5HP - ₹9200, 10/15HP - ₹10800",
    }),
    price: 9200,
    images: images(["/images/AIR BREAK STARTERS & SWITCHES/8-1.PNG"]),
    order: 4,
    featured: false,
  },

  // ===== MAIN SWITCHES & CHANGEOVERS =====
  {
    name: "Main Switches with Rewirable Porcelain Fuse (NMS)",
    slug: "main-switches-rewirable-porcelain-fuse-nms",
    categorySlug: "main-switches-changecovers",
    description: "Main switches with rewirable porcelain fuse for circuit protection in residential and commercial installations.",
    specifications: specs({
      model: "NMS",
      type: "Main Switch with Porcelain Fuse",
      variants: "NMS-32/220DP - ₹800, NMS-63/415DP - ₹1900, NMS-32/415TPN - ₹1300, NMS-63/415TPN - ₹2600, NMS-100/415TPN - ₹3800, NMS-200/415TPN - ₹6600, NMS-320/415TPN - ₹8500",
    }),
    price: 800,
    images: images(["/images/MAIN SWITCHES & CHANGEOVERS/9-1.PNG"]),
    order: 1,
    featured: false,
  },
  {
    name: "Switch Fuse Unit (NSFU)",
    slug: "switch-fuse-unit-nsfu",
    categorySlug: "main-switches-changecovers",
    description: "Switch fuse units for combined switching and fuse protection in power distribution systems.",
    specifications: specs({
      model: "NSFU",
      type: "Switch Fuse Unit",
      voltage: "415V",
      variants: "63A/415 - ₹4500, 100A/415 - ₹5700, 200A/415 - ₹8500, 320A/415 - ₹9500, 400A/415 - ₹15000, 500A/415 - ₹18200, 630A/415 - ₹26000",
    }),
    price: 4500,
    images: images(["/images/MAIN SWITCHES & CHANGEOVERS/9-2.PNG"]),
    order: 2,
    featured: false,
  },
  {
    name: "Off Load Change Over Switch (NMCO)",
    slug: "off-load-change-over-switch-nmco",
    categorySlug: "main-switches-changecovers",
    description: "Off load changeover switches for manual transfer between two power sources including knife type models.",
    specifications: specs({
      model: "NMCO",
      type: "Off Load Changeover Switch",
      variants: "NMCO-32/220DP - ₹800, NMCO-63/415DP - ₹2050, NMCO-32/415FP - ₹1450, NMCO-63/415FP - ₹2900, NMCO-100/415FP - ₹4900, NMCO-100/415FP(Knife) - ₹5500, NMCO-200/415FP(Knife) - ₹9800, NMCO-320/415FP(Knife) - ₹11000, NMCO-400/415FP(Knife) - ₹20500, NMCO-500/415FP(Knife) - ₹26000, NMCO-630/415FP(Knife) - ₹30500, NMCO-800/415FP(Knife) - ₹38000",
    }),
    price: 800,
    images: images(["/images/MAIN SWITCHES & CHANGEOVERS/9-3.PNG"]),
    order: 3,
    featured: true,
  },
  {
    name: "Distribution Boxes",
    slug: "distribution-boxes",
    categorySlug: "main-switches-changecovers",
    description: "Distribution boxes with ELCB protection for residential and commercial power distribution.",
    specifications: specs({
      type: "Distribution Box",
      variants: "63A Single Phase (ELCB 2P) - ₹4500, 63A Three Phase (ELCB 4P) - ₹5800, 63A Hut Type - ₹8500, 100A Hut Type - ₹14000",
    }),
    price: 4500,
    images: images(["/images/MAIN SWITCHES & CHANGEOVERS/9-3.PNG"]),
    order: 4,
    featured: false,
  },

  // ===== A.C. BOX & SOCKET TYPE DISTRIBUTION PANELS =====
  {
    name: "Metal Boxes",
    slug: "metal-boxes",
    categorySlug: "ac-box-socket-distribution-panels",
    description: "Sturdy metal boxes for AC distribution in single phase and three phase installations.",
    specifications: specs({
      type: "Metal Box",
      variants: "DP 20A/240V - ₹450, TP 20A/440V - ₹650, TP 32A/440V - ₹850",
    }),
    price: 450,
    images: images(["/images/A.C. BOX & SOCKET TYPE DISTRIBUTION PANELS/10-1.PNG"]),
    order: 1,
    featured: false,
  },
  {
    name: "Hut Type Feeder Pillar",
    slug: "hut-type-feeder-pillar",
    categorySlug: "ac-box-socket-distribution-panels",
    description: "Hut type feeder pillar panels for outdoor power distribution with robust weather protection.",
    specifications: specs({
      type: "Feeder Pillar",
      variants: "63A 4P - ₹8500, 100A 4P - ₹14000",
    }),
    price: 8500,
    images: images(["/images/A.C. BOX & SOCKET TYPE DISTRIBUTION PANELS/10-2.PNG"]),
    order: 2,
    featured: true,
  },
  {
    name: "IP 65 PVC Distribution Panel",
    slug: "ip-65-pvc-distribution-panel",
    categorySlug: "ac-box-socket-distribution-panels",
    description: "IP 65 rated PVC distribution panels for dust and water protected power distribution. Customized pricing available.",
    specifications: specs({
      type: "PVC Distribution Panel",
      rating: "IP 65",
      note: "Customized pricing on request",
    }),
    price: null,
    images: images(["/images/A.C. BOX & SOCKET TYPE DISTRIBUTION PANELS/10-3.PNG", "/images/A.C. BOX & SOCKET TYPE DISTRIBUTION PANELS/10-4.PNG"]),
    order: 3,
    featured: false,
  },

  // ===== AUTOMATIC WATER LEVEL CONTROLLERS =====
  {
    name: "Submersible Pump Controller (NSMT)",
    slug: "submersible-pump-controller-nsmt",
    categorySlug: "automatic-water-level-controllers",
    description: "Automatic submersible pump controller for single phase pumps with dry run protection.",
    specifications: specs({
      model: "NSMT",
      type: "Submersible Pump Controller",
      phase: "Single Phase",
      price: "₹2750",
    }),
    price: 2750,
    images: images(["/images/AUTOMATIC WATER LEVEL CONTROLLERS/11-1.PNG"]),
    order: 1,
    featured: false,
  },
  {
    name: "Supply Water Pump Controller",
    slug: "supply-water-pump-controller",
    categorySlug: "automatic-water-level-controllers",
    description: "Automatic supply water pump controller for single phase pumps to maintain consistent water supply.",
    specifications: specs({
      type: "Supply Water Pump Controller",
      phase: "Single Phase",
      price: "₹2800",
    }),
    price: 2800,
    images: images(["/images/AUTOMATIC WATER LEVEL CONTROLLERS/11-2.PNG"]),
    order: 2,
    featured: false,
  },
  {
    name: "Over Headed & Underground Tank Controller (NUTLT)",
    slug: "over-headed-underground-tank-controller-nutlt",
    categorySlug: "automatic-water-level-controllers",
    description: "Controller for managing both overhead and underground tank water levels automatically.",
    specifications: specs({
      model: "NUTLT",
      type: "Dual Tank Controller",
      phase: "Single Phase",
      price: "₹2800",
    }),
    price: 2800,
    images: images(["/images/AUTOMATIC WATER LEVEL CONTROLLERS/11-3.PNG"]),
    order: 3,
    featured: false,
  },
  {
    name: "Float Switch Controller (NWLC)",
    slug: "float-switch-controller-nwlc",
    categorySlug: "automatic-water-level-controllers",
    description: "Float switch based water level controller for reliable pump operation based on tank water levels.",
    specifications: specs({
      model: "NWLC",
      type: "Float Switch Controller",
      phase: "Single Phase",
      price: "₹3000",
    }),
    price: 3000,
    images: images(["/images/AUTOMATIC WATER LEVEL CONTROLLERS/11-4.PNG"]),
    order: 4,
    featured: false,
  },
  {
    name: "Time Switch Controller",
    slug: "time-switch-controller",
    categorySlug: "automatic-water-level-controllers",
    description: "Time switch controller for scheduled pump operation with automatic timer functionality.",
    specifications: specs({
      type: "Time Switch Controller",
      phase: "Single Phase",
      price: "₹3500",
    }),
    price: 3500,
    images: images(["/images/AUTOMATIC WATER LEVEL CONTROLLERS/11-5.PNG"]),
    order: 5,
    featured: false,
  },
  {
    name: "Semi Automatic Water Level Controller (SEMI)",
    slug: "semi-automatic-water-level-controller-semi",
    categorySlug: "automatic-water-level-controllers",
    description: "Semi automatic water level controller requiring manual start with automatic stop at full tank level.",
    specifications: specs({
      model: "SEMI",
      type: "Semi Automatic Water Level Controller",
      phase: "Single Phase",
      price: "₹1700",
    }),
    price: 1700,
    images: images(["/images/AUTOMATIC WATER LEVEL CONTROLLERS/11-6.PNG"]),
    order: 6,
    featured: false,
  },
  {
    name: "Water Level Indicator with Alarm (NWLI)",
    slug: "water-level-indicator-with-alarm-nwli",
    categorySlug: "automatic-water-level-controllers",
    description: "Water level indicator with audio alarm to alert when tank is full or empty.",
    specifications: specs({
      model: "NWLI",
      type: "Water Level Indicator",
      phase: "Single Phase",
      price: "₹1100",
    }),
    price: 1100,
    images: images(["/images/AUTOMATIC WATER LEVEL CONTROLLERS/11-7.PNG"]),
    order: 7,
    featured: false,
  },
  {
    name: "Auto Switch Chowkidar (NMO)",
    slug: "auto-switch-chowkidar-nmo",
    categorySlug: "automatic-water-level-controllers",
    description: "Auto switch chowkidar for automatic phase monitoring and switching in three phase installations.",
    specifications: specs({
      model: "NMO",
      type: "Auto Switch Chowkidar",
      phase: "Three Phase",
      variants: "6 Wire - ₹425, 9 Wire - ₹750",
    }),
    price: 425,
    images: images(["/images/AUTOMATIC WATER LEVEL CONTROLLERS/11-8.PNG"]),
    order: 8,
    featured: false,
  },

  // ===== DIGITAL MEASURING INSTRUMENTS & A.C DRIVES =====
  {
    name: "Digital Amp./Voltage Meter",
    slug: "digital-amp-voltage-meter",
    categorySlug: "digital-measuring-instruments-ac-drives",
    description: "Digital ammeter/voltmeter for accurate measurement of electrical parameters in panel boards.",
    specifications: specs({
      type: "Digital Amp./Voltage Meter",
      variants: "96x96mm - ₹800, 72x72mm - ₹700",
    }),
    price: 700,
    images: images(["/images/DIGITAL MEASURING INSTRU. & A.C Drives/12-1.PNG", "/images/DIGITAL MEASURING INSTRU. & A.C Drives/12-2.PNG"]),
    order: 1,
    featured: false,
  },
  {
    name: "Digital Combined Amp./Volt Meter",
    slug: "digital-combined-amp-volt-meter",
    categorySlug: "digital-measuring-instruments-ac-drives",
    description: "Combined digital ammeter and voltmeter in a single unit for space-saving panel installation.",
    specifications: specs({
      type: "Digital Combined Meter",
      variants: "96x96mm - ₹850, 72x72mm - ₹650",
    }),
    price: 650,
    images: images(["/images/DIGITAL MEASURING INSTRU. & A.C Drives/12-3.PNG"]),
    order: 2,
    featured: false,
  },
  {
    name: "Digital VAF Meter",
    slug: "digital-vaf-meter",
    categorySlug: "digital-measuring-instruments-ac-drives",
    description: "Digital Volt-Amp-Frequency meter for comprehensive power monitoring in electrical installations.",
    specifications: specs({
      type: "Digital VAF Meter",
      size: "96x96mm",
      price: "₹2500",
    }),
    price: 2500,
    images: images(["/images/DIGITAL MEASURING INSTRU. & A.C Drives/12-4.PNG"]),
    order: 3,
    featured: true,
  },
  {
    name: "VFD Panels",
    slug: "vfd-panels",
    categorySlug: "digital-measuring-instruments-ac-drives",
    description: "Variable Frequency Drive panels for speed control of AC motors. Customized pricing on request.",
    specifications: specs({
      type: "VFD Panel",
      note: "Customized pricing on request",
    }),
    price: null,
    images: images(["/images/DIGITAL MEASURING INSTRU. & A.C Drives/12-4.PNG"]),
    order: 4,
    featured: false,
  },

  // ===== AUTOMATIC POWER FACTOR CONTROL PANEL =====
  {
    name: "Single Phase Up to 5 KVR (NTSC)",
    slug: "single-phase-up-to-5-kvr-ntsc",
    categorySlug: "automatic-power-factor-control-panel",
    description: "Single phase automatic power factor control panel up to 5 KVR for improving power factor in single phase installations.",
    specifications: specs({
      model: "NTSC",
      type: "Power Factor Control Panel",
      phase: "Single Phase",
      capacity: "Up to 5 KVR",
      price: "₹22500",
    }),
    price: 22500,
    images: images(["/images/AUTOMATIC POWER FAC. CONTROL PANEL/13-1.PNG"]),
    order: 1,
    featured: false,
  },
  {
    name: "Three Phase Up to 20 KVR",
    slug: "three-phase-up-to-20-kvr",
    categorySlug: "automatic-power-factor-control-panel",
    description: "Three phase automatic power factor control panel up to 20 KVR for commercial power factor correction.",
    specifications: specs({
      type: "Power Factor Control Panel",
      phase: "Three Phase",
      capacity: "Up to 20 KVR",
      price: "₹22500",
    }),
    price: 22500,
    images: images(["/images/AUTOMATIC POWER FAC. CONTROL PANEL/13-1.PNG"]),
    order: 2,
    featured: false,
  },
  {
    name: "Three Phase Up to 50 KVR",
    slug: "three-phase-up-to-50-kvr",
    categorySlug: "automatic-power-factor-control-panel",
    description: "Three phase automatic power factor control panel up to 50 KVR for industrial power factor correction.",
    specifications: specs({
      type: "Power Factor Control Panel",
      phase: "Three Phase",
      capacity: "Up to 50 KVR",
      price: "₹48000",
    }),
    price: 48000,
    images: images(["/images/AUTOMATIC POWER FAC. CONTROL PANEL/13-1.PNG"]),
    order: 3,
    featured: true,
  },

  // ===== AUTOMATIC MAINS FAILURE =====
  {
    name: "AMF Panel - Up to 20KVA",
    slug: "amf-panel-up-to-20kva",
    categorySlug: "automatic-mains-failure",
    description: "Automatic Mains Failure panel for generators up to 20KVA with 60A capacity for automatic generator start on power failure.",
    specifications: specs({
      type: "AMF Panel",
      capacity: "Up to 20KVA",
      rating: "60A",
      price: "₹19000",
    }),
    price: 19000,
    images: images(["/images/AUTOMATIC MAINS FAILURE/14-1.PNG"]),
    order: 1,
    featured: true,
  },
  {
    name: "AMF Panel - Up to 62KVA",
    slug: "amf-panel-up-to-62kva",
    categorySlug: "automatic-mains-failure",
    description: "Automatic Mains Failure panel for generators up to 62KVA with 100A capacity for larger installations.",
    specifications: specs({
      type: "AMF Panel",
      capacity: "Up to 62KVA",
      rating: "100A",
      price: "₹48000",
    }),
    price: 48000,
    images: images(["/images/AUTOMATIC MAINS FAILURE/14-1.PNG"]),
    order: 2,
    featured: false,
  },
  {
    name: "AMF Panel with Battery Charger",
    slug: "amf-panel-with-battery-charger",
    categorySlug: "automatic-mains-failure",
    description: "Automatic Mains Failure panel with integrated battery charger for continuous battery maintenance. Available against order.",
    specifications: specs({
      type: "AMF Panel with Battery Charger",
      note: "Available against order",
    }),
    price: null,
    images: images(["/images/AUTOMATIC MAINS FAILURE/14-1.PNG"]),
    order: 3,
    featured: false,
  },

  // ===== SOLAR PANELS =====
  {
    name: "Customized Solar Panels (IP 65)",
    slug: "customized-solar-panels-ip65",
    categorySlug: "solar-panels",
    description: "We customize all kinds of solar panels in IP 65 enclosures for reliable outdoor solar power installations.",
    specifications: specs({
      type: "Solar Panel System",
      rating: "IP 65",
      note: "Customized pricing on request",
    }),
    price: null,
    images: images(["/images/SOLAR PANELS/15-1.PNG"]),
    order: 1,
    featured: true,
  },

  // ===== HUT TYPE PANEL (IP 55) =====
  {
    name: "Feeder Pillar Type Panels for D.O.I. Motors",
    slug: "feeder-pillar-type-panels-doi-motors",
    categorySlug: "hut-type-panel-ip55",
    description: "Feeder pillar type hut panels with IP 55 protection for Direct On Line motor installations. Available against order.",
    specifications: specs({
      type: "Feeder Pillar / Hut Type Panel",
      rating: "IP 55",
      application: "D.O.I. Motors",
      note: "Available against order",
    }),
    price: null,
    images: images([]),
    order: 1,
    featured: false,
  },
];

async function main() {
  console.log("🌱 Seeding database...\n");

  // Clear existing data
  console.log("Clearing existing data...");
  await db.product.deleteMany();
  await db.category.deleteMany();

  // Create categories
  console.log("Creating categories...");
  const createdCategories: Record<string, string> = {};

  for (const cat of categoriesData) {
    const created = await db.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        order: cat.order,
      },
    });
    createdCategories[cat.slug] = created.id;
    console.log(`  ✓ ${cat.name} (${cat.slug})`);
  }

  // Create products
  console.log("\nCreating products...");
  let productCount = 0;

  for (const product of productsData) {
    const categoryId = createdCategories[product.categorySlug];
    if (!categoryId) {
      console.error(`  ✗ Category not found: ${product.categorySlug} for product: ${product.name}`);
      continue;
    }

    await db.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        specifications: product.specifications,
        price: product.price,
        categoryId,
        images: product.images,
        order: product.order,
        featured: product.featured,
      },
    });
    productCount++;
    console.log(`  ✓ [${product.categorySlug}] ${product.name}`);
  }

  console.log(`\n✅ Seeding complete!`);
  console.log(`   Categories: ${categoriesData.length}`);
  console.log(`   Products: ${productCount}`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
