import { databases } from "./appwrite";
import { DB_ID, TESTIMONIALS_COLLECTION_ID } from "./constants";
import { Query } from "appwrite";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar_id: string;
  rating: number;
  featured: boolean;
}

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-anish-shrestha",
    name: "Anish Shrestha",
    role: "Business Consultant",
    quote: "Purchased a Hyundai Creta from RK Auto Center. The car was in absolute mint condition, and the overall transaction was seamless. They took care of everything!",
    avatar_id: "",
    rating: 5,
    featured: true
  },
  {
    id: "t-sujata-karki",
    name: "Sujata Karki",
    role: "Senior UX Designer",
    quote: "I sold my i20 Magna within 3 days. Their valuation was fair, and I didn't have to deal with multiple low-ball offers. The team was extremely polite and professional.",
    avatar_id: "",
    rating: 5,
    featured: true
  },
  {
    id: "t-dr-sandeep-pathak",
    name: "Dr. Sandeep Pathak",
    role: "Orthopedic Surgeon",
    quote: "The 150-point inspection checklist they provide is detailed and accurate. Bought a Honda City and couldn't be happier with the transparency of the deal.",
    avatar_id: "",
    rating: 5,
    featured: true
  },
  {
    id: "t-prabesh-adhikari",
    name: "Prabesh Adhikari",
    role: "Hotelier",
    quote: "Exceptional service from start to finish. Sourced a Kia Sonet in white color just as I wanted. Their collection and customer hospitality are unmatched in town.",
    avatar_id: "",
    rating: 5,
    featured: true
  },
  {
    id: "t-melina-shakya",
    name: "Melina Shakya",
    role: "Freelance Photographer",
    quote: "Being a woman buying her first car, I was skeptical. But the advisors at RK Auto made me feel completely comfortable and answered all my technical queries patiently.",
    avatar_id: "",
    rating: 5,
    featured: true
  },
  {
    id: "t-roshan-gurung",
    name: "Roshan Gurung",
    role: "Ex-British Army",
    quote: "Bespoke acquisition at its best. Sourced a rugged Scorpio with clean records. Reliable service, transparent pricing, and very friendly team.",
    avatar_id: "",
    rating: 5,
    featured: true
  }
];

export async function fetchTestimonialsFromAppwrite(): Promise<Testimonial[]> {
  try {
    const response = await databases.listDocuments(
      DB_ID,
      TESTIMONIALS_COLLECTION_ID,
      [Query.limit(100)]
    );
    if (!response.documents || response.documents.length === 0) {
      console.log("No testimonials found in Appwrite, using fallback mock data.");
      return MOCK_TESTIMONIALS;
    }
    return response.documents.map((doc: any) => ({
      id: doc.$id,
      name: doc.name,
      role: doc.role,
      quote: doc.quote,
      avatar_id: doc.avatar_id || "",
      rating: doc.rating || 5,
      featured: doc.featured || false,
    }));
  } catch (error) {
    console.error("Failed to fetch testimonials from Appwrite, using fallback mock data:", error);
    return MOCK_TESTIMONIALS;
  }
}
