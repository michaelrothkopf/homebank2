# Changelog

## v0.1a

6/11/2021 @ 1:11 PM.

Alpha 0.1 of the backend.

Changes:

1. Refactored the [packages](/src/packages) folder to have one common server for the front- and backend.
2. Refactored the [API routes](/src/packages/api) to start with `/api/v2/` for consistency with the old `/api/v1/` standard.
3. Removed the "common" folder in favor of moving everything to the [lib](/src/packages/lib) folder.
4. Modified the gitignore to ignore the "dist" folder generated when compiling.
5. Re-generated the documentation.
