import logo from './logo.png';
import './App.css';
import Api from './lib/Http/Api';
import {useState} from 'react';


function App() {
    const [listings, setListings] = useState([]);
    const loadListings = async () => {
        const response = await Api.get('/listing');
        setListings(response.data);
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Welcome to BnB Explorer
                </p>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <button onClick={loadListings}>GET /listings</button>
                <div>
                    {
                        listings.map((listing) =>
                          <p>{listing}</p>
                        )
                    }
                </div>
            </header>
        </div>
    );
}

export default App;
