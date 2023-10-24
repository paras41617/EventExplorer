import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search from './Search'
import Favourite from './Favourite'
import NavigationBar from './NavigationBar'
import '../styles/App.css';

export default function App() {
  return (
    <div className='background-image' >
      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path='/search' element={<Search />} />
          <Route exact path='/favourite' element={<Favourite />} />
        </Routes>
      </Router>
    </div>
  )
}