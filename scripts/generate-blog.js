const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const TOPICS = [
    "AI Agents for SDR tasks",
    "B2B Revenue Automation",
    "Multi-agent AI Architectures",
    "The ROI of AI in Enterprise",
    "Replacing legacy workflows with LLMs",
    "Data Security in B2B AI Automation",
    "Custom AI vs Off-the-shelf tools",
    "The future of AI-driven sales cycles"
];

const IMAGE_KEYWORDS = [
    "technology abstract dark",
    "minimalist server room",
    "neural network cyber",
    "digital architecture",
    "abstract connectivity silver",
    "futuristic office minimalist"
];

async function generateBlogPost() {
    console.log("Starting blog post generation...");

    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const imageKeyword = IMAGE_KEYWORDS[Math.floor(Math.random() * IMAGE_KEYWORDS.length)];
    
    // Generate a random high-quality Unsplash image URL
    const imageUrl = `https://images.unsplash.com/photo-${Date.now()}?q=80&w=2670&auto=format&fit=crop&sig=${Math.random()}`;
    // Since unsplash photo IDs are specific, let's use a more reliable set of base images or prompts.
    // Actually, for a real automation, I'd search the Unsplash API, but here I'll use a few "hero" images that always look good.
    const STOCK_IMAGES = [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2640&auto=format&fit=crop"
    ];
    const selectedImage = STOCK_IMAGES[Math.floor(Math.random() * STOCK_IMAGES.length)];

    const prompt = `
        You are an elite B2B AI Automation Architect at "Integrate". 
        Write a high-end, strategic blog post for the "Insights" section of our website.
        
        Topic: ${topic}
        Tone: Professional, elite, visionary, slightly technical but focused on business ROI.
        Aesthetic: Dark, metallic, high-performance.
        
        Format the output as a JSON object with the following keys:
        - title: A compelling, punchy title.
        - category: One of [Strategy, Case Study, Engineering].
        - excerpt: A 2-sentence hook for the article card.
        - content: The full article in Markdown format (including h2, h3, bullet points).
        - readTime: Estimated read time (e.g., "7 Min Read").
        
        Ensure the markdown content is formatted beautifully and uses high-impact language.
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });

        const data = JSON.parse(response.choices[0].message.content);
        const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const date = format(new Date(), 'yyyy-MM-dd');
        
        const fileContent = `---
id: ${slug}
category: ${data.category}
title: "${data.title.replace(/"/g, '\\"')}"
excerpt: "${data.excerpt.replace(/"/g, '\\"')}"
image: "${selectedImage}"
readTime: "${data.readTime}"
date: "${date}"
---

${data.content}
`;

        const filePath = path.join(__dirname, '../content/blog', `${slug}.md`);
        fs.writeFileSync(filePath, fileContent);
        
        console.log(`Successfully generated: ${slug}.md`);
    } catch (error) {
        console.error("Error generating blog post:", error);
        process.exit(1);
    }
}

generateBlogPost();
