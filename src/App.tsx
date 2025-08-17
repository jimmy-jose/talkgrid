import { useEffect, useState } from 'react'
import './App.css'
import type { Card } from './types';
import SettingsPage from './pages/SettingsPage';
import PinPage from './pages/PinPage';
import HomePage from './pages/HomePage';

const defaultCards: Card[] = [
  { id: 1, icon: '😊', text: 'I am happy' },
  { id: 2, icon: '😢', text: 'I am sad' },
  { id: 3, icon: '😠', text: 'I am angry' },
  { id: 4, icon: '😴', text: 'I am tired' },
  { id: 5, icon: '🍔', text: 'I am hungry' },
  { id: 6, icon: '🥤', text: 'I am thirsty' },
  { id: 7, icon: '🚽', text: 'I need to use the bathroom' },
  { id: 8, icon: '❤️', text: 'I love you' },
  { id: 9, icon: '👍', text: 'Yes' },
  { id: 10, icon: '👎', text: 'No' },
  { id: 11, icon: '👋', text: 'Hello' },
  { id: 12, icon: '🙏', text: 'Please' },
  { id: 13, icon: '🤗', text: 'Thank you' },
  { id: 14, icon: '🎮', text: 'I want to play' },
  { id: 15, icon: '📖', text: 'I want to read' },
  { id: 16, icon: '🤫', text: 'I need quiet time' },
];

function App() {
  const [page, setPage] = useState('home'); // 'home', 'pin', 'settings'
  const [cards, setCards] = useState<Card[]>(() => {
    const savedCards = localStorage.getItem('aac-cards');
    return savedCards ? JSON.parse(savedCards) : defaultCards;
  });
  const [pin, setPin] = useState<string>(() => {
    return localStorage.getItem('aac-pin') || '1234';
  });
  const [voice, setVoice] = useState<string>(() => {
    return localStorage.getItem('aac-voice') || '';
  });

  useEffect(() => {
    localStorage.setItem('aac-cards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('aac-pin', pin);
  }, [pin]);

  useEffect(() => {
    localStorage.setItem('aac-voice', voice);
  }, [voice]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.name === voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 'settings':
        return (
          <SettingsPage
            cards={cards}
            setCards={setCards}
            pin={pin}
            setPin={setPin}
            currentVoice={voice}
            setVoice={setVoice}
            goToHome={() => setPage('home')}
          />
        );
      case 'pin':
        return (
          <PinPage
            correctPin={pin}
            onSuccess={() => setPage('settings')}
            onBack={() => setPage('home')}
          />
        );
      default:
        return (
          <HomePage
            cards={cards}
            speak={speak}
            goToSettings={() => setPage('pin')}
          />
        );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {renderPage()}
    </div>
  );
}

export default App;
