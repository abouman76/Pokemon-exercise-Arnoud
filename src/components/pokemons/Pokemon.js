import React, {useEffect, useState} from "react";
import "./Pokemon.css";
import axios from "axios";

const Pokemon = ({name, link}) => {

    const [pokemon, setPokemon] = useState({});
    useEffect(() => {

        async function fetchOnePokemon(){
            try {
                const response = await axios.get(link);
                // console.log("response", response.data)
                setPokemon(response.data)

            } catch(error){
                console.error(error);
            }
        }
        fetchOnePokemon();

    }, [link]);

    // console.log("Plaatje?", pokemon.sprites?.front_default);
    // console.log("MOVES", pokemon.moves?.length);

    return (
        <li className="styling-pokemonCard">
            <h3>{name.toUpperCase()}</h3>
            <h4>Moves: {pokemon.moves?.length}</h4>
            {/*<h4>Moves: {pokemon.moves && pokemon.moves.length} </h4>*/}
            <h4>Weight: {pokemon.weight}</h4>
            <img src={pokemon.sprites?.front_default} alt="pokemon"/>
            <h4>Abilities:</h4>
            {/*<p>{pokemon.abilities && pokemon.abilities[0].ability.name}</p>*/}
            {pokemon.abilities && pokemon.abilities.map((ability) => {
                    // console.log("move", ability);
                return <p key={ability.ability.name}>{ability.ability.name}</p>
            }
            )}
        </li>
    )
};

export default Pokemon;