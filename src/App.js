import './App.css';
import Header from './components/HeaderComponents/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './views/Dashboard/dashboardPage';
import MoviesPage from './views/Movies/moviesPage';
import TvShowPage from './views/TvShows/tvShowPage';
import SearchPage from './views/Search/searchPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/Trending' element={<DashboardPage />} />
          <Route path='/Movies' element={<MoviesPage />} />
          <Route path='/Series' element={<TvShowPage />} />
          <Route path='/Search' element={<SearchPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
