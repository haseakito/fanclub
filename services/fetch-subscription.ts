import qs from "query-string";

export async function FetchSubscriptions(): Promise<Subscription[]> {
  // Stringfy the url with the provided parameters
  const url = qs.stringifyUrl({
    url: process.env.NEXT_PUBLIC_API_URL + "/subscriptions",
    query: {
      user_id: ""
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

export async function FetchSubscription(subscriptionId: string): Promise<Subscription> {
  // Stringfy the url with the provided parameters
  const url =
    process.env.NEXT_PUBLIC_API_URL + `/subscriptions/${subscriptionId}`;

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
