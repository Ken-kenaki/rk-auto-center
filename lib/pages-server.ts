import { serverDatabases } from "./appwrite-server";
import { DB_ID, PAGES_COLLECTION_ID } from "./constants";
import { Query } from "node-appwrite";

export interface AboutPageData {
  title: string;
  description: string;
  heroWord: string;
  heroTagline: string;
  heroMainImage: string;
  heroSideImages: Array<{
    src: string;
    alt: string;
    position: string;
    span: number;
  }>;
  profile: {
    tag: string;
    title: string;
    text: string;
    image: string;
  };
  whyUs: {
    tag: string;
    title: string;
    text: string;
    cards: Array<{
      title: string;
      text: string;
      image: string;
    }>;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  testimonials: {
    tag: string;
    title: string;
    text: string;
  };
}

export const DEFAULT_ABOUT_DATA: AboutPageData = {
  title: "About Us — RK Auto Center",
  description: "Learn more about the legacy, philosophy, and client stories of RK Auto Center.",
  heroWord: "LEGACY",
  heroTagline: "Redefining the luxury automotive marketplace.<br />Curating state-of-the-art drives since 2016.",
  heroMainImage: "/404-hero.png",
  heroSideImages: [
    {
      src: "/about-hero-1.jpg",
      alt: "Happy client with their new car",
      position: "left",
      span: 1,
    },
    {
      src: "/about-hero-2.jpg",
      alt: "Client receiving car keys",
      position: "left",
      span: 1,
    },
    {
      src: "/about-hero-3.jpg",
      alt: "Client posing with their vehicle",
      position: "right",
      span: 1,
    },
    {
      src: "/about-hero-4.jpg",
      alt: "Satisfied customer at RK Auto Center",
      position: "right",
      span: 1,
    },
  ],
  profile: {
    tag: "Company Profile",
    title: "The Pinnacle of Automotive Integrity",
    text: "Founded on the principles of absolute transparency and visual majesty, RK Auto has been the premier destination for serious automotive enthusiasts. We specialize in curating, verifying, and matching world-class supercars and luxury daily drivers with those who appreciate excellence.",
    image: "/rk-des.jpg",
  },
  whyUs: {
    tag: "Why Choose Us",
    title: "The RK Auto Experience",
    text: "We combine elite concierge services with data-driven evaluation tools to deliver a seamless, high-end experience for both buyers and sellers of premium automobiles.",
    cards: [
      {
        title: "Meticulous Inspection",
        text: "Every vehicle on our platform undergoes a rigorous 150-point diagnostic check by certified mechanics, verifying everything from telemetry logs to paint depth.",
        image: "/rk-des.jpg",
      },
      {
        title: "Bespoke Acquisition",
        text: "If the specific build you want is not in our inventory, our sourcing division connects with private collectors worldwide to secure and ship it directly to you.",
        image: "/about-1.jpg",
      },
    ],
    stats: [
      { value: "10+", label: "Years Experience" },
      { value: "500+", label: "Premium Cars Sold" },
      { value: "98%", label: "Customer Satisfaction" },
      { value: "100%", label: "Inspected Inventory" },
    ],
  },
  testimonials: {
    tag: "Client Testimonials",
    title: "Trusted by the Discerning",
    text: "Read what elite car collectors, everyday luxury drivers, and performance enthusiasts say about their RK Auto transactions.",
  },
};

export async function fetchAboutPageData(): Promise<AboutPageData> {
  try {
    const response = await serverDatabases.listDocuments(
      DB_ID,
      PAGES_COLLECTION_ID,
      [Query.equal("page_name", "about"), Query.limit(1)]
    );

    if (!response.documents || response.documents.length === 0) {
      return DEFAULT_ABOUT_DATA;
    }

    const doc = response.documents[0];
    let parsedSections: Partial<AboutPageData> = {};

    if (doc.sections) {
      try {
        parsedSections = JSON.parse(doc.sections);
      } catch (e) {
        console.error("Failed to parse page sections JSON for about page:", e);
      }
    }

    return {
      title: doc.title || DEFAULT_ABOUT_DATA.title,
      description: doc.content || DEFAULT_ABOUT_DATA.description,
      heroWord: parsedSections.heroWord || DEFAULT_ABOUT_DATA.heroWord,
      heroTagline: parsedSections.heroTagline || DEFAULT_ABOUT_DATA.heroTagline,
      heroMainImage: parsedSections.heroMainImage || DEFAULT_ABOUT_DATA.heroMainImage,
      heroSideImages: parsedSections.heroSideImages || DEFAULT_ABOUT_DATA.heroSideImages,
      profile: {
        tag: parsedSections.profile?.tag || DEFAULT_ABOUT_DATA.profile.tag,
        title: parsedSections.profile?.title || DEFAULT_ABOUT_DATA.profile.title,
        text: parsedSections.profile?.text || DEFAULT_ABOUT_DATA.profile.text,
        image: parsedSections.profile?.image || DEFAULT_ABOUT_DATA.profile.image,
      },
      whyUs: {
        tag: parsedSections.whyUs?.tag || DEFAULT_ABOUT_DATA.whyUs.tag,
        title: parsedSections.whyUs?.title || DEFAULT_ABOUT_DATA.whyUs.title,
        text: parsedSections.whyUs?.text || DEFAULT_ABOUT_DATA.whyUs.text,
        cards: parsedSections.whyUs?.cards || DEFAULT_ABOUT_DATA.whyUs.cards,
        stats: parsedSections.whyUs?.stats || DEFAULT_ABOUT_DATA.whyUs.stats,
      },
      testimonials: {
        tag: parsedSections.testimonials?.tag || DEFAULT_ABOUT_DATA.testimonials.tag,
        title: parsedSections.testimonials?.title || DEFAULT_ABOUT_DATA.testimonials.title,
        text: parsedSections.testimonials?.text || DEFAULT_ABOUT_DATA.testimonials.text,
      },
    };
  } catch (error) {
    console.error("Failed to fetch about page content from Appwrite, using fallback:", error);
    return DEFAULT_ABOUT_DATA;
  }
}
