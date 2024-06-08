"use client";

import type { FC } from "react";
import { useDispatch, useGameState } from "./game-state";
import { Card } from "./card";

export const SolveSpace: FC = () => {
  const dispatch = useDispatch();
  const { solvedPiles } = useGameState();

  return (
    <div className="col-span-4 grid grid-cols-subgrid">
      {solvedPiles.map((pile, columnIndex) => {
        const topCard = pile.at(-1);
        return (
          <div className="bg-green-800 rounded-lg" key={columnIndex}>
            {topCard && (
              <Card
                {...topCard}
                onMouseDown={() =>
                  dispatch({
                    kind: "autoMove",
                    from: "solvedPile",
                    fromColumnIndex: columnIndex,
                    fromCardIndex: -1,
                  })
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
