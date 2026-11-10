---
name: React and Vite cache mismatches
description: Resolving stale React versions reported by Tanda's Vite preview after package updates.
---

**Rule:** If Tanda's preview reports mismatched React and React DOM versions even though the installed package graph shows matching versions, check for stale Vite optimized dependencies before changing package versions again.

**Why:** Vite can keep serving cached prebundled React code from an earlier install after the workspace package graph has been fixed.

**How to apply:** Inspect the resolved package versions, clear Tanda's local Vite dependency cache, restart the web workflow, and recapture the preview.
