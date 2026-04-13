import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
    id: string;
    category: string;
    title: string;
    excerpt: string;
    image: string;
    readTime: string;
    date: string;
    content: string;
    slug: string;
}

export function getAllPosts(): BlogPost[] {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            content,
            ...(data as { 
                id: string; 
                category: string; 
                title: string; 
                excerpt: string; 
                image: string; 
                readTime: string; 
                date: string; 
            }),
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            content,
            ...(data as { 
                id: string; 
                category: string; 
                title: string; 
                excerpt: string; 
                image: string; 
                readTime: string; 
                date: string; 
            }),
        };
    } catch (error) {
        return null;
    }
}
