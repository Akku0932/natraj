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

// Helper to create features JSON array string
function featuresList(items: string[]): string {
  return JSON.stringify(items);
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
  usage?: string;
  features?: string;
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
      variants: "1HP / 2HP / 3HP / 5HP / 7.5HP - ₹8700, 10HP - ₹9900, 15HP - ₹11700, 20HP - ₹13200",
    }),
    usage: "Used for starting and controlling three phase motors in industrial applications, water pumping stations, and agricultural setups. Suitable for direct online starting of motors up to 20HP.",
    features: featuresList([
      "Direct On Line motor starting",
      "Thermal overload relay protection",
      "Single/double phasing prevention",
      "Compact and robust design",
      "Available in 1HP to 20HP range",
      "Durable powder-coated enclosure",
    ]),
    price: 8700,
    images: images(["/images/THREE PHASE PANELS/1.PNG"]),
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
      variants: "7.5/10/15HP - ₹19500, 20HP - ₹21000, 30HP - ₹27750, 40HP - ₹46500, 50HP - ₹54000",
    }),
    usage: "Used for smooth starting of large three phase motors (7.5HP to 50HP) by reducing inrush current. Ideal for heavy industrial applications, HVAC systems, and large water pumping installations.",
    features: featuresList([
      "Star-Delta starting for reduced inrush current",
      "Automatic star-to-delta transition timer",
      "Air break contactors for long life",
      "Single/double phasing prevention",
      "Available in 7.5HP to 50HP range",
      "Heavy duty construction",
    ]),
    price: 19500,
    images: images(["/images/THREE PHASE PANELS/2-2.PNG"]),
    order: 2,
    featured: true,
  },
  {
    name: "HUT TYPE PANEL (IP 55)",
    slug: "hut-type-panel-ip-55-deluxe",
    categorySlug: "three-phase-panels",
    description: "Hut type feeder pillar panel with IP 55 protection rating for outdoor motor and pump installations. Robust weatherproof enclosure suitable for harsh environments.",
    specifications: specs({
      type: "Hut Type Panel",
      rating: "IP 55",
      application: "Outdoor Motor / Pump Installations",
      note: "Available against order",
    }),
    usage: "Ideal for outdoor installations at construction sites, industrial complexes, agricultural pump houses, water treatment plants, and municipal water supply stations where weather protection is critical.",
    features: featuresList([
      "IP 55 rated weatherproof enclosure",
      "Heavy duty powder-coated MS body",
      "Stainless steel hinges and locks",
      "Cable entry from bottom",
      "Earthling arrangement provided",
      "Available for DOL / Star-Delta motors",
    ]),
    price: null,
    images: images([]),  // No image available
    order: 3,
    featured: false,
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
      variants: "0.75/1HP - ₹1425, 1.5HP - ₹1500, 1.5HP - ₹1575",
    }),
    usage: "Designed for oil-filled submersible pumps used in borewells and deep wells for agricultural and domestic water supply.",
    features: featuresList([
      "Oil-filled pump compatibility",
      "Built-in motor overload protection",
      "Capacitor start/run mechanism",
      "Compact wall-mountable design",
      "Available in 0.75HP to 1.5HP",
      "LED power indicator",
    ]),
    price: 1425,
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
      variants: "1HP - ₹2730, 1.5HP - ₹2850, 2HP - ₹3000",
    }),
    usage: "Used with water-filled submersible pumps for borewell and openwell applications in agriculture and domestic water supply systems.",
    features: featuresList([
      "Water-filled pump compatibility",
      "Motor protection with OLR",
      "Easy installation and maintenance",
      "Available in 1HP to 2HP",
      "Compact and reliable design",
    ]),
    price: 2730,
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
      variants: "1HP - ₹4200, 1.5HP - ₹4500, 2HP - ₹5100, 3HP - ₹6000, 5HP - ₹12000",
    }),
    usage: "Deluxe control panel with digital metering for monitoring voltage, current, and frequency in real-time. Used with water-filled submersible pumps.",
    features: featuresList([
      "Digital panel meter (Volt/Amp/Freq)",
      "Motor overload protection",
      "Auto dry-run prevention",
      "Available in 1HP to 5HP",
      "Premium powder-coated enclosure",
      "Real-time power monitoring",
    ]),
    price: 4200,
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
      variants: "30A - ₹1913, 60A - ₹4905, 100A - ₹12000",
    }),
    usage: "Automatically switches between mains supply and backup power (generator/inverter) in single phase installations for homes, offices, and small commercial setups.",
    features: featuresList([
      "Fully automatic transfer switching",
      "MCB protection on both sources",
      "No manual intervention needed",
      "Available in 30A to 100A",
      "Compact design suitable for residential use",
    ]),
    price: 1913,
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
      variants: "60A - ₹8730, 100A - ₹21000, 200A - ₹36750",
    }),
    usage: "Automatic transfer switch for three phase installations in commercial buildings, factories, and large facilities.",
    features: featuresList([
      "Three phase automatic transfer",
      "Available in 60A to 200A",
      "Single operator mechanism",
      "Electrical and mechanical interlocking",
      "Suitable for DG set applications",
    ]),
    price: 8730,
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
      variants: "30A - ₹8250, 60A - ₹12300, 100A - ₹25950, 200A - ₹38250",
    }),
    usage: "Protects three phase equipment from damage caused by incorrect phase sequence or phase failure.",
    features: featuresList([
      "Automatic phase sequence correction",
      "Protection against phase reversal",
      "Phase failure detection",
      "Available in 30A to 200A",
      "Essential for sensitive 3-phase equipment",
    ]),
    price: 8250,
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
      variants: "60A - ₹10950, 100A - ₹25500, 200A - ₹37500",
    }),
    usage: "Used for automatic changeover between three phase supply phases to maintain continuous power supply and balance load.",
    features: featuresList([
      "Automatic phase changeover",
      "Load balancing capability",
      "Available in 60A to 200A",
      "Motor-driven switching mechanism",
    ]),
    price: 10950,
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
      variants: "1-3HP - ₹12300",
    }),
    usage: "Controls multiple single phase pumps or motors in a timed sequence for water distribution systems and irrigation.",
    features: featuresList([
      "Automatic sequential operation",
      "Adjustable timer settings",
      "Pump failure detection and skip",
      "Manual override facility",
      "Available for 1-3HP pumps",
    ]),
    price: 12300,
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
      variants: "1-7.5HP - ₹15000",
    }),
    usage: "Industrial sequence timer panel for controlling multiple three phase motors in a timed sequence.",
    features: featuresList([
      "Multi-motor sequential control",
      "Adjustable on/off timers",
      "Pump failure auto-bypass",
      "Available for 1-7.5HP motors",
      "Industrial-grade components",
    ]),
    price: 15000,
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
      variants: "1-3KW - ₹12000, 1-5KW - ₹15300",
    }),
    usage: "Used for precise temperature control in heating systems, industrial ovens, packaging machines, and plastic molding.",
    features: featuresList([
      "PID temperature controller",
      "SSR/Triac output control",
      "PT-100/R TD sensor input",
      "Temperature range up to 400°C",
      "Available in 1-5KW",
      "Digital temperature display",
    ]),
    price: 12000,
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
      variants: "Up to 10KW - ₹18000",
    }),
    usage: "Industrial temperature control panel for large heating systems, furnaces, and process heating applications.",
    features: featuresList([
      "Three phase heating control",
      "PID temperature controller",
      "SCR power control",
      "Up to 10KW capacity",
      "Over-temperature protection",
      "Digital display with alarm",
    ]),
    price: 18000,
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
      variants: "7.5/10/15HP - ₹3300, 20HP - ₹3600",
    }),
    usage: "Oil immersed DOL starter for starting three phase motors in harsh environments like agricultural fields, mines, and dusty industrial areas.",
    features: featuresList([
      "Oil immersion for arc quenching",
      "DOL motor starting",
      "Compact and robust",
      "Available in 7.5HP to 20HP",
      "Weather-resistant construction",
    ]),
    price: 3300,
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
      variants: "10/15HP - ₹9000, 20HP - ₹9300, 30HP - ₹9900, 35HP - ₹9900",
    }),
    usage: "Semi-automatic star-delta oil immersed starter for controlled starting of heavy motors in industrial and agricultural settings.",
    features: featuresList([
      "Star-Delta starting method",
      "Oil immersed contactors",
      "Semi-automatic operation",
      "Available in 10HP to 35HP",
      "Long contactor life",
    ]),
    price: 9000,
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
      variants: "10/15HP - ₹9300, 20HP - ₹10500, 30HP - ₹10500, 35HP - ₹10500",
    }),
    usage: "Fully automatic star-delta oil immersed starter for hands-free motor starting. Ideal for remote and unattended pump installations.",
    features: featuresList([
      "Fully automatic operation",
      "Star-Delta starting method",
      "Oil immersed contactors for longevity",
      "Available in 10HP to 35HP",
      "No manual intervention needed",
    ]),
    price: 9300,
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
      variants: "20/25/30HP - ₹15000, 40HP - ₹15750, 50/60HP - ₹16500, 60/80HP - ₹29700, 100HP - ₹30750, 150HP - ₹33150, 200HP - ₹48000",
    }),
    usage: "Manual star-delta oil immersed starter for heavy duty motor starting applications in industrial and agricultural setups.",
    features: featuresList([
      "Manual star-delta operation",
      "Oil immersed switching elements",
      "Very long service life",
      "Available in 20HP to 200HP",
      "Heavy duty construction",
      "Suitable for harsh environments",
    ]),
    price: 15000,
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
      variants: "20/25/30HP - ₹15000, 40HP - ₹15750, 50/60HP - ₹16500, 60/80HP - ₹29700, 100HP - ₹30750, 150HP - ₹33150, 200HP - ₹48000",
    }),
    usage: "Heavy duty oil immersed starter with double contact mechanism for enhanced reliability in demanding applications.",
    features: featuresList([
      "Double contact mechanism",
      "Oil immersed construction",
      "Same as NSD but enhanced reliability",
      "Available in 20HP to 200HP",
      "Industrial-grade design",
    ]),
    price: 15000,
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
      variants: "63A/415V - ₹2100, 100A/415V - ₹3450, 200A/415V - ₹6150, 300A/415V - ₹8100, 400A/415V - ₹10500, 500A/415V - ₹12750, 600A/415V - ₹15000",
    }),
    usage: "Used for reliable power distribution in commercial buildings, industrial plants, data centers, and large residential complexes.",
    features: featuresList([
      "Three phase four wire system",
      "Copper/aluminum busbar conductors",
      "Available in 63A to 600A",
      "Compact modular design",
      "Easy installation and expansion",
      "Short circuit withstand rating",
    ]),
    price: 2100,
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
      variants: "16A - ₹525, 25A - ₹623, 32A - ₹1350, 63A - ₹3750",
    }),
    usage: "Used for changing motor rotation direction in three phase installations like conveyors, cranes, hoists, and machine tools.",
    features: featuresList([
      "Forward/reverse motor operation",
      "Electrical and mechanical interlocking",
      "Available in 16A to 63A",
      "Compact design",
      "Durable construction",
    ]),
    price: 525,
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
      variants: "1-7.5HP (TP) - ₹1950, 10HP (TP) - ₹2100",
    }),
    usage: "Direct online motor starter for three phase motor starting with overcurrent protection in industrial applications.",
    features: featuresList([
      "Air break contactors",
      "Overload relay protection",
      "Available in 1-10HP range",
      "IP rated enclosure",
      "Easy maintenance",
    ]),
    price: 1950,
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
      variants: "7.5/10HP - ₹7200, 15HP - ₹8250",
    }),
    usage: "Fully automatic star-delta starter for smooth starting of three phase motors (7.5-15HP) with reduced inrush current.",
    features: featuresList([
      "Fully automatic star-delta switching",
      "Adjustable timer",
      "Overload and single phasing protection",
      "Available in 7.5HP to 15HP",
      "Air break contactors",
    ]),
    price: 7200,
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
      variants: "1-7.5HP - ₹13800, 10/15HP - ₹16200",
    }),
    usage: "Reversing starter for three phase motors that enables forward and reverse rotation with built-in protection.",
    features: featuresList([
      "Forward/reverse motor control",
      "Built-in protection features",
      "Thermal overload relay",
      "Available in 1-15HP range",
    ]),
    price: 13800,
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
      variants: "NMS-32/220DP - ₹1200, NMS-63/415DP - ₹2850, NMS-32/415TPN - ₹1950, NMS-63/415TPN - ₹3900, NMS-100/415TPN - ₹5700, NMS-200/415TPN - ₹9900, NMS-320/415TPN - ₹12750",
    }),
    usage: "Main switches with rewirable porcelain fuse for circuit protection in residential buildings, commercial complexes, and small industries.",
    features: featuresList([
      "Rewirable porcelain fuse carriers",
      "Available in single and three phase",
      "DP and TPN configurations",
      "32A to 320A range",
      "ISI marked components",
    ]),
    price: 1200,
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
      variants: "63A/415 - ₹6750, 100A/415 - ₹8550, 200A/415 - ₹12750, 320A/415 - ₹14250, 400A/415 - ₹22500, 500A/415 - ₹27300, 630A/415 - ₹39000",
    }),
    usage: "Switch fuse units for combined switching and fuse protection in power distribution systems for industrial and commercial installations.",
    features: featuresList([
      "Combined switch and fuse unit",
      "Available in 63A to 630A",
      "Three phase configurations",
      "Heavy duty construction",
      "Suitable for transformer protection",
    ]),
    price: 6750,
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
      variants: "NMCO-32/220DP - ₹1200, NMCO-63/415DP - ₹3075, NMCO-32/415FP - ₹2175, NMCO-63/415FP - ₹4350, NMCO-100/415FP - ₹7350, NMCO-100/415FP(Knife) - ₹8250, NMCO-200/415FP(Knife) - ₹14700, NMCO-320/415FP(Knife) - ₹16500, NMCO-400/415FP(Knife) - ₹30750, NMCO-500/415FP(Knife) - ₹39000, NMCO-630/415FP(Knife) - ₹45750, NMCO-800/415FP(Knife) - ₹57000",
    }),
    usage: "Off load changeover switches for manual transfer between two power sources including knife type models for heavy duty applications.",
    features: featuresList([
      "Off load manual transfer",
      "Knife type options available",
      "Available in 32A to 800A",
      "DP/FP/TPN configurations",
      "Suitable for DG set changeover",
    ]),
    price: 1200,
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
      variants: "63A Single Phase (ELCB 2P) - ₹6750, 63A Three Phase (ELCB 4P) - ₹8700, 63A Hut Type - ₹12750, 100A Hut Type - ₹21000",
    }),
    usage: "Distribution boxes with ELCB protection for residential and commercial power distribution with individual circuit protection.",
    features: featuresList([
      "ELCB protection included",
      "Available in single and three phase",
      "Hut type option available",
      "Multiple MCB slots",
      "Compact and secure design",
    ]),
    price: 6750,
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
      variants: "DP 20A/240V - ₹675, TP 20A/440V - ₹975, TP 32A/440V - ₹1275",
    }),
    usage: "Metal boxes for AC power distribution in single phase and three phase residential and commercial installations.",
    features: featuresList([
      "Sturdy MS sheet construction",
      "Powder-coated finish",
      "Available in DP/TP configurations",
      "20A to 32A range",
      "Pre-punched cable entry",
    ]),
    price: 675,
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
      variants: "63A 4P - ₹12750, 100A 4P - ₹21000",
    }),
    usage: "Outdoor feeder pillar panels for power distribution in residential colonies, industrial areas, and commercial complexes.",
    features: featuresList([
      "Weatherproof outdoor construction",
      "Available in 63A to 100A",
      "Four pole configuration",
      "Pad-lockable door",
      "Cable entry from bottom",
    ]),
    price: 12750,
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
    usage: "IP 65 rated PVC distribution panels for dust and water protected power distribution in industrial and outdoor environments.",
    features: featuresList([
      "IP 65 dust and water protection",
      "PVC/FRP construction",
      "Corrosion resistant",
      "Customized configurations",
      "Suitable for harsh environments",
    ]),
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
      price: "₹4125",
    }),
    usage: "Automatic controller for single phase submersible pumps with dry run protection. Used in domestic and agricultural water supply systems.",
    features: featuresList([
      "Dry run protection",
      "Auto start/stop based on tank level",
      "Single phase operation",
      "LED indicators for status",
      "Easy sensor installation",
    ]),
    price: 4125,
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
      price: "₹4200",
    }),
    usage: "Controls supply water pumps automatically based on water demand for maintaining consistent water pressure in buildings.",
    features: featuresList([
      "Demand-based pump control",
      "Automatic start/stop",
      "Pressure sensor integration",
      "Single phase compatible",
    ]),
    price: 4200,
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
      price: "₹4200",
    }),
    usage: "Dual tank controller for managing both overhead and underground tank water levels automatically.",
    features: featuresList([
      "Dual tank monitoring",
      "Auto fill overhead from underground",
      "Prevents overflow and dry run",
      "Single phase operation",
      "Manual override facility",
    ]),
    price: 4200,
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
      price: "₹4500",
    }),
    usage: "Float switch based water level controller for reliable pump operation based on tank water levels.",
    features: featuresList([
      "Float switch based sensing",
      "No electronic sensor needed",
      "Simple and reliable operation",
      "Easy installation",
      "Long service life",
    ]),
    price: 4500,
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
      price: "₹5250",
    }),
    usage: "Time-based pump controller for scheduled water pumping operations in municipal and agricultural systems.",
    features: featuresList([
      "Programmable timer",
      "Multiple on/off schedules",
      "Battery backup for settings",
      "Manual override option",
      "Digital time display",
    ]),
    price: 5250,
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
      price: "₹2550",
    }),
    usage: "Semi automatic controller requiring manual pump start with automatic stop when tank is full.",
    features: featuresList([
      "Manual start, auto stop",
      "Cost-effective solution",
      "Prevents tank overflow",
      "Simple operation",
      "Suitable for domestic use",
    ]),
    price: 2550,
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
      price: "₹1650",
    }),
    usage: "Water level indicator with audio alarm to alert when tank is full or empty, preventing overflow and dry running.",
    features: featuresList([
      "Audio alarm for high/low levels",
      "LED level indication",
      "Simple installation",
      "No power consumption on standby",
      "Suitable for all tank types",
    ]),
    price: 1650,
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
      variants: "6 Wire - ₹638, 9 Wire - ₹1125",
    }),
    usage: "Auto switch chowkidar for automatic phase monitoring and switching in three phase installations to prevent single phasing damage.",
    features: featuresList([
      "Automatic phase monitoring",
      "Prevents single phasing",
      "Available in 6/9 wire configurations",
      "Three phase compatible",
      "Motor protection",
    ]),
    price: 638,
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
      variants: "96x96mm - ₹1200, 72x72mm - ₹1050",
    }),
    usage: "Used in electrical panel boards for accurate measurement of voltage and current in power distribution systems.",
    features: featuresList([
      "Digital LED display",
      "96x96mm and 72x72mm sizes",
      "High accuracy measurement",
      "Easy panel mounting",
      "Wide input range",
    ]),
    price: 1050,
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
      variants: "96x96mm - ₹1275, 72x72mm - ₹975",
    }),
    usage: "Combined ammeter and voltmeter in a single unit for space-saving panel board installation.",
    features: featuresList([
      "Dual parameter display",
      "Space-saving single unit",
      "96x96mm and 72x72mm sizes",
      "Clear LED display",
      "Panel mount design",
    ]),
    price: 975,
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
      price: "₹3750",
    }),
    usage: "Comprehensive power monitoring meter displaying voltage, amperes, and frequency in electrical installations.",
    features: featuresList([
      "Volt/Amp/Frequency display",
      "96x96mm panel mount",
      "High precision measurement",
      "Multi-parameter monitoring",
      "Industrial grade",
    ]),
    price: 3750,
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
    usage: "Variable Frequency Drive panels for speed control of AC motors in industrial applications like HVAC, pumps, and conveyors.",
    features: featuresList([
      "Variable speed control",
      "Energy efficient operation",
      "Customized configurations",
      "Digital display and controls",
      "Multiple protection features",
    ]),
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
      price: "₹33750",
    }),
    usage: "Improves power factor in single phase installations reducing electricity bills and improving system efficiency.",
    features: featuresList([
      "Automatic capacitor switching",
      "Digital PF meter display",
      "Up to 5 KVR capacity",
      "Compact panel design",
      "Reduced energy costs",
    ]),
    price: 33750,
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
      price: "₹33750",
    }),
    usage: "Power factor correction panel for commercial establishments like offices, shops, and small industries.",
    features: featuresList([
      "Automatic power factor correction",
      "Multi-stage capacitor bank",
      "Up to 20 KVR capacity",
      "Digital controller",
      "Reduced maximum demand charges",
    ]),
    price: 33750,
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
      price: "₹72000",
    }),
    usage: "Industrial power factor correction panel for factories and large commercial installations with heavy inductive loads.",
    features: featuresList([
      "Multi-stage APFC relay",
      "Up to 50 KVR capacity",
      "Harmonic filter capable",
      "Digital power factor display",
      "Automatic capacitor switching",
      "Reduced electricity bills significantly",
    ]),
    price: 72000,
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
      price: "₹28500",
    }),
    usage: "Automatic generator start panel for small generators up to 20KVA used in residential complexes, small offices, and commercial buildings.",
    features: featuresList([
      "Auto generator start on mains failure",
      "Auto transfer switching",
      "60A capacity",
      "Battery charger included",
      "Mains failure sensing",
    ]),
    price: 28500,
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
      price: "₹72000",
    }),
    usage: "Automatic generator start panel for medium generators up to 62KVA used in commercial buildings, hospitals, and medium industries.",
    features: featuresList([
      "Auto generator start/stop",
      "100A capacity",
      "Auto transfer switching",
      "Battery charger included",
      "Suitable for medium DG sets",
    ]),
    price: 72000,
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
    usage: "AMF panel with integrated battery charger for continuous battery maintenance in critical installations.",
    features: featuresList([
      "Integrated battery charger",
      "Automatic battery monitoring",
      "Continuous battery maintenance",
      "Available against order",
      "Suitable for critical installations",
    ]),
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
    usage: "Customized solar panel systems in IP 65 enclosures for rooftop, agricultural, and off-grid solar power installations.",
    features: featuresList([
      "IP 65 weatherproof enclosure",
      "Customized configurations",
      "MPPT charge controller compatible",
      "DC/AC protection included",
      "Suitable for rooftop and ground mount",
    ]),
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
    usage: "Outdoor feeder pillar panels with IP 55 protection for motor and pump installations in construction sites, agricultural areas, and industrial complexes.",
    features: featuresList([
      "IP 55 rated weatherproof enclosure",
      "Heavy duty MS body",
      "Powder-coated finish",
      "Stainless steel hardware",
      "Cable entry from bottom",
    ]),
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
        usage: product.usage ?? null,
        features: product.features ?? null,
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
