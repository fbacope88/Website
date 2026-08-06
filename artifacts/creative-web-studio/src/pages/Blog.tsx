import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { Mark } from "@/components/Mark";

interface PostMeta {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  keywords: string[];
  author: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data as PostMeta[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black font-sans text-[#f5f5f7]">
      <div className="bg-[#121214] border-b border-white/10 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <a
            href="/"
            className="flex items-center gap-2 text-[#98989d] hover:text-[#f5f5f7] transition-colors mb-8 text-sm w-fit"
            data-testid="link-back-home"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </a>
          <div className="flex items-center gap-2 text-sm font-semibold mb-4">
            <Mark size={20} />
            Creative Web Studio
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-balance">
            Web design tips &amp; business insights.
          </h1>
          <p className="text-[#98989d] mt-4 text-lg max-w-xl">
            Practical guides on getting a small business online, written by the Creative Web Studio team.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {loading ? (
          <div className="space-y-5" data-testid="blog-loading">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-white/10 rounded-xl p-7 animate-pulse bg-[#121214]">
                <div className="h-3 bg-white/10 rounded w-24 mb-4" />
                <div className="h-5 bg-white/10 rounded w-3/4 mb-3" />
                <div className="h-4 bg-white/10 rounded w-full mb-2" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border border-white/10 hover:border-[#2997ff]/50 rounded-xl p-7 transition-colors bg-[#121214]"
                data-testid={`link-post-${post.slug}`}
              >
                <div className="flex items-center gap-2 text-[#98989d] text-xs font-medium uppercase tracking-wider mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <h2 className="text-xl font-bold group-hover:text-[#2997ff] transition-colors mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-[#98989d] text-[15px] leading-relaxed mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-[#2997ff] font-medium text-sm">
                  Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            ))}
          </div>
        )}

        <div className="mt-14 border border-white/10 rounded-xl p-8 bg-[#121214]">
          <h2 className="text-xl font-bold mb-2">Ready to get your business online?</h2>
          <p className="text-[#98989d] mb-6 text-[15px] leading-relaxed">
            Professional websites from just &pound;199 &mdash; live in as little as 48&ndash;72 hours. One payment, nothing recurring.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-[#2997ff] text-black font-semibold px-6 py-3 rounded-md text-sm hover:brightness-110 transition"
            data-testid="link-blog-cta"
          >
            Get a free quote
          </a>
        </div>
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
