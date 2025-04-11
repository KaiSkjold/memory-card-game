import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import { capitalizeFirstLetter } from '@/utils/general';

const GameBoard = () => {
    const URL = 'https://pokeapi.co/api/v2/';
    const [pokemonList, setPokemonList] = useState<{ name: string; sprite: string }[]>([]);
    const [clickedPokemonList, setClickedPokemonList] = useState<{ name:string }[] | null>(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    // Function to fetch the Pokemon list from the API
    async function fetchPokemonList() {
        try {
            const response = await axios.get(`${URL}pokemon?limit=33`)
            const result = response.data.results;

            const pokemonData = await Promise.all(result.map(async (pokemon: { name: string }) => {
                const pokemonDetails = await axios.get(`${URL}pokemon/${pokemon.name}`);
                return {
                    name: pokemon.name,
                    sprite: pokemonDetails.data.sprites.front_default
                };
            }));
            setPokemonList(pokemonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fetch the Pokemon list when the component mounts
    useEffect(() => {
       fetchPokemonList();   
    }, []);

    // Function to handle click event on a Pokemon
    function handleClick(pokemon: { name: string; sprite: string }) { 
        if (clickedPokemonList?.includes(pokemon)) {
            resetGame();
            return;
        } else {
            // Update the clickedPokemon list with the new Pokemon
            setClickedPokemonList((prevClickedPokemon) => {
            const updatedList = [...(prevClickedPokemon || []), pokemon];
            return updatedList;
        });
        }
        console.log(clickedPokemonList);
        handleScore();
     }

     // Function to reset the game
    function resetGame() {
        setClickedPokemonList(null);
        setScore(0);
        setHighScore((prevHighScore) => {
            return Math.max(prevHighScore, score);
        });
    }

    // Handle score calculation
     function handleScore() {
        setScore((prevScore) => prevScore + 1);
     }


    // Function to shuffle the Pokemon list
    function shufflePokemonList<T>(array: T[]): T[] {
        const shuffledPokemonList = [...array]; 
    for (let i = shuffledPokemonList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPokemonList[i], shuffledPokemonList[j]] = [shuffledPokemonList[j], shuffledPokemonList[i]];
    }
    return shuffledPokemonList;
    }

  return (
    <div>
        <h3>PokeBoard score: {score} High score: {highScore}</h3>
        <ul  className='flex flex-row flex-wrap gap-[24px] justify-center items-center'>
            {shufflePokemonList(pokemonList).map((pokemon, index) => (
                <li key={index}>
                    <picture className='flex justify-center items-center' onClick={() => handleClick(pokemon)}>
                        <img src={pokemon.sprite} alt={`picture of ${pokemon.name}`} className='h-50' />
                    </picture>
                    <p className='text-xl text-blue-400 text-center'>{capitalizeFirstLetter(pokemon.name)}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default GameBoard