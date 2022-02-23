import React, { FC } from "react";

export type RemainingFlagsProps = {
  remainingFlags: number;
};

export const RemainingFlags: FC<RemainingFlagsProps> = ({ remainingFlags }) => {
  return (
    <div>
      <span role="img" aria-label="Remaining">
        💣
      </span>{" "}
      {remainingFlags}
    </div>
  );
};
