import React, { useState, useEffect } from 'react';
import { Plus, Save, Trash2, Edit, ArrowLeft, Check, X } from 'lucide-react';
import type { Card } from '../types';
import ConfirmModal from '../components/ConfirmModal';


interface SettingsPageProps {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  pin: string;
  setPin: React.Dispatch<React.SetStateAction<string>>;
  currentVoice: string;
  setVoice: React.Dispatch<React.SetStateAction<string>>;
  goToHome: () => void;
}

function SettingsPage({ cards, setCards, setPin, currentVoice, setVoice, goToHome }: SettingsPageProps) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [newCard, setNewCard] = useState({ icon: '', text: '' });
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinMessage, setPinMessage] = useState({ text: '', type: '' });
  const [cardToDelete, setCardToDelete] = useState<Card | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCard.icon && newCard.text) {
      setCards([...cards, { ...newCard, id: Date.now() }]);
      setNewCard({ icon: '', text: '' });
    }
  };

  const handleUpdateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCard) {
      setCards(cards.map(c => c.id === editingCard.id ? editingCard : c));
      setEditingCard(null);
    }
  };

  const handleDeleteCard = (card: Card) => {
    setCardToDelete(card);
  };

  const confirmDelete = () => {
    if (cardToDelete) {
      setCards(cards.filter(c => c.id !== cardToDelete.id));
      setCardToDelete(null);
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length !== 4) {
      setPinMessage({ text: 'PIN must be 4 digits.', type: 'error' });
      return;
    }
    if (newPin !== confirmPin) {
      setPinMessage({ text: 'PINs do not match.', type: 'error' });
      return;
    }
    setPin(newPin);
    setNewPin('');
    setConfirmPin('');
    setPinMessage({ text: 'PIN updated successfully!', type: 'success' });
    setTimeout(() => setPinMessage({ text: '', type: '' }), 3000);
  };

  const renderPinMessage = () => {
    if (!pinMessage.text) return null;
    const isSuccess = pinMessage.type === 'success';
    return (
      <div className={`flex items-center p-2 rounded-md text-sm ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {isSuccess ? <Check size={16} className="mr-2" /> : <X size={16} className="mr-2" />}
        {pinMessage.text}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <header className="flex items-center mb-6">
        <button onClick={goToHome} className="mr-4 p-2 rounded-full hover:bg-gray-200">
          <ArrowLeft />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
      </header>

      <div className="space-y-8">
        {/* Add/Edit Card Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{editingCard ? 'Edit Card' : 'Add New Card'}</h2>
          <form onSubmit={editingCard ? handleUpdateCard : handleAddCard} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Icon (e.g., 😊)"
                value={editingCard ? editingCard.icon : newCard.icon}
                onChange={(e) => editingCard ? setEditingCard({ ...editingCard, icon: e.target.value }) : setNewCard({ ...newCard, icon: e.target.value })}
                className="w-24 p-2 border rounded-md text-center text-2xl"
                maxLength={2}
              />
              <input
                type="text"
                placeholder="Text to speak"
                value={editingCard ? editingCard.text : newCard.text}
                onChange={(e) => editingCard ? setEditingCard({ ...editingCard, text: e.target.value }) : setNewCard({ ...newCard, text: e.target.value })}
                className="flex-grow p-2 border rounded-md"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              {editingCard && (
                <button type="button" onClick={() => setEditingCard(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
              )}
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                {editingCard ? <Save size={18} className="mr-2" /> : <Plus size={18} className="mr-2" />}
                {editingCard ? 'Save Changes' : 'Add Card'}
              </button>
            </div>
          </form>
        </div>

        {/* Manage Cards List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Manage Cards</h2>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {cards.map(card => (
              <li key={card.id} className="flex items-center justify-between p-2 border rounded-md">
                <span className="text-2xl mr-4">{card.icon}</span>
                <span className="flex-grow text-gray-700">{card.text}</span>
                <div className="space-x-2">
                  <button onClick={() => setEditingCard(card)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"><Edit size={18} /></button>
                  <button onClick={() => handleDeleteCard(card)} className="p-2 text-red-600 hover:bg-red-100 rounded-full"><Trash2 size={18} /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Voice Selection */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Change Voice</h2>
          <select
            value={currentVoice}
            onChange={(e) => setVoice(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Default Voice</option>
            {voices.map(v => (
              <option key={v.name} value={v.name}>{`${v.name} (${v.lang})`}</option>
            ))}
          </select>
        </div>

        {/* Change PIN */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Change PIN</h2>
          <form onSubmit={handleChangePin} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="password" placeholder="New 4-digit PIN" value={newPin} onChange={e => setNewPin(e.target.value)} maxLength={4} className="p-2 border rounded-md" />
              <input type="password" placeholder="Confirm New PIN" value={confirmPin} onChange={e => setConfirmPin(e.target.value)} maxLength={4} className="p-2 border rounded-md" />
            </div>
            <div className="flex justify-between items-center">
              {renderPinMessage()}
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Update PIN</button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!cardToDelete}
        onClose={() => setCardToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Card?"
      >
        Are you sure you want to delete this card? This action cannot be undone.
      </ConfirmModal>
    </div>
  );
}

export default SettingsPage;