# Changelog

## v0.1.1a

6/18/2021 @ 2:43 PM.

Alpha 0.1.1.

Changes:

1. Added build scripts to the [package.json](package.json) file.
2. Added [Webpack](webpack.config.client.js) to compile the frontend's React Typescript JSX.
3. Changed [tsconfig.json](tsconfig.json) to allow JSX in the parsing.
4. Added [Webpack](webpack.config.client.js) and [Babel](.babelrc.json) dependencies to [package.json](package.json).
5. Began work on [front-end](src/packages/public/js) React code.
6. Removed the pre-generated documentation folders, contributors now have to independently generate it.
7. Many other minor changes and security fixes. Check the diff for more info.

## v0.1a

6/11/2021 @ 1:11 PM.

Alpha 0.1 of the backend.

Changes:

1. Refactored the [packages](/src/packages) folder to have one common server for the front- and backend.
2. Refactored the [API routes](/src/packages/api) to start with `/api/v2/` for consistency with the old `/api/v1/` standard.
3. Removed the "common" folder in favor of moving everything to the [lib](/src/packages/lib) folder.
4. Modified the gitignore to ignore the "dist" folder generated when compiling.
5. Re-generated the documentation.
