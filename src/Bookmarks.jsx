import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  const handleRemoveBookmark = (wordToRemove) => {
    const updatedBookmarks = bookmarks.filter(word => word !== wordToRemove);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="app-container">
    <Container className="mt-5">
      <h1 className="text-center mb-4">Bookmarked Words</h1>
      <div className="text-center mb-4">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/5801/5801789.png" 
          alt="Bookmark Icon" 
          width="100" 
          height="100"
        />
      </div>

      <Row>
        {bookmarks.length > 0 ? (
          bookmarks.map((word, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="text-center">
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title>{word}</Card.Title>
                  <Button className="d-flex gap-2" size="sm"
                    variant="danger" 
                    onClick={() => handleRemoveBookmark(word)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No words bookmarked yet.</p>
        )}
      </Row>

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-secondary">Go back to Dictionary</Link>
      </div>
    </Container> </div>
  );
};

export default Bookmarks;
