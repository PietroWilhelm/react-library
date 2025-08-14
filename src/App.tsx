
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/NavbarAndFooter/Footer';


export const App = () => {
  return (
    <div>
      <Navbar />
      { /* <HomePage /> */ }
      <SearchBooksPage />
      <Footer />
    </div>
  );
}

export default App;
