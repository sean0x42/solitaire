"use client";

import type { FC } from "react";
import { useDispatch, useGameState } from "./game-state";
import { Card } from "./card";

export const WastePile: FC = () => {
  const dispatch = useDispatch();
  const { wastePile } = useGameState();

  const first = wastePile.at(-3);
  const second = wastePile.at(-2);
  const third = wastePile.at(-1);

  return (
    <ol className="col-span-2 grid grid-cols-4 gap-5 items-stretch">
      {third && (
        <Card
          key={third.id}
          className="col-start-1 col-end-3 row-start-1"
          {...third}
          facing="up"
          onMouseDown={() => {
            if (first !== undefined || second !== undefined) return;
            dispatch({
              kind: "autoMove",
              from: "wastePile",
              fromColumnIndex: 0,
              fromCardIndex: 0,
            });
          }}
        />
      )}

      {second && (
        <Card
          key={second.id}
          className="col-start-2 col-end-4 row-start-1"
          {...second}
          facing="up"
          onMouseDown={() => {
            if (first !== undefined) return;
            dispatch({
              kind: "autoMove",
              from: "wastePile",
              fromColumnIndex: 0,
              fromCardIndex: 0,
            });
          }}
        />
      )}

      {first && (
        <Card
          key={first.id}
          className="col-start-3 col-end-5 row-start-1"
          {...first}
          facing="up"
          onMouseDown={() =>
            dispatch({
              kind: "autoMove",
              from: "wastePile",
              fromColumnIndex: 0,
              fromCardIndex: 0,
            })
          }
        />
      )}
    </ol>
  );
};
