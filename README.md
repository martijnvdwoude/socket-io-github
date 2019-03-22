# socketio-github-org

GitHub organization authorization for Socket.io.

This is useful for limiting Socket.io connections to members of a specific GitHub organization based on a GitHub token.

## Installation

`npm install socketio-github-org`

## Example usage

Set as middleware for Socket.io:

```
const io = require("socket.io")(server)
const socketIOGithub = require("socketio-github-org")

io.use(socketIOGithub.authorize('Mygithuborganization'))
```

### Client side

Append the GitHub token in the query string:
```
const socket = io.connect('http://localhost:9000', {
  'query': 'token=' + github_token
})
```
