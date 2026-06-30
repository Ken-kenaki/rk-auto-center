import {
    APPWRITE_ENDPOINT,
    APPWRITE_PROJECT_ID,
    CAR_IMAGES_BUCKET_ID,
    TESTIMONIALS_BUCKET_ID,
} from "./constants";

/**
 * Get public URL for a file in a storage bucket
 */
export function getFilePreviewUrl(
    fileId: string,
    bucketId: string = CAR_IMAGES_BUCKET_ID,
    width?: number,
    height?: number,
    quality?: number
): string {
    if (!fileId) return "";
    const params = new URLSearchParams();
    if (width) params.set("width", width.toString());
    if (height) params.set("height", height.toString());
    if (quality) params.set("quality", quality.toString());
    params.set("output", "webp");

    const queryString = params.toString();
    return `${APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/preview?project=${APPWRITE_PROJECT_ID}${queryString ? `&${queryString}` : ""}`;
}

/**
 * Get a download URL for a file
 */
export function getFileDownloadUrl(fileId: string): string {
    if (!fileId) return "";
    return `${APPWRITE_ENDPOINT}/storage/buckets/${CAR_IMAGES_BUCKET_ID}/files/${fileId}/download?project=${APPWRITE_PROJECT_ID}`;
}

/**
 * Get a view URL for a file
 */
export function getFileViewUrl(fileId: string): string {
    if (!fileId) return "";
    return `${APPWRITE_ENDPOINT}/storage/buckets/${CAR_IMAGES_BUCKET_ID}/files/${fileId}/view?project=${APPWRITE_PROJECT_ID}`;
}

/**
 * Generate WhatsApp inquiry URL for a car
 */
export function generateWhatsAppUrl(
    whatsappNumber: string,
    carName: string,
    price: number,
    carUrl?: string
): string {
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(price);

    const message = `Hello, I am interested in this vehicle listing:
    
Name: ${carName}
Price: ${formattedPrice}
${carUrl ? `\nVehicle Link:\n${carUrl}` : ""}`;

    const encodedMessage = encodeURIComponent(message);
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

/**
 * Generate slug from string
 */
export function generateSlug(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
