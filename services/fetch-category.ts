import { auth } from "@clerk/nextjs";

export async function FetchCategories(): Promise<Category[]> {
  // Hooks handling fetching session token
  const { getToken } = auth();

  // Stringfy the url with the provided parameters
  const url = process.env.NEXT_PUBLIC_API_URL + "/categories";

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

export async function FetchCategory(categoryId: string): Promise<Category> {
  // Hooks handling fetching session token
  const { getToken } = auth();

  // Stringfy the url with the provided parameters
  const url = process.env.NEXT_PUBLIC_API_URL + `/categories/${categoryId}`;

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
