"use client";

import type { FC } from "react";
import { Card } from "~/components/card";
import { useDispatch, useGameState } from "./game-state";

export const StockPile: FC = () => {
  const dispatch = useDispatch();

  const { stockPile } = useGameState();
  const topCard = stockPile[stockPile.length - 1];

  return (
    <div className="col-span-1">
      {topCard && (
        <Card
          {...topCard}
          facing="down"
          onMouseDown={() => {
            dispatch({ kind: "deal" });
          }}
        />
      )}
    </div>
  );
};
