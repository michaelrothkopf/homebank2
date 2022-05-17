# Server

The server runs on Node.JS typescript.

It is structured based on some folders:

|      Folder       |     Description      |
| :---------------: | :------------------: |
|    [api](/src/packages/server/api)    |      API routes      |
|   [auth](/src/packages/server/auth)   | Authentication files |
| [config](/src/packages/server/config) | Configuration files  |
| [crypto](/src/packages/server/crypto) |     Crypto files     |
|     [db](/src/packages/server/db)     |    Database files    |
|    [lib](/src/packages/server/lib)    |     Common files     |

The [index.ts](index.ts) file starts an Express server. The express server's routes are loaded from the [api](/api) folder by [loadApiRoutes.ts](loadApiRoutes.ts).
