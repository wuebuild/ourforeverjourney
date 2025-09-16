import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
  const Key = `uploads/irawan-cindy/${Date.now()}-${filename}`;

  const command = new PutObjectCommand({
    Bucket,
    Key,
    ContentType: type,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  return NextResponse.json({url: signedUrl});
}