import { PostCard } from "./post-card";

interface PostListProps {
  posts: Post[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="mt-10">
      <h3></h3>
      {posts.length === 0 && (
        <div className="flex items-center justify-center h-full w-full text-neutral-500">
          No results found.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            categories={post.edges.categories || []}
            asset={post.edges.assets[0]}
          />
        ))}
      </div>
    </div>
  );
};
