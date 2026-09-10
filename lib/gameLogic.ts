import { Player, GameConfig, Role } from './store';
import wordData from '../assets/data/words.json';

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

const wordBank = wordData as WordBank;
const availableWords = wordBank.categories.flatMap((cat) => cat.words);

export type AssignedRole = {
  playerId: string;
  role: Role;
};

export type ActiveGame = {
  round: number;
  word: string;
  hint: string;
  roles: AssignedRole[];
  status: 'role-reveal' | 'playing' | 'voting' | 'resolution' | 'mrblanco-guess';
  eliminatedPlayerId?: string;
  winner?: 'civils' | 'impostors' | 'mrblanco';
};

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function generateGame(players: Player[], config: GameConfig, currentRound: number = 1): ActiveGame {
  const wordObj = availableWords[Math.floor(Math.random() * availableWords.length)];
  
  let impostorCount = config.impostors;
  
  if (config.mode === 'chaos') {
    // Random between 1 and players.length
    impostorCount = Math.floor(Math.random() * players.length) + 1;
  }
  
  let rolesPool: Role[] = Array(players.length).fill('civil');
  
  if (config.mode === 'mysterious') {
    rolesPool[0] = 'mrblanco';
    for (let i = 1; i <= impostorCount && i < rolesPool.length; i++) {
      rolesPool[i] = 'impostor';
    }
  } else {
    for (let i = 0; i < impostorCount && i < rolesPool.length; i++) {
      rolesPool[i] = 'impostor';
    }
  }
  
  rolesPool = shuffleArray(rolesPool);
  
  const assignedRoles: AssignedRole[] = players.map((p, index) => ({
    playerId: p.id,
    role: rolesPool[index]
  }));
  
  return {
    round: currentRound,
    word: wordObj.word,
    hint: wordObj.hint,
    roles: assignedRoles,
    status: 'role-reveal'
  };
}
