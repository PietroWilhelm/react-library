import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { ExploreTopBooks } from './layouts/HomePage/components/ExploreTopBooks';
import { Carousel } from './layouts/HomePage/components/Carousel';
import { Heros } from './layouts/HomePage/components/Heros';
import  {LibraryServices}  from './layouts/HomePage/components/LibraryServices';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';


function App() {
  return (
    <div>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
      <Heros />
      <SearchBooksPage />
      <LibraryServices />

    </div>
  );
}

export default App;
