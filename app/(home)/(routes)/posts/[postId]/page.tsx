import { FetchPost } from "@/services/fetch-post";

import { getSession, getToken } from "@/lib/session";
import { Container } from "@/components/ui/container";

import { Info } from "./components/info";
import { VideoPlayer } from "./components/video-player";

interface PostPageProps {
  params: { postId: string };
}

export default async function PostPage({ params }: PostPageProps) {
  // Retrieve session from cookie
  const session = getSession();

  // Retrieve JWT token from cookie
  const token = getToken();

  // Retrieve user id from decoded token
  const userId = session?.user.userId;

  // Fetch post with post id
  const res = await FetchPost(params.postId);

  // Boolean state handling if the post is locked based on purchase status or price
  // isLocked is false if the post has been purchased or is free
  const isLocked = res.post.price !== 0 && !res.userPurchased;

  // Boolean state handling if the user owns the post
  const isOwned = res.user.id === userId;

  return (
    <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <div>
            <VideoPlayer
              post={res.post}
              userId={userId || "anonymous"}
              isLocked={isLocked}
              isOwned={isOwned}
            />
          </div>
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <Info
              post={res.post}
              user={res.user}
              token={token}
              likes={res.likes}
              hasLiked={res.userLiked}
              isLocked={isLocked}
              isOwned={isOwned}
              categories={res.post.edges.categories || []}
            />
          </div>
        </div>
        <hr className="my-10" />
      </div>
    </Container>
  );
}
