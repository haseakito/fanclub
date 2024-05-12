import qs from "query-string";
import { getToken } from "@/lib/session";

interface FetchPostsProps {
  limit?: number;
  offset?: number;
  userId?: string;
}

export async function FetchPosts({
  limit = 10,
  offset = 0,
  userId,
}: FetchPostsProps): Promise<Post[]> {
  // Stringfy the url with the provided parameters
  const url = qs.stringifyUrl({
    url: process.env.NEXT_PUBLIC_API_URL + "/posts",
    query: {
      limit: limit,
      offset: offset,
      userId: userId,
    },
  });

  // GET request to fetch posts
  const res = await fetch(url, {
    method: "GET",
  });

  // Parse json body
  const body = await res.json();

  return body;
}

export async function FetchPost(postId: string): Promise<FetchPostResponse> {
  // Retrieve token from cookie
  const token = getToken();

  // Stringfy the url with the provided parameters
  const url = process.env.NEXT_PUBLIC_API_URL + `/posts/${postId}`;

  // GET request to fetch posts
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Parse json body
  const body = await res.json();

  return body;
}

export async function FetchPostByLike({
  limit = 10,
  offset = 0,
}: FetchPostsProps): Promise<Post[]> {
  // Retrieve token from cookie
  const token = getToken();

  // Stringfy the url with the provided parameters
  const url = qs.stringifyUrl({
    url: process.env.NEXT_PUBLIC_API_URL + "/likes/posts",
    query: {
      limit: limit,
      offset: offset,
    },
  });

  // GET request to fetch posts
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Parse json body
  const body = await res.json();

  return body;
}
