import { RedisKey } from '../../constants/redis-key'
import { redis } from '../../redis/client'
import type { GetSubscriberInvitesCountParams } from './types'

export async function getSubscriberInvitesCount({
  subscriberId,
}: GetSubscriberInvitesCountParams) {
  const count = await redis.zscore(RedisKey.REFERRAL_RANKING, subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
