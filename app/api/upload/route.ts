import { NextRequest, NextResponse } from "next/server";
import { serverStorage } from "@/lib/appwrite-server";
import { CAR_IMAGES_BUCKET_ID } from "@/lib/constants";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const bucketId = (formData.get("bucketId") as string) || CAR_IMAGES_BUCKET_ID;

        if (!file || file.size === 0) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadedFile = await serverStorage.createFile(
            bucketId,
            ID.unique(),
            InputFile.fromBuffer(buffer, file.name)
        );

        return NextResponse.json({ id: uploadedFile.$id });
    } catch (error: any) {
        console.error("Upload Error:", error);
        return NextResponse.json({
            error: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        }, { status: 500 });
    }
}
