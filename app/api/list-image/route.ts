import { NextRequest, NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION || "ap-southeast-1", // fallback if env missing
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder") || "images/";

    console.log("ENV Bucket:", process.env.AWS_BUCKET_NAME);
    console.log("Folder param:", folder);

    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME!, // must not be undefined
      Prefix: `uploads/${folder}`,
    });

    const response = await s3.send(command);

    const files = (response.Contents || [])
      .map((obj) => obj.Key)
      .filter((key) => key && /\.(png|jpg|jpeg|gif|webp)$/i.test(key));

    return NextResponse.json({ files });
  } catch (err: any) {
    console.error("Error listing images:", err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}