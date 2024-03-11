import { FetchPostsByUser } from "@/services/fetch-post";
import { PostColumn } from "./components/columns";
import { PostTable } from "./components/post-table";
import { formatDate } from "@/lib/format";

interface PostsPageProps {
  params: {
    limit?: number;
    offset?: number;
  };
}

export default async function PostsPage({ params }: PostsPageProps) {
  // Fetch posts associated with the store
  const posts = await FetchPostsByUser({
    limit: params.limit,
    offset: params.offset,
  });

  // Format post for post table
  const formattedPosts: PostColumn[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
    price: post.price || 0,
    status: post.status,
    createdAt: formatDate(post.created_at),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PostTable data={formattedPosts} />
      </div>
    </div>
  );
}
