import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import Pokemon from "./pokemons/Pokemon";

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [currentUrl, setCurrentUrl] = useState(`https://pokeapi.co/api/v2/pokemon/`);
    const [nextUrl, setNextUrl] = useState(null);
    const [previousUrl, setPreviousUrl] = useState(null);

    // console.log("NextURL?", nextUrl);
    // console.log("CurrentURL", currentUrl);
    // console.log("PreviousURL", previousUrl);

    const showNextPage = () => {
        setCurrentUrl(nextUrl)
    }

    const showPreviousPage = () => {
        setCurrentUrl(previousUrl)
    }

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const {data} = await axios.get(currentUrl);
                // console.log("Wat is dit?", data);
                setNextUrl(data.next);
                setPreviousUrl(data.previous);
                setPokemons(data.results);

            } catch (error) {
                console.error(error);
            }
        }
        fetchPokemon();

    }, [currentUrl])

    // console.log("LIJN 23", pokemons);
  return (
    <>
    <div className="buttons">
        <button
            className="btn-homepage"
            type="button"
            onClick={showPreviousPage}
            disabled={previousUrl === null}
        > Vorige
        </button>

        <button
            className="btn-homepage"
            type="button"
            onClick={showNextPage}
            disabled={nextUrl === null}
        >Volgende
        </button>
    </div>

    <ul className="main-container">

        {pokemons && pokemons.map((pokemon) => {
                // console.log("1 Pok", pokemon);
            return <Pokemon key={pokemon.name} name={pokemon.name}
                            link={pokemon.url}/>
            }
        )};
    </ul>
    </>
  );
}

export default App;
