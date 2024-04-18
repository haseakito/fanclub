import { auth } from "@clerk/nextjs";
import qs from "query-string";

interface FetchPostsProps {
  limit?: number;
  offset?: number;
}

export async function FetchPosts({
  limit = 10,
  offset = 0,
}: FetchPostsProps): Promise<Post[]> {
  // Hooks handling fetching session token
  const { getToken } = auth();

  // Stringfy the url with the provided parameters
  const url = qs.stringifyUrl({
    url: process.env.NEXT_PUBLIC_API_URL + "/posts",
    query: {
      limit: limit,
      offset: offset,
    },
  });

  // GET request to fetch posts
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });

  // Parse json body
  const body = await res.json();

  return body;
}

export async function FetchPost(postId: string): Promise<FetchPostResponse> {
  // Hooks handling fetching session token
  const { getToken } = auth();

  // Stringfy the url with the provided parameters
  const url = process.env.NEXT_PUBLIC_API_URL + `/posts/${postId}`;

  // GET request to fetch posts
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });

  // Parse json body
  const body = await res.json();

  return body;
}

interface FetchPostsByUserProps {
  limit?: number;
  offset?: number;
}

export async function FetchPostsByUser({
  limit = 10,
  offset = 0,
}: FetchPostsByUserProps): Promise<Post[]> {
  // Hooks handling fetching session token
  const { userId, getToken } = auth();

  // Stringfy the url with the provided parameters
  const url = qs.stringifyUrl({
    url: process.env.NEXT_PUBLIC_API_URL + `/users/${userId}/posts`,
    query: {
      limit: limit,
      offset: offset,
    },
  });

  // GET request to fetch posts
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });

  // Parse json body
  const body = await res.json();

  return body;
}
