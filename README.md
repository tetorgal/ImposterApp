# Impostor - Game Implementation Roadmap

This document outlines the current state of the Impostor app and the categorized pending tasks required to complete its implementation.

## 📊 Current State
- **UI Scaffold**: Landing page, mode selection (Local vs Online).
- **Offline Setup**: Pregame setup exists (`offline-pregame.tsx`, `offline-players.tsx`, `offline-time.tsx`) allowing users to pick duration, player counts, impostors, and toggle hints.
- **Backend (Convex)**: Schema defined for `games`, `rounds`, and `players`. Controllers exist to fetch words and manage game/round creation.
- **Word Bank**: `words.json` contains categorized words.

## 🎮 Game Modes
- **Clásico**: Standard game mode with Civilians and a set number of Impostors.
- **Misterioso**: Introduces the "Mr. Blanco" role alongside Civilians and Impostors. Mr. Blanco does not know the word, but if caught, they can steal the win by guessing the secret word correctly.
- **Caos**: A wildly unpredictable mode where every random round features a random number of Impostors (could be 2, could be almost everyone, or even everyone!).

## 🚀 Pending Tasks

### Phase 1: Core Offline Gameplay Loop (Pass & Play)
- [ ] **Migrate Offline DB to Local Storage**: To ensure a highly optimized and smooth experience, refactor the offline mode (`offline-players.tsx`) to use local storage (e.g., MMKV, SQLite, or AsyncStorage) instead of the Convex cloud database.
- [ ] **Game Initialization**: Connect the "Iniciar juego" button in `offline-pregame.tsx` to a local game state manager. Map the active players to the new game session.
- [ ] **Role Reveal Screen (`offline-rounds.tsx`)**: Implement a "pass-the-device" flow. Each player taps their name, views their role and the secret word (if applicable), hides it, and hands the phone to the next person.
- [ ] **Active Game / Timer Screen**: A live dashboard showing the ticking clock based on the selected duration, including a button to prematurely end discussion if a consensus is reached.
- [ ] **Voting & Elimination**: A screen where players vote on who they believe the Impostor is. Reveal the eliminated player's actual role upon voting completion.
- [ ] **Mr. Blanco Mechanics (Misterioso Mode)**: If Mr. Blanco is voted out, present a screen for them to attempt a guess at the secret word to steal the win.
- [ ] **Round Resolution & Scoreboard**: Show the results of the round, distribute points, and provide an option to start the next round.

### Phase 2: Online Multiplayer Mode [SKIP ONLINE]
- [ ] **Online Pregame / Lobby System**: Create a lobby UI where a Host can create a room, and others can join via a room code. This mode will exclusively use the Convex backend.
- [ ] **Real-Time Sync**: Ensure game settings (mode, Impostor count, time, hints) update in real-time for all connected clients using Convex subscriptions.
- [ ] **Multi-Device Role Reveal**: Instead of passing a single device, securely push each user's specific role to their own device screen simultaneously.
- [ ] **Live Voting**: Implement real-time voting where each user taps their screen, and the host device/backend tallies the votes.

### Phase 3: Game Modes & Mechanics Polish
- [ ] **Caos Mode Implementation**: Write the logic to randomize the Impostor count on a per-round basis, ensuring players aren't aware of how many Impostors exist in that specific round.
- [ ] **Word Packs Manager**: Complete the UI in `index.tsx` for "Paquetes" to allow users to view the collection, purchase, or create custom word packs.

### Phase 4: UI/UX Polish & Technical Debt
- [ ] **Component Fixes**: Repair missing or commented-out components like `StyledGradient` in `offline-pregame.tsx` and replace them with stable `expo-linear-gradient` instances.
- [ ] **Animations & Feedback**: Add haptic feedback, sound effects for role reveals, voting, and win/loss screens using `react-native-reanimated`.
