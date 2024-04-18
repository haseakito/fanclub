import { auth } from "@clerk/nextjs";

export async function FetchBillboards(): Promise<Billboard[]> {
  // Hooks handling fetching session token
  const { getToken } = auth();

  // Stringfy the url with the provided parameters
  const url = process.env.NEXT_PUBLIC_API_URL + "/billboards";

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

export async function FetchBillboard(
  billboardId: string
): Promise<Billboard> {
  // Hooks handling fetching session token
  const { getToken } = auth();

  // Stringfy the url with the provided parameters
  const url = process.env.NEXT_PUBLIC_API_URL + `/billboards/${billboardId}`;

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
