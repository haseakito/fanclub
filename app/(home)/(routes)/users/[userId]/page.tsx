import Image from "next/image";
import NextLink from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FetchUser } from "@/services/fetch-user";
import { FetchPostsByUser } from "@/services/fetch-post";
import { formatDate } from "@/lib/format";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { PostList } from "@/components/post-list";

import { Calendar, Link } from "lucide-react";

export default async function UserPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const res = await FetchUser(userId);

  // Fetch posts
  const posts = await FetchPostsByUser({
    limit: 6,
    offset: 0,
  });

  return (
    <Container>
      <div className="px-8 lg:px-16">
        <div className="sm:flex items-center sm:justify-between">
          <Image
            width={120}
            height={120}
            src={res.user.profile_image_url}
            alt=""
            className="rounded-full"
          />
          <div>
            <p className="mt-5 text-xl font-bold">{res.user.name}</p>
            <p className="ml-1 text-sm text-muted-foreground">
              @{res.user.username}
            </p>
            <div className="mt-5 flex items-center gap-x-1">
              {res.user.url && (
                <div>
                  <Link className="h-4 w-4 text-muted-foreground" />
                  <a
                    href="https://example.com/"
                    className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <p className="w-64 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {res.user.url}
                    </p>
                  </a>
                </div>
              )}
            </div>
            <div className="mt-2 flex items-center gap-x-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Joined {formatDate(res.user.created_at)}
              </p>
            </div>
            <div className="mt-5 flex items-center justify-between gap-x-1">
              <NextLink
                href={`/users/${userId}/following`}
                className="flex items-center gap-x-1 hover:underline"
              >
                <p className="text-sm font-semibold">{res.following}</p>
                <p className="text-sm text-muted-foreground">following</p>
              </NextLink>
              <NextLink
                href={`/users/${userId}/follower`}
                className="flex items-center gap-x-1 hover:underline"
              >
                <p className="text-sm font-semibold">{res.followers}</p>
                <p className="text-sm text-muted-foreground">followers</p>
              </NextLink>
            </div>
          </div>
        </div>
        <p className="text-sm font-semibold mt-5 break-words">{res.user.bio}</p>
        <div className="mt-10">
          {res.user.edges.subscriptions &&
            res.user.edges.subscriptions.map((sub) => (
              <p key={sub.id}>{sub.name}</p>
            ))}
        </div>
        <div className="mt-10">
          <Heading
            title="Your Posts"
            description="Explore the newly released posts from this creator"
          />
          <PostList posts={posts} />
        </div>
      </div>
    </Container>
  );
}
