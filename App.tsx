import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Fleet } from './components/Fleet';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-100">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Fleet />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;