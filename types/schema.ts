interface User {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
  stripe_account_id: string;
  email: string;
  email_verified: boolean;
  url: string;
  bio: string;
  dob: string;
  role: "fan" | "creator" | "admin";
  edges: {
    posts: Post[];
    subscriptions: Subscription[];
  };
  created_at: string;
  updated_at: string;
}

// TODO: Add NotificationSettings
interface NotificationSettings {}

interface Post {
  id: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  video_url?: string;
  mux_asset_id?: string;
  mux_playback_id?: string;
  price?: number;
  is_featured: boolean;
  status: boolean;
  edges: {
    categories: Category[];
  };
  created_at: string;
  updated_at: string;
}

interface Order {
  id: string;
  amount: number;
  status: "pending" | "completed" | "processing" | "canceled";
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Subscription {
  id: string;
  name: string;
  user_id: string;
  description: string;
  price: number;
  trial_period_days: number;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

interface Billboard {
  id: string;
  billboard_image: {
    url: string;
    height: number;
    width: number;
  };
  redirect_url: string;
  description: string;
  created_at: string;
  updated_at: string;
}
