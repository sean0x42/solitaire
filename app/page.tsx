import type { FC } from "react";
import { StockPile } from "~/components/stock-pile";
import { WastePile } from "~/components/waste-pile";
import { GameStateProvider } from "~/components/game-state/provider";
import { NewGameButton } from "~/components/new-game-button";
import { SolveSpace } from "~/components/solve-space";
import { Tableau } from "~/components/tableau";

const Home: FC = () => (
  <GameStateProvider>
    <NewGameButton />

    <main className="grid grid-cols-7 grid-rows-[auto_1fr] p-8 gap-5 bg-green-700">
      <SolveSpace />
      <WastePile />
      <StockPile />
      <Tableau />
    </main>
  </GameStateProvider>
);

export default Home;
