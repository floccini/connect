import { RedisKey } from '../../constants/redis-key'
import { redis } from '../../redis/client'
import type { AccessInviteLinkParams } from './types'

export async function accessInviteLink({
  subscriberId,
}: AccessInviteLinkParams) {
  await redis.hincrby(RedisKey.REFERRAL_ACCESS_COUNT, subscriberId, 1)
}
