"use client";

import Link from "next/link";
import { ArrowRight, Code2, PenLine, Lightbulb, Sparkles } from "lucide-react";

const chips = [
	{ icon: PenLine, label: "Blogs" },
	{ icon: Code2, label: "Code" },
	{ icon: Lightbulb, label: "Ideas" },
	{ icon: Sparkles, label: "Everything" },
];

export default function Hero() {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-950 pt-16">
			{/* ── Ambient background blobs ── */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 overflow-hidden"
			>
				{/* Large orange orb — top right */}
				<div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-orange-500/20 dark:bg-orange-500/10 blur-[120px]" />
				{/* Smaller orb — bottom left */}
				<div className="absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full bg-orange-400/15 dark:bg-orange-400/8 blur-[100px]" />
				{/* Dot grid overlay */}
				<div
					className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
					style={{
						backgroundImage:
							"radial-gradient(circle, #f97316 1px, transparent 1px)",
						backgroundSize: "28px 28px",
					}}
				/>
			</div>

			{/* ── Main content ── */}
			<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				{/* Badge */}
				<div className="inline-flex items-center gap-2 mb-8">
					<div
						className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium
                       border border-orange-200/80 dark:border-orange-500/30
                       bg-orange-50/80 dark:bg-orange-950/40
                       text-orange-700 dark:text-orange-300
                       backdrop-blur-sm"
					>
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
							<span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
						</span>
						Open to new ideas & collabs
					</div>
				</div>

				{/* Headline */}
				<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6 text-zinc-900 dark:text-zinc-50">
					Welcome to{" "}
					<span className="relative inline-block">
						<span className="relative z-10 text-orange-500">
							thedevsden
						</span>
						{/* underline accent */}
						<svg
							aria-hidden
							className="absolute -bottom-2 left-0 w-full"
							viewBox="0 0 300 10"
							preserveAspectRatio="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2 8 Q75 2 150 6 Q225 10 298 4"
								stroke="#f97316"
								strokeWidth="3"
								fill="none"
								strokeLinecap="round"
								opacity="0.7"
							/>
						</svg>
					</span>
				</h1>

				{/* Subheadline */}
				<p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
					A corner of the internet where I share thoughts on{" "}
					<span className="text-zinc-900 dark:text-zinc-200 font-medium">
						code
					</span>
					,{" "}
					<span className="text-zinc-900 dark:text-zinc-200 font-medium">
						design
					</span>
					,{" "}
					<span className="text-zinc-900 dark:text-zinc-200 font-medium">
						life
					</span>
					, and everything in between — written honestly, built with
					curiosity.
				</p>

				{/* CTA buttons */}
				<div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
					<Link
						href="/blog"
						className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                       bg-orange-500 hover:bg-orange-600 active:scale-[0.97]
                       text-white shadow-lg shadow-orange-500/30 dark:shadow-orange-500/20
                       transition-all duration-200"
					>
						Read the Blog
						<ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
					</Link>

					<Link
						href="/about"
						className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                       border border-zinc-200 dark:border-zinc-800
                       bg-white/60 dark:bg-zinc-900/60
                       text-zinc-700 dark:text-zinc-300
                       backdrop-blur-sm
                       hover:border-orange-300 dark:hover:border-orange-700
                       hover:text-orange-600 dark:hover:text-orange-400
                       hover:bg-orange-50/50 dark:hover:bg-orange-950/30
                       active:scale-[0.97] transition-all duration-200"
					>
						About Me
					</Link>
				</div>

				{/* Topic chips */}
				<div className="flex flex-wrap items-center justify-center gap-3">
					{chips.map(({ icon: Icon, label }) => (
						<div
							key={label}
							className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                         bg-white/70 dark:bg-zinc-900/70
                         border border-zinc-200/80 dark:border-zinc-800/80
                         text-zinc-700 dark:text-zinc-300
                         backdrop-blur-sm
                         shadow-sm
                         hover:border-orange-300 dark:hover:border-orange-700
                         hover:text-orange-600 dark:hover:text-orange-400
                         hover:bg-orange-50/60 dark:hover:bg-orange-950/30
                         transition-all duration-150 cursor-default select-none"
						>
							<Icon
								className="w-4 h-4 text-orange-500"
								strokeWidth={2}
							/>
							{label}
						</div>
					))}
				</div>

				{/* Glassmorphism stat cards */}
				<div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
					{[
						{ value: "50+", label: "Articles written" },
						{ value: "∞", label: "Ideas in the queue" },
						{ value: "1", label: "Curious mind" },
					].map(({ value, label }) => (
						<div
							key={label}
							className="rounded-2xl px-6 py-5
                         bg-white/60 dark:bg-zinc-900/50
                         border border-white/80 dark:border-zinc-800/80
                         backdrop-blur-md
                         shadow-sm
                         flex flex-col items-center gap-1
                         hover:border-orange-200 dark:hover:border-orange-800
                         transition-colors duration-200"
						>
							<span className="text-3xl font-bold text-orange-500">
								{value}
							</span>
							<span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wide uppercase">
								{label}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* ── Bottom fade ── */}
			<div
				aria-hidden
				className="pointer-events-none absolute bottom-0 left-0 right-0 h-32
                   bg-gradient-to-t from-white dark:from-zinc-950 to-transparent"
			/>
		</section>
	);
}
