import type { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { getSuitColour } from "~/lib/get-suit-color";
import type { CardState } from "~/lib/klondike";

function formatValue(value: number): string {
  switch (value) {
    case 1:
      return "A";
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    default:
      return value.toString();
  }
}

export interface CardProps
  extends Pick<HTMLAttributes<HTMLDivElement>, "onMouseDown" | "onClick">,
    CardState {
  className?: string;
}

export const Card: FC<CardProps> = ({
  id,
  className,
  facing,
  suit,
  value,
  ...divProps
}) => {
  const colour = getSuitColour(suit);
  const formattedValue = formatValue(value);
  const suitIcon =
    suit === "hearts"
      ? "♥"
      : suit === "diamonds"
        ? "♦"
        : suit === "clubs"
          ? "♣"
          : "♠";

  return (
    <div
      {...divProps}
      className={twMerge(
        "aspect-card rounded-lg z-10 relative p-[10%] shadow-2xl",
        facing === "up"
          ? "cursor-pointer bg-white"
          : "bg-green-800 border-solid border-8 border-white",
        colour === "red" && "text-red-500",
        className,
      )}
    >
      {facing === "up" && (
        <p className="text-[1.75vw] break-words leading-none">
          {formattedValue} {suitIcon}
        </p>
      )}

      {facing === "up" && (
        <p className="absolute left-0 right-0 text-[8vw] text-center">
          {suitIcon}
        </p>
      )}
    </div>
  );
};
