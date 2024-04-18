"use client";

import { Currency } from "@/components/currency";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface InfoProps {
  data: Post;
  likes: number;
  user: User;
  categories: Category[];
  subscriptions: Subscription[];
}

export const Info: React.FC<InfoProps> = ({
  data,
  likes,
  user,
  categories,
  subscriptions,
}) => {
  const onLike = async () => {};

  const onCheckout = async () => {};

  const onSubscribe = async (subscriptionId: string) => {};

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency price={data.price || 0} />
        </p>
        <div className="flex items-center gap-x-2">
          <Button size="icon" variant="outline">
            <ThumbsUp className="h-5 w-5" />
          </Button>
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
              alt=""
              className="rounded-full"
            />
            <p className="text-sm font-medium">@{user.username}</p>
          </Link>
        </div>
        <div>
          <h2 className="text-sm font-medium leading-6 text-gray-900">
            Categories
          </h2>
          {categories.length !== 0 ? (
            categories.map((category) => (
              <Badge key={category.id} variant="secondary">
                {category.name}
              </Badge>
            ))
          ) : (
            <p className="mt-1 text-sm leading-6 text-gray-700">
              No categories
            </p>
          )}
        </div>
        <div>
          <h2 className="text-sm font-medium leading-6 text-gray-900">
            Subscriptions
          </h2>
          {subscriptions.length !== 0 ? (
            subscriptions.map((sub) => (
              <Badge key={sub.id} variant="secondary">
                {sub.name}
              </Badge>
            ))
          ) : (
            <p className="mt-1 text-sm leading-6 text-gray-700">
              No subscriptions
            </p>
          )}
        </div>
        <div>
          <h2 className="text-sm font-medium leading-6 text-gray-900">
            Description
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-700">
            {data.description}
          </p>
        </div>
      </div>
      <div className="mt-10">
        <Button className="w-full" onClick={onCheckout}>
          Checkout
        </Button>
        {data.edges.subscriptions && (
          <div className="space-y-2">
            <p className="my-5 text-xs text-muted-foreground">or</p>
            {data.edges.subscriptions.map((sub) => (
              <Button
                key={sub.id}
                variant="default"
                className="w-full"
                onClick={() => onSubscribe(sub.id)}
              >
                Subscribe to {sub.name}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
