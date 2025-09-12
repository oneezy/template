#!/usr/bin/env node
import("../src/main.ts").then((m) =>
	m.stories ? m.stories() : console.error("No stories export found")
).catch(console.error);
