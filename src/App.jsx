import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dictionary from './Dictionary';
import Bookmarks from './Bookmarks';
import Quiz from './Quiz';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Dictionary</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/bookmarks">Bookmarks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/quiz">Quiz</Link>
              </li>
            </ul>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Dictionary />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
