import { redis } from "@/lib/redis";

const WINDOW_SECONDS = 60 * 60;
const MAX_REQUESTS = 15;
const PREFIX = "portfolio:chat";

export async function rateLimit(ip: string) {
  const key = `${PREFIX}:ip:${ip}`;

  const count = await redis.incr(key);

  // First hit → set TTL
  if (count === 1) {
    await redis.expire(key, WINDOW_SECONDS);
  }

  const ttl = await redis.ttl(key);

  return {
    allowed: count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - count),
    resetInSeconds: ttl,
  };
}
