## GitHub Copilot Chat

- Extension Version: 0.26.5 (prod)
- VS Code: vscode/1.99.3
- OS: Windows

## Network

User Settings:
```json
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 140.82.121.6 (70 ms)
- DNS ipv6 Lookup: Error (65 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (1 ms)
- Electron fetch (configured): HTTP 200 (262 ms)
- Node.js https: HTTP 200 (291 ms)
- Node.js fetch: HTTP 200 (316 ms)
- Helix fetch: HTTP 200 (272 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.113.22 (67 ms)
- DNS ipv6 Lookup: Error (65 ms): getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- Proxy URL: None (11 ms)
- Electron fetch (configured): 