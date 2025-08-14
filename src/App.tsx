
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Route } from 'react-router-dom';


export const App = () => {
  return (
    <div>
      <Navbar />
      
      <Route path='/'>
        <HomePage />
      </Route>

      <Route path='/search'>
        <SearchBooksPage />
      </Route>
      

      <Footer />
    </div>
  );
}

export default App;
