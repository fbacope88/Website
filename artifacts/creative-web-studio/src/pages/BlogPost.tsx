import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { ArrowLeft, Calendar } from "lucide-react";
import { Mark } from "@/components/Mark";

interface Post {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  keywords: string[];
  author: string;
  image?: string;
  bodyHtml: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [status, setStatus] = useState<"loading" | "found" | "not-found">("loading");

  useEffect(() => {
    setStatus("loading");
    fetch(`/api/blog/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((data) => {
        setPost(data as Post);
        setStatus("found");
      })
      .catch(() => setStatus("not-found"));
  }, [slug]);

  return (
    <div className="min-h-screen bg-black font-sans text-[#f5f5f7]">
      <div className="bg-[#121214] border-b border-white/10 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <a
            href="/blog"
            className="flex items-center gap-2 text-[#98989d] hover:text-[#f5f5f7] transition-colors mb-8 text-sm w-fit"
            data-testid="link-back-blog"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </a>
          <div className="flex items-center gap-2 text-sm font-semibold mb-4">
            <Mark size={20} />
            Creative Web Studio
          </div>
          {status === "found" && post && (
            <>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-balance" data-testid="text-post-title">
                {post.title}
              </h1>
              <div className="flex items-center gap-2 text-[#98989d] text-sm mt-4">
                <Calendar className="w-3.5 h-3.5" />
                Published{" "}
                {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                {" · "}
                {post.author}
              </div>
              <p className="text-[#98989d] mt-4 text-lg max-w-xl">{post.excerpt}</p>
            </>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {status === "loading" && (
          <div className="space-y-3 animate-pulse" data-testid="post-loading">
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-5/6" />
            <div className="h-4 bg-white/10 rounded w-3/4" />
          </div>
        )}

        {status === "not-found" && (
          <div className="text-center py-16" data-testid="post-not-found">
            <h2 className="text-2xl font-bold mb-3">Post not found.</h2>
            <p className="text-[#98989d] mb-6">This article may have moved or no longer exists.</p>
            <a href="/blog" className="text-[#2997ff] hover:underline">
              Back to all articles &rsaquo;
            </a>
          </div>
        )}

        {status === "found" && post && (
          <>
            <article
              className="prose prose-invert max-w-none prose-headings:font-bold prose-a:text-[#2997ff] prose-strong:text-[#f5f5f7]"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            />

            <div className="mt-14 border border-white/10 rounded-xl p-8 bg-[#121214]">
              <h2 className="text-xl font-bold mb-2">Ready to get your business online?</h2>
              <p className="text-[#98989d] mb-6 text-[15px] leading-relaxed">
                Professional websites from just &pound;199 &mdash; live in as little as 48&ndash;72 hours. One payment, nothing recurring.
              </p>
              <a
                href="/#contact"
                className="inline-block bg-[#2997ff] text-black font-semibold px-6 py-3 rounded-md text-sm hover:brightness-110 transition"
                data-testid="link-post-cta"
              >
                Get a free quote
              </a>
            </div>
          </>
        )}
      </div>

      <footer className="border-t border-white/10 text-[#98989d] text-center py-8 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Creative Web Studio Experts &bull;{" "}
          <a href="/privacy-policy" className="hover:text-[#f5f5f7] transition-colors">Privacy Policy</a>
          {" "}&bull;{" "}
          <a href="/terms-of-service" className="hover:text-[#f5f5f7] transition-colors">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
}
