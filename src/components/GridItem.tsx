import type { Card } from "../types";


interface GridItemProps {
  card: Card;
  onSelect: (text: string) => void;
}

function GridItem({ card, onSelect }: GridItemProps) {
  return (
    <button
      onClick={() => onSelect(card.text)}
      className="bg-white rounded-lg border-4 border-gray-300 shadow-lg flex flex-col items-center justify-center aspect-square p-2 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
    >
      <div className="text-6xl md:text-7xl lg:text-8xl mb-2">{card.icon}</div>
      <p className="text-center text-sm md:text-base font-semibold text-gray-700">{card.text}</p>
    </button>
  );
}

export default GridItem;