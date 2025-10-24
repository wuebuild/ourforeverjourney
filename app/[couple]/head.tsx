// app/(app)/your-page/head.tsx
export default function Head() {
  const bg =
    "https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/uploads/irawan-cindy/569050899_18537775153055426_6010142526291825036_n.webp";

  return (
    <>
      {/* Optional: speed up TLS/DNS to S3 */}
      {/* <link
        rel="preconnect"
        href="https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com"
        crossOrigin=""
      /> */}
      {/* Preload the hero background image */}
      <link rel="preload" as="image" href={bg} />
    </>
  );
}