"use client";

import type { FC } from "react";
import { useDispatch, useGameState } from "./game-state";
import { Card } from "./card";

export const WastePile: FC = () => {
  const dispatch = useDispatch();
  const { wastePile } = useGameState();

  return (
    <ol className="col-span-2 grid grid-cols-3 items-stretch">
      {wastePile.map((card, idx) => (
        <Card
          key={card.value + card.suit}
          {...card}
          facing="up"
          onMouseDown={
            idx === 0
              ? () =>
                  dispatch({
                    kind: "autoMove",
                    from: "wastePile",
                    fromColumnIndex: 0,
                    fromCardIndex: 0,
                  })
              : undefined
          }
        />
      ))}
    </ol>
  );
};
