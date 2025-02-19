import { eq } from 'drizzle-orm'
import { RedisKey } from '../../constants/redis-key'
import { db } from '../../drizzle/client'
import { subscriptions } from '../../drizzle/schema/subscriptions'
import { redis } from '../../redis/client'
import type { SubscribeToEventParams } from './types'

export async function subscribeToEvent({
  name,
  email,
  referrerId,
}: SubscribeToEventParams) {
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))

  if (subscribers.length > 0)
    return {
      subscriberId: subscribers[0].id,
    }

  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  if (referrerId) await redis.zincrby(RedisKey.REFERRAL_RANKING, 1, referrerId)

  const subscriber = result[0]

  return {
    subscriberId: subscriber.id,
  }
}
