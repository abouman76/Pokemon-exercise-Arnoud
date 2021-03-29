import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";

function App() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
                console.log("What is dit?", data);
                setPokemons(data.results);

            } catch (error) {
                console.error(error);
            }
        }
        fetchPokemon();

    }, [])

  return (
    <ul className="main-container">
        {pokemons.map((pokemon) => {
                return <li key={pokemon.name}>{pokemon.name}</li>
        }
                )};

    </ul>
  );
}

export default App;
