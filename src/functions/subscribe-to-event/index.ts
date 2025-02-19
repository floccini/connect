import { db } from '../../drizzle/client'
import { subscriptions } from '../../drizzle/schema/subscriptions'
import type { SubscribeToEventParams } from './types'

export async function subscribeToEvent({
  name,
  email,
}: SubscribeToEventParams) {
  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  const subscriber = result[0]

  return {
    subscriberId: subscriber.id,
  }
}
