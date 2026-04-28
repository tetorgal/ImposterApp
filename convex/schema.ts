import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  players: defineTable({
    playerName: v.string(),
    variant: v.union(v.literal('red'), v.literal('yellow'), v.literal('blue'), v.literal('green')),
  }),
});
