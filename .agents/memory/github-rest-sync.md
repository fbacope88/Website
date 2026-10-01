---
name: GitHub REST synchronization
description: Constraints when recreating Git history through GitHub's Git Database API with the Replit connector.
---

When creating commits through GitHub's Git Database API, verify tree SHAs and parent ancestry rather than expecting local commit SHAs to match. GitHub may serialize commits differently even when message, author, and date appear to match.

**Why:** A REST-created commit with the same intended tree and parent had a different SHA from the local commit.

**How to apply:** Build trees from the exact local blob SHAs, verify each resulting tree, preserve the remote base as an ancestor, and update refs with `force: false`.

For large blob uploads, do not stream multi-megabyte base64 through `shellExec` output. Stage base64 chunks in `/tmp`, read the chunks through `readFile`, then upload through `proxyFetch`. Keep chunks small enough to fit tool output limits and verify each returned blob SHA.

**Why:** `shellExec` output was capped well below the requested maximum, truncating large binary data.

**How to apply:** Split raw blobs into chunks of at most 600 KB, confirm the reassembled base64 length, and only then create the GitHub blob.