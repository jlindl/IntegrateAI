import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = "https://integrate-tech.co.uk";
    const posts = getAllPosts();

    const blogEntries = posts.map((post) => ({
        url: `${siteUrl}/insights/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const staticPages = [
        '',
        '/about',
        '/case-studies',
        '/insights',
        '/partners',
        '/contact',
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    return [...staticPages, ...blogEntries];
}
