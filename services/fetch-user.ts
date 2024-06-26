import qs from "query-string";

interface FetchPostsProps {
  limit?: number;
  offset?: number;
}

export async function FetchUsers({
  limit = 10,
  offset = 0,
}: FetchPostsProps): Promise<User[]> {
  // Stringfy the url with the provided parameters
  const url = qs.stringifyUrl({
    url: process.env.NEXT_PUBLIC_API_URL + "/users",
    query: {
      limit: limit,
      offset: offset,
    },
  });

  // GET request to fetch posts
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer `,
    },
  });

  // Parse json body
  const body = await res.json();

  return body;
}

export async function FetchUser(userId: string): Promise<FetchUserResponse> {
  // Stringfy the url with the provided parameters
  const url = process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`;

  // GET request to fetch posts
  const res = await fetch(url, {
    method: "GET",
  });

  // Parse json body
  const body = await res.json();

  return body;
}
