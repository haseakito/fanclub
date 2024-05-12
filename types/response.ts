type FetchPostResponse = {
  post: Post;
  user: User;
  likes: number;
  userLiked: boolean;
  userPurchased: boolean;
};

type FetchUserResponse = {
  user: User;
  following: number;
  followers: number;
};

type FetchOrderResponse = {
  order: Order;
  post: Post;
  user: User;
};

// TODO: Add FetchDashboardResponse
type FetchDashboardResponse = {};
