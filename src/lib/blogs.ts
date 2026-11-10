import blogsData from "@/data/mock/blogs.json";
import type { BlogPost } from "@/types/blog";

export async function fetchBlogs(): Promise<BlogPost[]> {
  return blogsData as BlogPost[];
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  const blogs = await fetchBlogs();
  return blogs.find((b) => b.slug === slug);
}
