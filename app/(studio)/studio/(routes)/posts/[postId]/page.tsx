import { FetchPost } from "@/services/fetch-post";
import { FetchCategories } from "@/services/fetch-category";
import { FetchSubscriptions } from "@/services/fetch-subscription";
import { PostForm } from "./components/post-form";

interface PostPageProps {
  params: {
    postId: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  let res;
  // Fetch post with post id
  if (params.postId === "new") {
    res = null;
  } else {
    res = await FetchPost(params.postId);
  }

  // Fetch categories
  const categories = await FetchCategories();

  // Fetch subscriptions with user id
  const subscriptions = await FetchSubscriptions();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PostForm
          initialData={res?.post || null}
          categories={categories}
          subscriptions={subscriptions}
        />
      </div>
    </div>
  );
}
