import type { FC, HTMLAttributes } from "react";
import { twJoin } from "tailwind-merge";
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
    CardState {}

export const Card: FC<CardProps> = ({ facing, suit, value, ...divProps }) => {
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
      className={twJoin(
        "border-solid border-8 aspect-[63/88] rounded-lg z-10 relative p-2",
        facing === "up"
          ? "cursor-pointer bg-white border-black"
          : "bg-green-800 border-white",
        colour === "red" && "text-red-500",
      )}
    >
      {facing === "up" && (
        <p className="text-xl break-words leading-none">
          {formattedValue} {suitIcon}
        </p>
      )}
    </div>
  );
};
