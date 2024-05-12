export async function FetchCategories(): Promise<Category[]> {
  // Stringfy the url with the provided parameters
  const url = process.env.NEXT_PUBLIC_API_URL + "/categories";

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

export async function FetchCategory(categoryId: string): Promise<Category> {
  // Stringfy the url with the provided parameters
  const url = process.env.NEXT_PUBLIC_API_URL + `/categories/${categoryId}`;

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
