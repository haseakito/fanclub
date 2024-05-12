"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  post: Post;
  categories: Category[];
}

export const PostCard: React.FC<PostCardProps> = ({ post, categories }) => {
  // Hooks handling router
  const router = useRouter();

  return (
    <div
      className="bg-white hover:bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer rounded-xl hover:rounded-sm p-1 space-y-1 duration-150"
      onClick={() => router.push(`posts/${post.id}`)}
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={post.thumbnail_url || ""}
          alt="post thumbnail"
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-md hover:rounded-sm duration-150"
        />

        <div className="absolute bottom-0 left-0 p-2">
          {categories.map((category) => (
            <Badge key={category.id} variant="secondary" className="m-0.5">
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
