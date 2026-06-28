import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";

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
    <div className="min-h-screen bg-white font-sans text-[#1a1a2e]">
      <div className="bg-[#1a1a2e] py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <a
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>
          <span className="text-[#0066FF] font-bold tracking-wider uppercase text-xs block mb-3">Blog</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Web Design Tips & Business Insights
          </h1>
          <p className="text-gray-400 mt-3 text-lg max-w-xl">
            Expert guides on growing your business online, written by the Creative Web Studio Experts team.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-7 animate-pulse">
                <div className="h-3 bg-gray-100 rounded w-24 mb-4" />
                <div className="h-5 bg-gray-100 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border border-gray-200 hover:border-[#0066FF] rounded-2xl p-7 transition-all hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <h2 className="text-xl font-bold text-[#1a1a2e] group-hover:text-[#0066FF] transition-colors mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-[#0066FF] font-semibold text-sm">
                  Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            ))}
          </div>
        )}

        <div className="mt-16 bg-[#EEF4FF] rounded-2xl p-8 border border-[#c7d9ff]">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-2">Ready to get your business online?</h2>
          <p className="text-gray-600 mb-5 text-sm leading-relaxed">
            Professional websites from just £100 — live in as little as 48–72 hours. No hidden fees, no long contracts.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Get a Free Quote
          </a>
        </div>
      </div>

      <footer className="bg-[#05050A] text-gray-500 text-center py-6 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Creative Web Studio Experts. All rights reserved.{" "}
          &bull;{" "}
          <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
          {" "}&bull;{" "}
          <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
}
