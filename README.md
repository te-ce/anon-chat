This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Features

- [ ] Self-destructing Chat Rooms (per TTL or manually by user)
- [ ] 1:1 limited conversations
- [ ] Redis backend
- [ ] Next frontend

# Tech Stack

- Next.js / React
- Tailwind CSS
- TypeScript
- Elysia
- Redis (Upstash)
- Tanstack Query

# Challenges

- How to create 'realtime' chat functionality?
- How to handle deletion of rooms?
- How to handle permissions for rooms (f.e. max of 2 per room)?
- Typesafe API with Elysia
