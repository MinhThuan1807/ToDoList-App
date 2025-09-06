import { env } from './environment'
import Redis from 'ioredis'

export const redisClient = new Redis(env.REDIS_URL)
