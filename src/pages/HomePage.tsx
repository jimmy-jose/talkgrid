import { useState } from 'react';
import { Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Card } from '../types';
import GridItem from '../components/GridItem';

interface HomePageProps {
  cards: Card[];
  speak: (text: string) => void;
  goToSettings: () => void;
}

const CARDS_PER_PAGE = 12;

function HomePage({ cards, speak, goToSettings }: HomePageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cards.length / CARDS_PER_PAGE);

  const paginatedCards = cards.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">TalkGrid</h1>
        <button
          onClick={goToSettings}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          aria-label="Settings"
        >
          <Settings className="text-gray-700" />
        </button>
      </header>

      <main className="grid grid-cols-4 gap-4">
        {paginatedCards.map((card) => (
          <GridItem key={card.id} card={card} onSelect={speak} />
        ))}
      </main>

      {totalPages > 1 && (
        <footer className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft />
          </button>
          <span className="font-semibold text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight />
          </button>
        </footer>
      )}
    </div>
  );
}

export default HomePage;