import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  players: defineTable({
    playerName: v.string(),
    variant: v.union(v.literal('red'), v.literal('yellow'), v.literal('blue'), v.literal('green')),
  }),
  games: defineTable({
    hostId: v.id('players'),
    status: v.union(v.literal('lobby'), v.literal('playing'), v.literal('finished')),
    settings: v.object({
      mode: v.union(v.literal('clasico'), v.literal('caos'), v.literal('misterioso')),
      maxPlayers: v.number(),
      totalRounds: v.number(),
      roundDuration: v.number(),
      showHints: v.boolean(),
    }),
    currentRoundNumber: v.number(),
    word: v.optional(v.string()),
    hint: v.optional(v.string()),
  }),
  rounds: defineTable({
    gameId: v.id('games'),
    roundNumber: v.number(),
    status: v.union(v.literal('voting'), v.literal('results'), v.literal('guessing')),
    word: v.optional(v.string()),
    hint: v.optional(v.string()),
    roles: v.array(
      v.object({
        playerId: v.id('players'),
        role: v.union(v.literal('impostor'), v.literal('civil'), v.literal('mrblanco')),
      })
    ),
    mrBlancoGuess: v.optional(v.string()),
    isMrBlancoCorrect: v.optional(v.boolean()),
    impostorCount: v.number(),
  }).index('by_game', ['gameId']),
});
