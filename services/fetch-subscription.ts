import { auth } from "@clerk/nextjs";
import qs from "query-string";

export async function FetchSubscriptions(): Promise<Subscription[]> {
  // Hooks handling fetching session token
  const { userId, getToken } = auth();

  // Stringfy the url with the provided parameters
  const url = qs.stringifyUrl({
    url: process.env.NEXT_PUBLIC_API_URL + "/subscriptions",
    query: {
      user_id: userId
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

export async function FetchSubscription(subscriptionId: string): Promise<Subscription> {
  // Hooks handling fetching session token
  const { getToken } = auth();

  // Stringfy the url with the provided parameters
  const url =
    process.env.NEXT_PUBLIC_API_URL + `/subscriptions/${subscriptionId}`;

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
