"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Currency } from "@/components/currency";

import { Expand } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  post: Post;
  categories: Category[];
  asset: Asset;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  categories,
  asset,
}) => {
  // Hooks handling router
  const router = useRouter();

  // Function handdling redirecting the user to product detail page
  const handleClick = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          width={500}
          height={500}
          src={asset.url}
          alt="product image"
          className="object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <Button size="icon" onClick={handleClick}>
              <Expand size={20} className="text-gray-300" />
            </Button>
          </div>
        </div>
      </div>
      {/* Description & category */}
      <div>
        <p className="font-semibold text-lg">{post.title}</p>
        <div className="">
          {categories.map((category) => (
            <Badge key={category.id} variant="secondary">
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
      {/* Price & preview */}
      {post.price ? <Currency price={post.price || 0} /> : null}
    </div>
  );
};
