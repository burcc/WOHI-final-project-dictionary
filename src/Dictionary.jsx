import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getWordDefinition from './DictionaryAPI';
import 'bootstrap/dist/css/bootstrap.min.css';



const Dictionary = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [phonetics, setPhonetics] = useState([]); // New state for multiple phonetic texts
  const [origin, setOrigin] = useState(''); // New state for word origin
  const [bookmarks, setBookmarks] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  useEffect(() => {
    setDefinition(null);
    setAudioUrl(null);
    setError('');
    setPhonetics([]); // Reset phonetics when word changes
    setOrigin(''); // Reset origin when word changes
    setSearchClicked(false);
  }, [word]);

  const handleInputChange = (event) => {
    setWord(event.target.value);
  };

  const handleSearch = async () => {
    if (word.trim() === '') {
      setDefinition(null);
      setError('');
      return;
    }

    setSearchClicked(true);
    setError('');
    const data = await getWordDefinition(word);

    if (data && data[0]) {
      setDefinition(data[0].meanings);
      setOrigin(data[0].origin || ''); // Set origin if available
      setPhonetics(data[0].phonetics || []); // Set phonetic variations

      // Set audio URL if any phonetic entry has an audio link
      const pronunciationWithAudio = data[0].phonetics.find(ph => ph.audio);
      if (pronunciationWithAudio) {
        setAudioUrl(pronunciationWithAudio.audio);
      } else {
        setAudioUrl(null);
      }
    } else {
      setDefinition(null);
      setError('Word not found.');
      setAudioUrl(null);
      setPhonetics([]);
      setOrigin('');
    }
  };

  const handleAudioPlay = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      setError('No pronunciation available.');
    }
  };

  const handleBookmark = () => {
    if (word && !bookmarks.includes(word)) {
      const updatedBookmarks = [...bookmarks, word];
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } else {
      setError('Word is already bookmarked or empty.');
    }
  };

  return (
    <div className="app-container">
    <div className="dictionary-container container mt-5">
      <div ><h1 className="text-center">English Dictionary</h1> </div> 
      <div style={{
    marginTop: 20,
    marginBottom: 20
  }}className="text-center mt-4"> <img src={"https://cdn-icons-png.flaticon.com/512/5228/5228257.png"} alt="Logo" width="150" height="150"/>
      </div>
      
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          value={word}
          onChange={handleInputChange}
          placeholder="Enter a word"
        />
        <div><button className="btn btn-primary ml-2" onClick={handleSearch}>Search</button></div>
      </div>


      {error && <p className="text-danger text-center">{error}</p>}

      {searchClicked && word.trim() !== '' && definition && definition.length > 0 ? (
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Definitions for "{word}"</h2>

            {/* Display phonetic transcriptions if available */}
            {phonetics.length > 0 && (
              <div className="mt-3">
                <h5 className="text-muted">Phonetic:</h5>
                <ul className="list-unstyled">
                  {phonetics.map((phonetic, index) => (
                    <li key={index}>
                      <span>{phonetic.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Display word origin if available */}
            {origin && (
              <p className="mt-3 text-muted"><strong>Origin:</strong> {origin}</p>
            )}

            {/* Display meanings categorized by part of speech */}
            <div className="mt-4">
              {definition.map((meaning, idx) => (
                <div key={idx} className="mb-4">
                  <h5 className="text-primary">{meaning.partOfSpeech}</h5>
                  <ul className="list-unstyled">
                    {meaning.definitions.map((def, index) => (
                      <li key={index} className="mt-2">
                        <div className="card p-3">
                          <strong>{def.definition}</strong>
                          {def.example && <p className="mt-2"><em>Example: {def.example}</em></p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center mt-3"> 
            {audioUrl && (
              
              <button className="btn btn-info mt-3" onClick={handleAudioPlay}>Hear Pronunciation</button>
            )}
            
            <button className="btn btn-success mt-3" onClick={handleBookmark}>Bookmark Word</button> 
          </div> </div>
        </div>
      ) : null}

      {searchClicked && word.trim() !== '' && !definition && !error && (
        <p className="text-center text-muted mt-3"></p>
      )}

      <div className="mt-4 text-center">
        <Link to="/bookmarks" className="btn btn-secondary">Go to Bookmarks</Link>
      </div>
    </div>
    </div>
  );
};

export default Dictionary;