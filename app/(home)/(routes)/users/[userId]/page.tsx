import Image from "next/image";
import NextLink from "next/link";
import { FetchUser } from "@/services/fetch-user";
import { FetchPosts } from "@/services/fetch-post";
import { formatDate } from "@/lib/format";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { PostList } from "@/components/post-list";
import { Divider } from "@/components/ui/divider";

import { Calendar, Link } from "lucide-react";

interface UserPageProps {
  params: { userId: string };
}

export default async function UserPage({ params }: UserPageProps) {
  // Fetch current user with user id
  const res = await FetchUser(params.userId);

  // Fetch posts associated with the user
  const posts = await FetchPosts({
    limit: 10,
    offset: 0,
    userId: params.userId,
  });

  return (
    <Container>
      <div className="px-6 lg:px-8">
        <div className="sm:flex items-center sm:justify-between">
          {res.user.profile_image_url ? (
            <Image
              width={130}
              height={130}
              src={res.user.profile_image_url}
              alt="profile"
              className="p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            />
          ) : null}
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
                    href={res.user.url}
                    target="_blank"
                    rel="noopener noreferrer"
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
                href={`/users/${params.userId}/following`}
                className="flex items-center gap-x-1"
              >
                <p className="text-sm font-semibold">{res.following}</p>
                <p className="text-sm text-muted-foreground">following</p>
              </NextLink>
              <NextLink
                href={`/users/${params.userId}/follower`}
                className="flex items-center gap-x-1"
              >
                <p className="text-sm font-semibold">{res.followers}</p>
                <p className="text-sm text-muted-foreground">followers</p>
              </NextLink>
            </div>
          </div>
        </div>
        <p className="text-sm font-semibold mt-5 break-words">{res.user.bio}</p>
      </div>

      <div className="mt-10">
        <Heading title="Your Posts" description="Explore your library." />
        <Divider />
        <PostList posts={posts} />
      </div>
    </Container>
  );
}
