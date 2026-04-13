import { getPostBySlug, getAllPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAZone from "@/components/CTAZone";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-deep-carbon text-signal selection:bg-signal/30 selection:text-signal font-sans overflow-clip flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover opacity-30 saturate-[0.1] contrast-[1.2]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-carbon via-deep-carbon/80 to-deep-carbon" />
                </div>

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <Link 
                        href="/insights" 
                        className="inline-flex items-center gap-2 text-metallic hover:text-signal transition-colors mb-12 group font-mono text-xs uppercase tracking-[0.2em]"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Journal
                    </Link>

                    <div className="flex flex-wrap items-center gap-6 mb-8">
                        <span className="px-3 py-1 bg-signal/10 backdrop-blur-md border border-signal/20 rounded-full font-mono text-[10px] uppercase tracking-widest text-signal shadow-lg shadow-signal/5">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-metallic font-mono text-[10px] uppercase tracking-widest">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                        </div>
                        <div className="flex items-center gap-2 text-metallic font-mono text-[10px] uppercase tracking-widest">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-serif text-signal leading-[1.1] tracking-tight mb-8">
                        {post.title}
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-metallic font-sans font-light leading-relaxed max-w-2xl italic">
                        {post.excerpt}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <article className="relative w-full pb-32">
                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    <div className="prose prose-invert prose-signal max-w-none 
                        prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight
                        prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:text-signal
                        prose-p:text-metallic/80 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-8
                        prose-strong:text-signal prose-strong:font-bold
                        prose-li:text-metallic/80 prose-li:text-lg prose-li:mb-2
                        prose-blockquote:border-l-signal prose-blockquote:bg-signal/5 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:italic
                    ">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-20 pt-12 border-t border-metallic/10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-metallic/20 border border-metallic/30 flex items-center justify-center font-serif text-xl italic text-metallic">
                                I
                            </div>
                            <div>
                                <p className="text-signal text-sm font-bold uppercase tracking-widest">Integrate Editorial</p>
                                <p className="text-metallic text-xs uppercase tracking-widest">Intelligence & Strategy</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {/* Share placeholders */}
                            <button className="w-10 h-10 rounded-full border border-metallic/20 flex items-center justify-center hover:bg-signal/10 hover:border-signal/30 transition-all text-metallic hover:text-signal">
                                <span className="sr-only">Share on Twitter</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </button>
                            <button className="w-10 h-10 rounded-full border border-metallic/20 flex items-center justify-center hover:bg-signal/10 hover:border-signal/30 transition-all text-metallic hover:text-signal">
                                <span className="sr-only">Share on LinkedIn</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></button>
                        </div>
                    </div>
                </div>
            </article>

            <div className="relative z-10 bg-deep-carbon">
                <CTAZone />
                <Footer />
            </div>
        </main>
    );
}
