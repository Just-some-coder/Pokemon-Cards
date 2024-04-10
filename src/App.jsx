import {useEffect, useState} from 'react'
import './App.css'

function Card({pokemonID}){

    const api = "https://pokeapi.co/api/v2/pokemon/";

    const [Api, setApi] = useState(api + 1);

    useEffect(()=>{
        setApi(api+pokemonID);
    },[pokemonID]);

    const [cardFlip, setCardFlip] = useState(false);

    const [pokeData, setPokeData] = useState({
        name: "",
        types: [{type: {name: ""}}],
        id:"",
        sprites: {
            front_default: "",
            other:{
                dream_world:{
                    front_default:""
                },
                "official-artwork":{
                    front_default:""
                }
            },
            back_default:"",
            back_shiny:"",
            front_shiny:""
        },
        height: "",
        weight: ""
    })

    const handleCardFlip = () =>{
        setCardFlip(!cardFlip);
    }


    useEffect(() => {
        fetch(Api)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setPokeData(data);
            })
    }, [Api])


    if(cardFlip){
        return (
            <div className={'pokemon-card-reverse'} onClick={()=>{handleCardFlip()}}>
            </div>
        );
    }else {
        return (
            <div className={`pokemon-card`} onClick={()=>{handleCardFlip()}}>
                <div className={"pokemon-id"}>#{pokeData.id<100?0:''}{pokeData.id<10?0:''}{pokeData.id}</div>

                <div className={"image-bg"}>
                    <img src={pokeData.sprites.other["official-artwork"].front_default} alt="Pokemon Image" className="pokemon-image"/>
                </div>

                <div className={"icon"}>
                    <img src={pokeData.sprites.front_default}/>
                    <img src={pokeData.sprites.back_default}/>
                    <img src={pokeData.sprites.front_shiny}/>
                    <img src={pokeData.sprites.back_shiny}/>
                </div>

                <div className="pokemon-info">

                    <h2 className="pokemon-name">{pokeData.name}</h2>

                    <div className={"body-info"}>
                        <p className="pokemon-height"><span className={"transparentText"}>Height</span><br/> {pokeData.height} m</p>
                        <p className="pokemon-weight"><span className={"transparentText"}>Weight</span><br/> {pokeData.weight} lbs</p>
                    </div>

                    <div className={'type-info'}>
                        <p className="pokemon-type"><span  className={"transparentText"}>Type</span> <br/> {pokeData.types[0].type.name}</p>
                    </div>
                </div>
            </div>
        );
    }
}

function App() {

    const [pokeID, setPokeID] = useState(1);

    const [pokemonID, setPokemonID] = useState(1);

    const handleChange = (event) => {
        setPokeID(event.target.value)
    }
    const handleApi = () => {
        setPokemonID((pokeID));
    }


    return (
        <>
            <label>PokeDex Number <input id="search-input" value={pokeID} onChange={handleChange}/>
            </label>
            <button id={"search-button"} onClick={handleApi}>Give</button>

            <div className={"cards"}>
                <Card pokemonID={pokemonID}/>
                <Card pokemonID={Number(pokemonID)+1}/>
                <Card pokemonID={Number(pokemonID)+2}/>
                <Card pokemonID={Number(pokemonID)+3}/>
            </div>
        </>
    );
}
export default App
