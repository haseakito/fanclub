import { FetchPost } from "@/services/fetch-post";

import { Container } from "@/components/ui/container";

import { Gallery } from "./components/gallery";
import { Info } from "./components/info";

interface PostPageProps {
  params: { postId: string };
}

export default async function PostPage({ params }: PostPageProps) {
  // Fetch post with post id
  const res = await FetchPost(params.postId);

  return (
    <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Gallery images={res.post.edges.assets} />
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <Info
              data={res.post}
              likes={res.likes}
              user={res.user}
              categories={res.post.edges.categories || []}
              subscriptions={res.post.edges.subscriptions || []}
            />
          </div>
        </div>
        <hr className="my-10" />
      </div>
    </Container>
  );
}
