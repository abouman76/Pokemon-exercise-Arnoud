import React, {useEffect, useState} from "react";
import "./Pokemon.css";
import axios from "axios";

const Pokemon = (props) => {
    const [pokemon, setPokemon] = useState({});
    useEffect(() => {

        async function fetchOnePokemon(){
           // console.log("Ophalen", props.link);
            try {
                const response = await axios.get(props.link);
                // console.log("response", response.data)
                setPokemon(response.data)

            } catch(error){
                console.error(error);
            }
        }
        fetchOnePokemon();

    }, []);

    // console.log("Plaatje?", pokemon.sprites?.front_default);
    // console.log("PROPS", props);
    // console.log("MOVES", pokemon.moves?.length);

    return (
        <li className="styling-pokemonCard">
            <h3>{props.name.toUpperCase()}</h3>
            <h4>Moves: {pokemon.moves?.length}</h4>
            {/*<h4>Moves: {pokemon.moves && pokemon.moves.length} </h4>*/}
            <h4>Weight: {pokemon.weight}</h4>
            <img src={pokemon.sprites?.front_default} alt="pokemon"/>
            <h4>Abilities:</h4>
            {/*<p>{pokemon.abilities && pokemon.abilities[0].ability.name}</p>*/}
            {pokemon.abilities && pokemon.abilities.map((ability) => {
                    // console.log("move", ability);
                return <p>{ability.ability.name}</p>
            }
            )}
        </li>
    )
};

export default Pokemon;