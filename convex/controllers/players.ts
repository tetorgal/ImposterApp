import { query, mutation } from '../_generated/server';
import { v } from 'convex/values';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('players').collect();
  },
});

export const create = mutation({
  args: {
    playerName: v.string(),
    variant: v.union(v.literal('red'), v.literal('yellow'), v.literal('blue'), v.literal('green')),
  },
  handler: async (ctx, { playerName, variant }) => {
    return await ctx.db.insert('players', {
      playerName,
      variant,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id('players'),
    playerName: v.string(),
  },
  handler: async (ctx, { id, playerName }) => {
    const player = await ctx.db.get(id);
    if (!player) throw new Error('Player not found');
    await ctx.db.patch(id, { playerName });
    return id;
  },
});

export const remove = mutation({
  args: {
    id: v.id('players'),
  },
  handler: async (ctx, { id }) => {
    const player = await ctx.db.get(id);
    if (!player) throw new Error('Player not found');
    await ctx.db.delete(id);
    return id;
  },
});
