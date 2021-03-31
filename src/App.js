import logo from './logo.png';
import './App.css';
import Api from './lib/Http/Api';
import { useState } from 'react';
import Log from './helper/Log.js';

function App() {
  const Logger = new Log('App.js');

  const [listings, setListings] = useState([]);

  const loadListings = async () => {
    const response = await Api.get('listings');
    Logger.log(response, 'res');
    setListings(response.data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to BnB Explorer</p>
        <button onClick={loadListings} style={{ fontSize: '28px' }}>
          GET /listings
        </button>
        <div>
          {listings.map((listing) => {
            return <p key={listing.id}>{JSON.stringify(listing)}</p>;
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
