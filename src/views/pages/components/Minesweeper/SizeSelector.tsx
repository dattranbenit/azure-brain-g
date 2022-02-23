import React, { FC } from "react";
import { useGameState, useGameDispatch } from "./GameContext";
import { GridSizes } from "./GridSizes";

export const SizeSelector: FC = () => {
  const { gridSize: selectedSize } = useGameState();
  const dispatch = useGameDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = GridSizes.find(
      gridSize => gridSize.size === event.target.value
    );
    if (selected) {
      dispatch({ type: "change-size", payload: { gridSize: selected } });
    }
  };

  return (
    <div>
      <label>
        Game size:{" "}
        <select value={selectedSize.size} onChange={handleChange}>
          {GridSizes.map(gridSize => (
            <option key={gridSize.size} value={gridSize.size}>
              {gridSize.size}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
