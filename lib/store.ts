import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateGame, ActiveGame } from './gameLogic';

export type AvatarVariant = 'danger' | 'warning' | 'secondary' | 'success';

export type Player = {
  id: string;
  playerName: string;
  variant: AvatarVariant;
};

export type GameMode = 'classic' | 'mysterious' | 'chaos';

export type GameConfig = {
  mode: GameMode;
  impostors: number;
  hintsEnabled: boolean;
  rounds: number;
  durationMinutes: number;
};

export type Role = 'civil' | 'impostor' | 'mrblanco';

export type GameState = {
  players: Player[];
  gameConfig: GameConfig;
  activeGame: ActiveGame | null;
  
  // Actions
  addPlayer: (playerName: string) => void;
  updatePlayer: (id: string, playerName: string) => void;
  removePlayer: (id: string) => void;
  setGameConfig: (config: Partial<GameConfig>) => void;
  startGame: () => void;
  setActiveGameState: (stateUpdate: Partial<ActiveGame>) => void;
};

const avatarVariants: AvatarVariant[] = ['danger', 'warning', 'secondary', 'success'];

const getNextVariant = (players: Player[]) => {
  let selectedVariant = avatarVariants[0];
  let lowestCount = Number.POSITIVE_INFINITY;

  avatarVariants.forEach((variant) => {
    const count = players.filter((player) => player.variant === variant).length;
    if (count < lowestCount) {
      lowestCount = count;
      selectedVariant = variant;
    }
  });

  return selectedVariant;
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      players: [],
      gameConfig: {
        mode: 'classic',
        impostors: 2,
        hintsEnabled: true,
        rounds: 1,
        durationMinutes: 4,
      },
      activeGame: null,
      addPlayer: (playerName) =>
        set((state) => ({
          players: [
            ...state.players,
            {
              id: Math.random().toString(36).substring(2, 9),
              playerName,
              variant: getNextVariant(state.players),
            },
          ],
        })),
      updatePlayer: (id, playerName) =>
        set((state) => ({
          players: state.players.map((p) =>
            p.id === id ? { ...p, playerName } : p
          ),
        })),
      removePlayer: (id) =>
        set((state) => ({
          players: state.players.filter((p) => p.id !== id),
        })),
      setGameConfig: (config) =>
        set((state) => ({
          gameConfig: { ...state.gameConfig, ...config },
        })),
      startGame: () => {
        const state = get();
        const newGame = generateGame(state.players, state.gameConfig, 1);
        set({ activeGame: newGame });
      },
      setActiveGameState: (stateUpdate) => {
        set((state) => ({
          activeGame: state.activeGame ? { ...state.activeGame, ...stateUpdate } : null
        }));
      }
    }),
    {
      name: 'impostor-game-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
