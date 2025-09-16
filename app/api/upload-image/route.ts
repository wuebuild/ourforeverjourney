import { NextRequest, NextResponse } from 'next/server';
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  const { filename, type } = await req.json();

  const Bucket = process.env.AWS_BUCKET_NAME!;
  const Key = `uploads/test/${Date.now()}-${filename}`;

  const presignedPost = await createPresignedPost(s3, {
    Bucket,
    Key,
    // Conditions: [['content-length-range', 0, 10485760]], // max 10 MB
    Fields: { 'Content-Type': type },
    Expires: 60,
  });

  return NextResponse.json(presignedPost);
}