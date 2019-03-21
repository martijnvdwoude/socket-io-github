# socket-io-github
GitHub organization authorization for Socket.io.

This is useful for limiting Socket.io connections to members of a specific organization.

## Installing
`npm install socket-io-github`

## Usage
Set as middleware for Socket.io:

`const socketIOGithub = require('socket-io-github')`
`socketIOApp.use(socketIOGithub.authorize('mygithuborganization'))`
