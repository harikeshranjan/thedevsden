"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			variant={"outline"}
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="cursor-pointer"
		>
			{theme === "dark" ? <Moon /> : <Sun />}
		</Button>
	);
}
