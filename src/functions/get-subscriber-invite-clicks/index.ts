import { RedisKey } from '../../constants/redis-key'
import { redis } from '../../redis/client'
import type { GetSubscriberInviteClicksParams } from './types'

export async function getSubscriberInviteClicks({
  subscriberId,
}: GetSubscriberInviteClicksParams) {
  const count = await redis.hget(RedisKey.REFERRAL_ACCESS_COUNT, subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
