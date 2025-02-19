import { RedisKey } from '../../constants/redis-key'
import { redis } from '../../redis/client'
import type { GetSubscriberRankingPositionParams } from './types'

export async function getSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPositionParams) {
  const rank = await redis.zrevrank(RedisKey.REFERRAL_RANKING, subscriberId)

  if (rank === null) return { position: null }

  return { position: rank + 1 }
}
