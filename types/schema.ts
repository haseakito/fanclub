type User = {
  id: string;
  name: string;
  username: string;
  url: string;
  bio: string;
  email: string;
  profile_image_url: string;
  edges: {
    posts: Post[];
    subscriptions: Subscription[];
  };
  created_at: string;
  updated_at: string;
};

type Settings = {};

type Post = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  price?: number;
  is_featured: boolean;
  status: boolean;
  edges: {
    assets: Asset[];
    subscriptions: Subscription[];
    categories: Category[];
  };
  created_at: string;
  updated_at: string;
};

type Category = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

type Subscription = {
  id: string;
  name: string;
  user_id: string;
  description: string;
  price: number;
  trial_period_days: number;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
};

type Billboard = {
  id: string;
  title: string;
  description: string;
  edges: {
    asset: Asset;
  };
  created_at: string;
  updated_at: string;
};

type Asset = {
  id: string;
  public_id: string;
  url: string;
  resource_type: string;
  created_at: string;
  updated_at: string;
};
