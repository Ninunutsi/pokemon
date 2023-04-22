import './App.css';
import { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pages from './Pages';
// biblioteka AXIOS aris uketesi API s wamosagebad vidre fetch
import axios from 'axios'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageURL, setCurrentPageURL] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageURL, setNextPageURL] = useState()
  const [prevPageURL, setPrevPageURL] = useState()
  const [loading, setLoading] = useState(true)

  // use effectis es funqcia darenderdeba mashin rodesac raimes rac chven gvinda shevcvlit
  useEffect(() => {
    setLoading(true)
    let cancel 
    //es mtliani aris efeqti rac gvinda rom moxdes roca aplikacia darenderdeba
    // amito gvchirdeba use effect hook
    axios.get(currentPageURL, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
    // es pirveli sami ssityva wamoigebs mititebuli api dan mtel informacias
    // chven gvinda saxelebi amito gvchirdeba map
    setLoading(false)
    setNextPageURL(res.data.next)
    setPrevPageURL(res.data.previous)
    setPokemon(res.data.results.map(p => p.name))
  })

  // cansel previous request when we make new request 
  // es rom vqnat axiosis bibliotekas aqvs chashenebuli tviton dacenselba
  // cancel token igebs funqcias
  return () => cancel()
  }, [currentPageURL]) // mxolod mashin darenderdeba roca es cvladi sheicvleba

  if(loading) return '...loading'

  function gotoNextPage(){
    setCurrentPageURL(nextPageURL)
  }

  function gotoPrevPage(){
    setCurrentPageURL(prevPageURL)
  }

  return (
    <>
    <PokemonList pokemon={pokemon}/>
    <Pages 
    gotoNextPage={nextPageURL ? gotoNextPage : null}
    gotoPrevPage={prevPageURL ? gotoPrevPage : null}
    />
    </>
  );
}

export default App;
