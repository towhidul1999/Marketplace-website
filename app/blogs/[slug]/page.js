import BlogDetails from "@/components/Blogs/BlogDetails";
import PrimaryLayout from "@/components/Layout/PrimaryLayout";
import baseAxios from "@/lib/config";

// Define the generateMetadata function
export async function generateMetadata({ params }) {
  const res = await baseAxios.get(`/blog/slug/${params.slug}`);
  const blog = res.data.data.attributes;
  const title = `${blog?.title}`;
  const description = `Find details about the blog ${blog?.title}.`;

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

function page({ params }) {
  return (
    <PrimaryLayout>
      <BlogDetails slug={params?.slug} />
    </PrimaryLayout>
  );
}

export default page;
