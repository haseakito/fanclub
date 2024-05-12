import { getSession, getToken } from "@/lib/session";
import { FetchPost } from "@/services/fetch-post";
import { FetchCategories } from "@/services/fetch-category";
import { FetchSubscriptions } from "@/services/fetch-subscription";
import { PostForm } from "./components/post-form";
import { ThumbnailUploadForm } from "./components/post-thumnail-form";
import { VideoUploadForm } from "./components/post-video-form";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

interface PostPageProps {
  params: {
    postId: string;
  };
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

  // Fetch categories
  const categories = await FetchCategories();

  // Fetch subscriptions with user id
  // const subscriptions = await FetchSubscriptions();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Edit the post" description="Edit the post details" />

        <Divider />

        <VideoUploadForm
          initialData={res.post || null}
          userId={userId}
          token={token}
        />

        <Divider />

        <ThumbnailUploadForm
          initialData={res?.post.thumbnail_url || null}
          token={token}
        />

        <Divider />

        <PostForm
          token={token}
          initialData={res?.post || null}
          categories={categories}
          subscriptions={[]}
        />
      </div>
    </div>
  );
}
