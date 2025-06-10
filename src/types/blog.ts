export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  updatedDate?: string;
  excerpt: string;
  content: string;
  tags?: string[];
  published?: boolean;
}

export interface BlogMetadata {
  title: string;
  date: string;
  updatedDate?: string;
  excerpt: string;
  tags?: string[];
  published?: boolean;
}
