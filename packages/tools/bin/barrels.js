#!/usr/bin/env node
import("../src/main.ts").then((m) =>
	m.barrels ? m.barrels() : console.error("No barrels export found")
).catch(console.error);
