import { client } from "@/lib/microcms";
import { FetchPosts } from "@/services/fetch-post";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Billboard } from "@/components/ui/billboard";
import { PostList } from "@/components/post-list";

export default async function HomePage() {
  // Fetch billboards from microCMS
  const billboards = await client.get({
    endpoint: "billboards",
  });

  // Fetch posts with pagination
  // TODO: Add infinate scroll
  const posts = await FetchPosts({
    limit: 6,
    offset: 0,
  });

  return (
    <Container>
      <div className="w-full h-full p-8">
        <Billboard data={billboards.contents} />
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
