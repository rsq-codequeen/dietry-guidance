import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_RESULTS } from '../data/mockResults';
import { INITIAL_HISTORY } from '../data/mockHistory';

const DietaryContext = createContext(null);

export function DietaryProvider({ children }) {
  // 1. Dietary restrictions matching the screenshot default: Gluten-free + Low sugar
  const [selectedRestrictions, setSelectedRestrictions] = useState(['Gluten-free', 'Low sugar']);
  
  // 2. Strictness mode: 'medical' ("Allergy or medical") vs 'preference'
  const [strictness, setStrictness] = useState('medical');
  
  // 3. Custom rules / notes
  const [customRules, setCustomRules] = useState('');
  
  // 4. Scanned image (local object URL or mock sample)
  const [currentScanImage, setCurrentScanImage] = useState(null);
  
  // 5. Current active result key: 'unsafe', 'caution', 'safe', 'cant_tell'
  const [activeResultKey, setActiveResultKey] = useState('unsafe');

  // 6. Scan history
  const [history, setHistory] = useState(INITIAL_HISTORY);

  // Toggle dietary restriction
  const toggleRestriction = (name) => {
    setSelectedRestrictions((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name);
      } else {
        return [...prev, name];
      }
    });
  };

  // Helper string for active summary
  const getSummaryString = () => {
    const list = selectedRestrictions.length > 0 ? selectedRestrictions.join(', ') : 'None selected';
    const mode = strictness === 'medical' ? 'allergy or medical mode' : 'preference mode';
    return `Checking for: ${list} (${mode})`;
  };

  // Helper for current active result object
  const currentResult = MOCK_RESULTS[activeResultKey] || MOCK_RESULTS.unsafe;

  const addHistoryRecord = (record) => {
    setHistory((prev) => [record, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <DietaryContext.Provider
      value={{
        selectedRestrictions,
        setSelectedRestrictions,
        toggleRestriction,
        strictness,
        setStrictness,
        customRules,
        setCustomRules,
        currentScanImage,
        setCurrentScanImage,
        activeResultKey,
        setActiveResultKey,
        currentResult,
        getSummaryString,
        history,
        addHistoryRecord,
        clearHistory,
      }}
    >
      {children}
    </DietaryContext.Provider>
  );
}

export function useDietary() {
  const context = useContext(DietaryContext);
  if (!context) {
    throw new Error('useDietary must be used within a DietaryProvider');
  }
  return context;
}
