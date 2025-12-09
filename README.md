This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Features

- Next frontend
- Self-destructing Chat Rooms (per TTL or manually by user)
- 1:1 limited conversations
- 'Realtime' chat functionality with Redis Streams and Pub/Sub (Upstash Realtime)
- Elysia backend using Upstash Redis and Realtime

# Tech Stack

- Next.js / React
- Tailwind CSS
- TypeScript
- Elysia
- Redis (Upstash) with Streams and Pub/Sub (Upstash Realtime)
- Tanstack Query
- Zod
- date-fns

# Challenges

- How to handle 'realtime' chat functionality?
- How to handle deletion of rooms?
- How to handle permissions for rooms (f.e. max of 2 per room, correct data send)?
- Typesafe API with Elysia?
- Understand server and client side components and data handling between them.
