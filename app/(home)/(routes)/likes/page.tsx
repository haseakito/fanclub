import { PostList } from "@/components/post-list";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { FetchPostByLike } from "@/services/fetch-post";

interface LikesPageProps {
  params: {
    limit?: number;
    offset?: number;
  };
}
export default async function LikesPage({ params }: LikesPageProps) {
  const posts = await FetchPostByLike({
    limit: params.limit,
    offset: params.offset,
  });

  return (
    <Container>
      <Heading
        title="Your favarite posts"
        description="Explore the posts you liked."
      />
      <PostList posts={posts} />
    </Container>
  );
}
