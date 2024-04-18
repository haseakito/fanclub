type FetchPostResponse = {
  post: Post;
  user: User;
  likes: number;
};

type FetchUserResponse = {
  user: User;
  following: number;
  followers: number;
};
