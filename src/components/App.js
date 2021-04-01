import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import Pokemon from "./pokemons/Pokemon";
import pokeball from "../assets/pokeball.gif";

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [error, setError] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(`https://pokeapi.co/api/v2/pokemon/`);
    const [nextUrl, setNextUrl] = useState(null);
    const [previousUrl, setPreviousUrl] = useState(null);
    const [loading, setLoading] = useState(true);

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
        setTimeout(() => setLoading(false), 2000)
    }, [])

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const {data} = await axios.get(currentUrl);
                // console.log("Wat is dit?", data);
                setNextUrl(data.next);
                setPreviousUrl(data.previous);
                setPokemons(data.results);

            } catch(error) {
                // console.log("ERROR", error)
                setError(true)
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
                > Previous
            </button>

            <button
                className="btn-homepage"
                type="button"
                onClick={showNextPage}
                disabled={nextUrl === null}
                >Next
            </button>
        </div>

        <div>

            {error && <h2>Something went wrong. Please try Again!</h2>}

            {loading === false ? (

                <ul className="main-card">
                    {pokemons && pokemons.map((pokemon) => {
                        // console.log("1 Pok", pokemon);
                        return <Pokemon key={pokemon.name} name={pokemon.name}
                                        link={pokemon.url}/>
                        }
                    )};
                </ul>

            ) : (<div className="main-loader"><h2>Catching Pokemons.... Please wait!</h2>
                <img className="spinner" src={pokeball} alt="loading"/></div>)}
        </div>
    </>
  );
};

export default App;
