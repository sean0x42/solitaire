"use client";

import type { FC } from "react";
import { Card } from "~/components/card";
import { useDispatch, useGameState } from "./game-state";

export const Tableau: FC = () => {
  const dispatch = useDispatch();
  const { tableau } = useGameState();

  return (
    <div className="col-span-7 grid grid-cols-subgrid" suppressHydrationWarning>
      {tableau.map((column, columnIndex) => (
        <ol key={columnIndex} className="grid grid-rows-[repeat(10,3vw)]">
          {column.map((card, cardIndex) => (
            <Card
              {...card}
              key={card.value + card.suit}
              onMouseDown={() => {
                if (card.facing === "down") return;
                dispatch({
                  kind: "autoMove",
                  from: "tableau",
                  fromColumnIndex: columnIndex,
                  fromCardIndex: cardIndex,
                });
              }}
            />
          ))}
        </ol>
      ))}
    </div>
  );
};
