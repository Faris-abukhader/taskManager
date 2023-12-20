import Redis from "ioredis"

const client = new Redis(process.env.REDIS_URL!);
await client.set('foo', 'bar');