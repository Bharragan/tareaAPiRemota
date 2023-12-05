import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function cleanText(textWithTags) {
  let cleanedText = textWithTags.replace(/\[x\]/g, '');
  cleanedText = cleanedText.replace(/\n/g, ' ');
  const div = document.createElement('div');
  div.innerHTML = cleanedText;
  return div.textContent || div.innerText || '';
}

function Card({ card }) {
  const defaultImage = 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/49eb630950e50aa851fc9d544089d83dea7640324d7728251638b0b5f1642b8e.png';

  return (
    <div className="card mb-3" style={{ maxWidth: '300px' }}>
      <img
        src={card.img || defaultImage}
        alt={card.name}
        className="card-img-top"
        style={{ borderRadius: '4px', maxHeight: '200px', objectFit: 'contain' }}
      />
      <div className="card-body" style={{ height: '150px', overflowY: 'auto' }}>
        <h5 className="card-title">{card.name}</h5>
        <p className="card-text"><strong>Type:</strong> {card.type}</p>
        <p className="card-text"><strong>Set:</strong> {card.cardSet}</p>
        <p className="card-text"><strong>Cost:</strong> {card.cost}</p>
        {card.text && <p className="card-text"><strong>Text:</strong> {cleanText(card.text)}</p>}
      </div>
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [cards, setCards] = React.useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/${searchTerm}`, {
        headers: {
          'X-RapidAPI-Key': '132c70d7d8msh7da217a35c2c3cap1aa31bjsn2bad06c283e5',
          'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
      });

      const filteredCards = response.data.filter(card => card.type === "Minion" || card.type === "Spell");
      setCards(filteredCards);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Hearthstone Card Search</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
          placeholder="Search for cards..."
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {cards.map((card) => (
          <div key={card.cardId} className="col">
            <Card card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
