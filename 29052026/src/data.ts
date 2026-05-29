/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Temple, Initiative, GalleryItem } from './types';

export const TRUST_META = {
  name: "Kalavapudi Krishnamacharyulu Memorial Charitable and Dharma Trust",
  tagline: "Honoring Legacy, Serving Humanity",
  registeredYear: 2026,
  regNo: "VSP/BK4/108/2026",
  panNo: "AABTK1082M",
  taxCode80G: "CIT(EXEMPT)/VSP/80G/2026-27/A/10421",
  fcraRegNo: "FCRA-IV/0120260301",
  contact: {
    address: "Flat 402, Srinivasa Elite Apartment, Sector-5, MVP Colony, Visakhapatnam, Andhra Pradesh, India - 530017",
    email: "contact@kalavapuditrust.org",
    backupEmail: "kalavapudi.memorial@gmail.com",
    phone: "+91 94401 23456",
    altPhone: "+91 891 2701082",
    mapCoords: "17.7423° N, 83.3323° E"
  },
  bankDetails: {
    indian: {
      accountName: "Kalavapudi Krishnamacharyulu Memorial Charitable and Dharma Trust",
      accountNumber: "42031010101082",
      bankName: "State Bank of India (SBI)",
      branch: "MVP Colony Branch, Visakhapatnam",
      ifscCode: "SBIN0008023",
      micrCode: "530002012"
    },
    fcra: {
      accountName: "Kalavapudi Krishnamacharyulu Memorial Charitable and Dharma Trust (FCRA)",
      accountNumber: "42031020202099",
      bankName: "State Bank of India (SBI)",
      branch: "New Delhi Main Branch (NDMB), Parliament Street, New Delhi",
      ifscCode: "SBIN0000691",
      swiftCode: "SBININBB108"
    }
  }
};

export const PROFESSOR_BIO = {
  name: "Late Professor Kalavapudi Krishnamacharyulu",
  lifespan: "1948 – 2025",
  title: "A UNESCO educator, structural engineer, and engineering professor at Andhra University.",
  intro: "Professor Kalavapudi Krishnamacharyulu was an embodiment of intellectual brilliance, deep pedagogical vision, and selfless social service. Serving as a senior UNESCO engineering professor at Andhra University, he spent over four decades fostering values and technical expertise in thousands of students in Visakhapatnam and surrounding districts.",
  fullText: "Born in a traditional spiritual family, Professor Krishnamacharyulu devoted his entire life to the synthesis of engineering education and the restoration of ancient cultural roots. He strongly believed that true spiritual realization is not detached from social duty, famously guiding his disciples with the principle, 'Manava Sevaye Madhava Seva' (Service to Humanity is Service to God).\n\nBeyond classrooms, he actively financed the educational path of under-privileged students and spearheaded structural assistance for remote, dilapidated rural temples in Visakhapatnam, Vizianagaram, and Srikakulam districts. He believed that local community temples form the core of collective harmony and cultural self-sufficiency, yet many ancient shrines lay in severe neglect without daily oil-lamps (Dhoopa Deepa Naivedyam).\n\nEstablished in 2026 in his sacred memory by his family, colleagues, and disciples, the Kalavapudi Krishnamacharyulu Memorial Charitable and Dharma Trust proudly continues his life's sacred vision. Every contribution made is handled with maximum transparency, serving needy traditional shrines and uplifting local communities.",
  photo: ""
};

export const MISSION_VISION = {
  vision: "To build a good society with high moral values, protect our old temples and Vedic traditions, and help poor people with healthcare and free education support.",
  mission: "To continue the noble work of Late Professor Kalavapudi Krishnamacharyulu by helping old temples in and around Visakhapatnam that need urgent repairs and daily prayer support."
};

export const SUPPORTED_TEMPLES: Temple[] = [
  {
    id: "temple-1",
    name: "Sri Kodanda Rama Swamy Shrine",
    location: "Sabbavaram Rural, Visakhapatnam District",
    history: "A pristine 17th-century local temple that historically bound agrarian communities of Sabbavaram. It suffered severe water seepage damage, leaving the temple structure fragile.",
    needs: [
      "Immediate rooftop waterproofing and stone restoration",
      "Dhupa Deepa Aradhana fund to support the resident priest's livelihood",
      "Restoration of the sanctum's brass lamps and holy idol pedestal"
    ],
    status: "Urgent",
    targetAmount: 250000,
    raisedAmount: 185000
  },
  {
    id: "temple-2",
    name: "Sri Someshwara Shiva Temple",
    location: "Anandapuram Foothills, Visakhapatnam",
    history: "Overlooking ancient medicinal hills, this humble shrine houses a unique self-manifested (Swayambhu) Shiva Lingam. Due to lack of patronage, weekly pujas were disrupted.",
    needs: [
      "Rigorous Pradosham ritual sponsorships",
      "Constructing a protective iron canopy against weathering",
      "Establishing a permanent drinking water source for daily pilgrims"
    ],
    status: "Active Support",
    targetAmount: 180000,
    raisedAmount: 90000
  },
  {
    id: "temple-3",
    name: "Sri Bhuvaneshwari Gramadevi Alayam",
    location: "Pendurthi Rural Outskirts, Visakhapatnam",
    history: "An ancient village temple representing the feminine energy and security of rural artisans. It was partially damaged during a high-speed coastal cyclone in late 2024.",
    needs: [
      "Full reconstruction of the collapsed outer brick retaining wall",
      "Sponsorship of annual temple festival meals (Annadanam for 500+ residents)",
      "Solar street-lamp installation for midnight safety"
    ],
    status: "Urgent",
    targetAmount: 320000,
    raisedAmount: 210000
  },
  {
    id: "temple-4",
    name: "Sri Siddhi Vinayaka Temple",
    location: "Padmanabham Hillside, Visakhapatnam",
    history: "A serene, elevated temple with a high historic local pilgrimage value. Recently restored in early 2026 by the Kalavapudi Trust, establishing an ongoing maintenance pipeline.",
    needs: [
      "Sustained monthly supplies of holy ghee and organic camphor",
      "Monthly honorarium for the traditional priest"
    ],
    status: "Completed",
    targetAmount: 120000,
    raisedAmount: 120000
  }
];

export const INITIATIVES: Initiative[] = [
  {
    id: "init-1",
    title: "Dhoopa Deepa Naivedyam (Temple Support)",
    category: "Temple Support",
    description: "Providing premium spiritual goods—pure cow ghee, sacred sandalwood, incense, camphor, and grains—along with monthly survival stipends to underpaid priests in remote hill and forest temples in and around Visakhapatnam.",
    impact: "Over 12 neglected temples are now continuously lit with oil lamps, bringing back active worship and peace to those villages.",
    image: "/src/assets/images/temple_rituals_1780058418491.png"
  },
  {
    id: "init-2",
    title: "Professor Krishnamacharyulu Seva Kendram",
    category: "Community Welfare",
    description: "Sponsoring daily free nutritious lunches (Nitya Annadanam) for impoverished seniors, patients at local government run hospitals, and daily wage earners, running entirely of volunteer-led kitchens.",
    impact: "Currently distributing 150+ hygienic, wholesome hot meals daily, upholding Professor's core value of treating food service as divine duty.",
    image: "/src/assets/images/community_seva_1780058438596.png"
  },
  {
    id: "init-3",
    title: "Vedic Heritage & Student Vidyadana",
    category: "Cultural & Education",
    description: "Financing classical Sanskrit education and covering school tuition fees, schoolbags, books, and uniforms for gifted children from low-income groups in rural Visakhapatnam.",
    impact: "Directly sponsored the education of 45 students in 2026, preserving linguistic heritage and breaking the cycle of lack of opportunities.",
    image: "/src/assets/images/community_seva_1780058438596.png"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-2",
    title: "Sunrise Devotion at Temple Gopuram",
    category: "Temples",
    image: "/src/assets/images/temple_hero_banner_1780058391675.png",
    description: "A gorgeous historic temple gopuram supported by our restoration initiative, representing preservation of ancient sculpture."
  },
  {
    id: "g-3",
    title: "Sacred Lamp-Lighting Rituals",
    category: "Temples",
    image: "/src/assets/images/temple_rituals_1780058418491.png",
    description: "Priests lighting continuous brass oil lamps under the Trust's Dhoopa Deepa Naivedyam assistance scheme."
  },
  {
    id: "g-4",
    title: "Nutritious Food and Education Drive",
    category: "Welfare",
    image: "/src/assets/images/community_seva_1780058438596.png",
    description: "Sustaining smiles: volunteers distributing school supplies and nutritious meals to rural school children."
  }
];
