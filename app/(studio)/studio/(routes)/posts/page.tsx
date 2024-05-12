import { formatDate } from "@/lib/format";
import { getSession, getToken } from "@/lib/session";
import { FetchPosts } from "@/services/fetch-post";
import { PostColumn } from "./components/columns";
import { PostTable } from "./components/post-table";

interface PostsPageProps {
  params: {
    limit?: number;
    offset?: number;
  };
}

export default async function PostsPage({ params }: PostsPageProps) {
  // Retrieve session from cookie
  const session = getSession();

  // Retrieve JWT token from cookie
  const token = getToken();

  // Retrieve user id from decoded token
  const userId = session?.user.userId;

  // Fetch posts associated with the store
  const posts = await FetchPosts({
    limit: params.limit,
    offset: params.offset,
    userId: userId,
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
        <PostTable data={formattedPosts} token={token} />
      </div>
    </div>
  );
}
