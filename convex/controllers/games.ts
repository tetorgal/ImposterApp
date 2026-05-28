import { v } from 'convex/values';
import { createRequire } from 'node:module';
import { mutation } from '../_generated/server';

type WordBank = {
  categories: {
    id: string;
    name: string;
    words: {
      word: string;
      hint: string;
    }[];
  }[];
};

type WordEntry = {
  word: string;
  hint: string;
  categoryId: string;
  categoryName: string;
};

const require = createRequire(import.meta.url);
const wordBank = require('../../assets/data/words.json') as WordBank;

const availableWords: WordEntry[] = wordBank.categories.flatMap((category) =>
  category.words.map((entry) => ({
    word: entry.word,
    hint: entry.hint,
    categoryId: category.id,
    categoryName: category.name,
  }))
);

const hashSeed = (value: string) => {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
};

const pickWord = (gameId: string, roundNumber: number) => {
  if (availableWords.length === 0) {
    throw new Error('No words available');
  }

  const index = hashSeed(`${gameId}:${roundNumber}`) % availableWords.length;
  return availableWords[index];
};

const buildWordPayload = (gameId: string, roundNumber: number, showHints: boolean) => {
  const selectedWord = pickWord(gameId, roundNumber);

  return {
    word: selectedWord.word,
    ...(showHints ? { hint: selectedWord.hint } : {}),
  };
};

export const createGame = mutation({
  args: {
    hostId: v.id('players'),
    settings: v.object({
      mode: v.union(v.literal('clasico'), v.literal('caos'), v.literal('misterioso')),
      maxPlayers: v.number(),
      totalRounds: v.number(),
      roundDuration: v.number(),
      showHints: v.boolean(),
    }),
    impostorCount: v.number(),
  },
  handler: async (ctx, { hostId, settings, impostorCount }) => {
    const host = await ctx.db.get(hostId);
    if (!host) {
      throw new Error('Host not found');
    }

    const gameId = await ctx.db.insert('games', {
      hostId,
      status: 'lobby',
      settings,
      currentRoundNumber: 1,
    });

    const wordPayload = buildWordPayload(gameId, 1, settings.showHints);

    await ctx.db.patch(gameId, {
      ...wordPayload,
    });

    const roundId = await ctx.db.insert('rounds', {
      gameId,
      roundNumber: 1,
      status: 'guessing',
      ...wordPayload,
      roles: [],
      impostorCount,
    });

    return {
      gameId,
      roundId,
      roundNumber: 1,
      ...wordPayload,
    };
  },
});

export const updateGame = mutation({
  args: {
    gameId: v.id('games'),
    roundNumber: v.optional(v.number()),
    impostorCount: v.number(),
    status: v.optional(v.union(v.literal('lobby'), v.literal('playing'), v.literal('finished'))),
  },
  handler: async (ctx, { gameId, roundNumber, impostorCount, status }) => {
    const game = await ctx.db.get(gameId);
    if (!game) {
      throw new Error('Game not found');
    }

    const nextRoundNumber = roundNumber ?? game.currentRoundNumber + 1;
    const wordPayload = buildWordPayload(gameId, nextRoundNumber, game.settings.showHints);

    await ctx.db.patch(gameId, {
      currentRoundNumber: nextRoundNumber,
      status: status ?? 'playing',
      ...wordPayload,
    });

    const roundId = await ctx.db.insert('rounds', {
      gameId,
      roundNumber: nextRoundNumber,
      status: 'guessing',
      ...wordPayload,
      roles: [],
      impostorCount,
    });

    return {
      gameId,
      roundId,
      roundNumber: nextRoundNumber,
      ...wordPayload,
    };
  },
});

export const changeRounds = updateGame;
