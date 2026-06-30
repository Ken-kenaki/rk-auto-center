import { serverDatabases } from "./appwrite-server";
import { DB_ID, TESTIMONIALS_COLLECTION_ID } from "./constants";
import { Query } from "node-appwrite";
import { Testimonial, MOCK_TESTIMONIALS } from "./testimonials";

export async function fetchTestimonialsFromServer(): Promise<Testimonial[]> {
  try {
    const response = await serverDatabases.listDocuments(
      DB_ID,
      TESTIMONIALS_COLLECTION_ID,
      [Query.limit(100)]
    );
    if (!response.documents || response.documents.length === 0) {
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
    console.error("Failed to fetch testimonials from Appwrite Server, using fallback mock data:", error);
    return MOCK_TESTIMONIALS;
  }
}
