"use client";

import { useEffect, useState } from "react";
import { Search, ArrowRight, Clock, Tag } from "lucide-react";
import { Post, Topic } from "@/lib/types";
import { supabase } from "@/lib/supabase/client";

const topicColors: Record<string, string> = {
	orange: "bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/60",
	amber: "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60",
	violet: "bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/60",
	blue: "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60",
	zinc: "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700",
	emerald:
		"bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60",
};

export default function BlogsPage() {
	const [activeTopic, setActiveTopic] = useState("all");
	const [query, setQuery] = useState("");

	const [posts, setPosts] = useState<Post[]>([]);
	const [topics, setTopics] = useState<Topic[]>([]);
	const [loading, setLoading] = useState(true);

	// 🔄 Fetch data
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			const { data: postsData } = await supabase
				.from("posts")
				.select("*, topics(*)")
				.eq("published", true)
				.order("published_at", { ascending: false });

			const { data: topicsData } = await supabase
				.from("topics")
				.select("*");

			setPosts(postsData || []);
			setTopics(topicsData || []);
			setLoading(false);
		};

		fetchData();
	}, []);

	// 🔍 Filtering
	const filtered = posts.filter((p) => {
		const matchTopic = activeTopic === "all" || p.topic_id === activeTopic;

		const matchQuery =
			query === "" ||
			p.title.toLowerCase().includes(query.toLowerCase()) ||
			(p.excerpt ?? "").toLowerCase().includes(query.toLowerCase());

		return matchTopic && matchQuery;
	});

	const featured = filtered.find((p) => p.featured) ?? filtered[0] ?? null;

	const rest = filtered.filter((p) => p.id !== featured?.id);

	// 🧠 Helpers
	const formatDate = (date?: string) => {
		if (!date) return "";
		return new Date(date).toLocaleDateString("en-IN", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	};

	return (
		<main className="relative min-h-screen bg-white dark:bg-zinc-950 overflow-x-hidden">
			{/* Background */}
			<div
				aria-hidden
				className="pointer-events-none fixed inset-0 overflow-hidden -z-0"
			>
				<div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-orange-500/15 dark:bg-orange-500/8 blur-[110px]" />
				<div className="absolute top-1/2 -left-32 w-[320px] h-[320px] rounded-full bg-orange-400/10 dark:bg-orange-400/5 blur-[90px]" />
			</div>

			<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
				{/* HERO */}
				<div className="mb-12 max-w-2xl">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-5 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/60 text-orange-600 dark:text-orange-400">
						<span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
						{posts.length} articles & counting
					</div>

					<h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
						The Blog.{" "}
						<span className="text-orange-500">Unfiltered.</span>
					</h1>

					<p className="text-zinc-500 dark:text-zinc-400">
						Quantum mechanics to drone warfare. Transformers to
						terminal tricks.
					</p>
				</div>

				{/* SEARCH + FILTER */}
				<div className="flex flex-col sm:flex-row gap-4 mb-10">
					<div className="relative w-full sm:w-72">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
						<input
							type="text"
							placeholder="Search articles…"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border"
						/>
					</div>

					<div className="flex gap-2 overflow-x-auto">
						<button
							onClick={() => setActiveTopic("all")}
							className="px-4 py-2 rounded-xl text-sm border"
						>
							All
						</button>

						{topics.map((t) => (
							<button
								key={t.id}
								onClick={() => setActiveTopic(t.id)}
								className="px-4 py-2 rounded-xl text-sm border"
							>
								{t.label}
							</button>
						))}
					</div>
				</div>

				{/* LOADING */}
				{loading && (
					<p className="text-sm text-zinc-500">Loading articles...</p>
				)}

				{/* CONTENT */}
				{!loading && filtered.length === 0 && (
					<p className="text-zinc-500">No articles found.</p>
				)}

				{!loading && featured && (
					<article className="mb-8 p-6 border rounded-2xl">
						<div className="flex gap-2 mb-3">
							{featured.topics && (
								<span
									className={`px-2 py-1 text-xs border rounded ${
										topicColors[featured.topics.color]
									}`}
								>
									<Tag className="inline w-3 h-3 mr-1" />
									{featured.topics.label}
								</span>
							)}

							<span className="text-xs text-zinc-400 flex items-center gap-1">
								<Clock className="w-3 h-3" />
								{featured.read_time} min
							</span>

							<span className="text-xs text-zinc-400">
								{formatDate(featured.published_at)}
							</span>
						</div>

						<h2 className="text-xl font-bold mb-2">
							{featured.title}
						</h2>

						<p className="text-zinc-500 mb-4">{featured.excerpt}</p>

						<div className="text-orange-500 flex items-center gap-1">
							Read article <ArrowRight className="w-4 h-4" />
						</div>
					</article>
				)}

				{/* GRID */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{rest.map((post) => (
						<article
							key={post.id}
							className="p-5 border rounded-2xl"
						>
							{post.topics && (
								<span
									className={`px-2 py-1 text-xs border rounded ${
										topicColors[post.topics.color]
									}`}
								>
									{post.topics.label}
								</span>
							)}

							<h3 className="font-semibold mt-2 mb-2">
								{post.title}
							</h3>

							<p className="text-sm text-zinc-500 mb-3">
								{post.excerpt}
							</p>

							<div className="text-xs text-zinc-400 flex justify-between">
								<span>{formatDate(post.published_at)}</span>
								<span>{post.read_time} min</span>
							</div>
						</article>
					))}
				</div>
			</div>
		</main>
	);
}
