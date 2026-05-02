"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Plus, X } from "lucide-react";
import ModeToggle from "./mode-toggle";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const navLinks = [
	{ label: "Blogs", href: "/blog" },
	{ label: "About Me", href: "/about-me" },
];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 12);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close menu on route change / resize
	useEffect(() => {
		const close = () => setMenuOpen(false);
		window.addEventListener("resize", close);
		return () => window.removeEventListener("resize", close);
	}, []);

	return (
		<header
			className={[
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				scrolled
					? "bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-lg"
					: "bg-transparent border-b",
			].join(" ")}
		>
			<nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* ── Logo ── */}
					<Link
						href="/"
						className="group flex items-center gap-2 select-none text-xl font-light"
						aria-label="thedevsden home"
					>
						<span className="tracking-tight text-zinc-900 dark:text-zinc-100">
							the
							<span className="text-zinc-400 dark:text-zinc-500">
								devs
							</span>
							den
						</span>
					</Link>

					{/* ── Desktop Links + Toggle ── */}
					<div className="hidden md:flex items-center gap-1">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="relative px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400
                           rounded-md transition-colors duration-150
                           hover:text-zinc-900 dark:hover:text-zinc-100
                           hover:bg-zinc-100 dark:hover:bg-zinc-800/60
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
							>
								{link.label}
							</Link>
						))}
					</div>

					<div className="hidden md:flex gap-2 ml-3 pl-3 border-zinc-200 dark:border-zinc-800">
						<ModeToggle />
						<Show when={"signed-out"}>
							<SignInButton>
								<Button
									variant="default"
									className="flex bg-orange-500 text-white hover:bg-orange-400 cursor-pointer"
								>
									<Plus />
									Sign In
								</Button>
							</SignInButton>
						</Show>
						<Show when="signed-in">
							<UserButton />
						</Show>
					</div>

					{/* ── Mobile: Toggle + Hamburger ── */}
					<div className="flex md:hidden items-center gap-2">
						<ModeToggle />
						<button
							onClick={() => setMenuOpen((prev) => !prev)}
							aria-label={menuOpen ? "Close menu" : "Open menu"}
							aria-expanded={menuOpen}
							className="inline-flex items-center justify-center w-9 h-9 rounded-md
                         text-zinc-600 dark:text-zinc-400
                         hover:text-zinc-900 dark:hover:text-zinc-100
                         hover:bg-zinc-100 dark:hover:bg-zinc-800
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500
                         transition-colors duration-150"
						>
							{menuOpen ? (
								<X className="w-5 h-5" />
							) : (
								<Menu className="w-5 h-5" />
							)}
						</button>
					</div>
				</div>

				{/* ── Mobile Dropdown ── */}
				<div
					className={[
						"md:hidden overflow-hidden transition-all duration-300 ease-in-out",
						menuOpen
							? "max-h-60 opacity-100 pb-4"
							: "max-h-0 opacity-0",
					].join(" ")}
					aria-hidden={!menuOpen}
				>
					<div className="flex flex-col gap-1 pt-1">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setMenuOpen(false)}
								className="px-3 py-2.5 rounded-lg text-sm font-medium
                           text-zinc-700 dark:text-zinc-300
                           hover:text-zinc-900 dark:hover:text-zinc-100
                           hover:bg-zinc-100 dark:hover:bg-zinc-800/70
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500
                           transition-colors duration-150"
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</nav>
		</header>
	);
}
