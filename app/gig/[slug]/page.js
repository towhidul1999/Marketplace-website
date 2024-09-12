import GigDetails from "@/components/Gig/GigDetails/GigDetails";
import MainLayout from "@/components/Layout/SecondaryLayout";
import { imageBaseUrl } from "@/lib/constant";

// Define the generateMetadata function
export async function generateMetadata({ params }) {
  const { slug } = params;
  const response = await fetch(`${imageBaseUrl}/v1/gig?slug=${slug}`);
  const data = await response.json();
  const title = `${data?.data?.attributes?.results[0]?.title}`;
  const description = `Find details about the gig ${slug}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function Page({ params }) {
  return (
    <MainLayout>
      <GigDetails slug={params.slug} />
    </MainLayout>
  );
}
