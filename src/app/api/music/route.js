import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const directoryPath = path.join(process.cwd(), "public", "lib");
    if (!fs.existsSync(directoryPath)) {
      return NextResponse.json([]);
    }
    const files = fs.readdirSync(directoryPath);

    // Filter for standard audio formats
    const audioFiles = files.filter((file) =>
      /\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(file)
    );

    return NextResponse.json(audioFiles);
  } catch (error) {
    console.error("Error reading audio directory:", error);
    return NextResponse.json([]);
  }
}
