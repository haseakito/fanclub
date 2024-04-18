import { FetchBillboards } from "@/services/fetch-billboard";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading } from "@/components/ui/heading";
import { Billboard } from "@/components/ui/billboard";
import { FetchPosts } from "@/services/fetch-post";
import { PostList } from "@/components/post-list";

export default async function HomePage() {
  // Fetch billboards
  const billboards = await FetchBillboards();

  // Fetch posts
  const posts = await FetchPosts({
    limit: 6,
    offset: 0,
  });

  return (
    <Container>
      <div className="w-full h-full p-8">
        <Billboard data={billboards} />
        <div className="mt-8">
          <Heading
            title="New Posts"
            description="Explore the newly released posts that get you hooked"
          />
          <PostList posts={posts} />
        </div>
      </div>
    </Container>
  );
}
