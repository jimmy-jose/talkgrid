import React, { useState } from 'react';
import { Lock, ArrowLeft } from 'lucide-react';

interface PinPageProps {
  correctPin: string;
  onSuccess: () => void;
  onBack: () => void;
}

function PinPage({ correctPin, onSuccess, onBack }: PinPageProps) {
  const [inputPin, setInputPin] = useState('');
  const [error, setError] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setInputPin(value);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPin === correctPin) {
      onSuccess();
    } else {
      setError('Incorrect PIN. Please try again.');
      setInputPin('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-sm">
        <button onClick={onBack} className="absolute top-4 left-4 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={28} />
        </button>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <Lock size={48} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Enter PIN</h1>
          <p className="text-gray-600 mb-6">Enter the 4-digit PIN to access settings.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={inputPin}
              onChange={handleInput}
              maxLength={4}
              className="w-full text-center text-3xl tracking-[1em] p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PinPage;