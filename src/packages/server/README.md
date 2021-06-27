# Server

The server runs on Node.JS typescript.

It is structured based on some folders:

|      Folder       |     Description      |
| :---------------: | :------------------: |
|    [api](/api)    |      API routes      |
|   [auth](/auth)   | Authentication files |
| [config](/config) | Configuration files  |
| [crypto](/crypto) |     Crypto files     |
|     [db](/db)     |    Database files    |
|    [lib](/lib)    |     Common files     |

The [index.ts](index.ts) file starts an Express server. The express server's routes are loaded from the [api](/api) folder by [loadApiRoutes.ts](loadApiRoutes.ts).
