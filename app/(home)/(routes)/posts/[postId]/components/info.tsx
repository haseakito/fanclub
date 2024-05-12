"use client";

import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Currency } from "@/components/currency";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ThumbsDown, ThumbsUp } from "lucide-react";

interface InfoProps {
  post: Post;
  user: User;
  token: string;
  likes: number;
  hasLiked: boolean;
  isLocked: boolean;
  isOwned: boolean;
  categories: Category[];
}

export const Info: React.FC<InfoProps> = ({
  post,
  user,
  token,
  likes,
  hasLiked,
  isLocked,
  isOwned,
  categories,
}) => {
  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Hooks handling router
  const router = useRouter();

  // Hooks handling url param
  const params = useParams();

  // Function handling liking the post
  const onLike = async () => {
    try {
      setLoading(true);

      // POST request to server
      await axios.post(
        `/likes/create`,
        {
          postId: post.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show a success toast
      toast.success("Successfully liked the post.");

      // Refresh the page
      router.refresh();
    } catch (error) {
      console.log(error);

      // Show an error toast
      toast.error("Ooops! There was a problem with your request!");
    } finally {
      setLoading(false);
    }
  };

  // Function handling removing like for the post
  const onDislike = async () => {
    try {
      setLoading(true);

      // POST request to server
      await axios.post(
        `/likes/destroy`,
        {
          postId: post.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show a success toast
      toast.success("Successfully deleted the like.");

      // Refresh the page
      router.refresh();
    } catch (error) {
      console.log(error);

      // Show an error toast
      toast.error("Ooops! There was a problem with your request!");
    } finally {
      setLoading(false);
    }
  };

  //
  const onCheckout = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `/checkout`,
        {
          post: post.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show a success toast
      toast.success("Successfully updated the post.");

      // Redirect the user to Stripe hosted checkout page
      window.location.assign(res.data.url);
    } catch (error) {
      console.log(error);

      // Show an error toast
      toast.error("Ooops! There was a problem with your request!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
      <div className="mt-3 flex items-end justify-between">
        <Currency price={post.price || 0} />

        <div className="flex items-center gap-x-2">
          {hasLiked ? (
            <Button
              size="icon"
              disabled={loading || isOwned}
              onClick={onDislike}
            >
              <ThumbsDown className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              size="icon"
              variant="outline"
              disabled={loading || isOwned}
              onClick={onLike}
            >
              <ThumbsUp className="h-5 w-5" />
            </Button>
          )}
          <p className="text-xs text-muted-foreground">{likes}</p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div>
          <h2 className="text-sm font-medium leading-6 text-gray-900">
            Creator
          </h2>
          <Link
            href={`/users/${user.id}`}
            className="mt-2 flex items-center gap-x-5 hover:underline"
          >
            <Image
              width={30}
              height={30}
              src={user.profile_image_url}
              alt="profile"
              className="p-[1px] rounded-full ring-1 ring-gray-300 dark:ring-gray-500"
            />
            <p className="text-sm font-medium">@{user.username}</p>
          </Link>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-medium leading-6 text-gray-900">
            Categories
          </h2>
          {categories.length === 0 ? (
            <p className="mt-1 text-sm leading-6 text-gray-700">
              No categories
            </p>
          ) : (
            <div className="flex gap-x-1">
              {categories.map((category) => (
                <Badge key={category.id} variant="secondary">
                  {category.name}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-sm font-medium leading-6 text-gray-900">
            Description
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-700">
            {post.description}
          </p>
        </div>
      </div>
      <div className="mt-10">
        {!isLocked || isOwned ? null : (
          <Button
            className="w-full"
            onClick={onCheckout}
            disabled={loading || !isLocked || isOwned}
          >
            Checkout
          </Button>
        )}
      </div>
    </div>
  );
};
