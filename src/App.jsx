import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DietaryProvider } from './context/DietaryContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Scanner from './pages/Scanner';
import Result from './pages/Result';
import History from './pages/History';
import About from './pages/About';
import ClickSpark from './components/reactbits/ClickSpark';

export default function App() {
  return (
    <BrowserRouter>
      <DietaryProvider>
        <ClickSpark
          sparkColor="#2E7D32"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={8}
          duration={450}
        >
          <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#362211]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/scanner" element={<Scanner />} />
                <Route path="/result" element={<Result />} />
                <Route path="/history" element={<History />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ClickSpark>
      </DietaryProvider>
    </BrowserRouter>
  );
}
