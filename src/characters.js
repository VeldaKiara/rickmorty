import { useQuery, gql } from '@apollo/client';
import { useState } from "react";
import  { RandomCharacter } from './randomcharacters';
import './App.css';


export const GET_CHARACTERS = gql`
query Characters($name: String){
    characters ( filter: {name: $name}){
      results {
        name
        species
        status
        type
        gender
        origin{name}
        location {name}
        image
      },
    },
  }
`;

export function CharacterList() {
  const [searchTerm, setSearchTerm] = useState("");
  const {loading, error, data }   = useQuery(GET_CHARACTERS, {variables: {name: searchTerm}});
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
 
  return (
    <div>
      <input type="text" name="search" placeholder="search for Rick and Morty characters..." value={searchTerm} onChange={handleChange} className="search-input"  /> 
      {/* {loading && <p>loading...</p>} */}
      {loading && (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
       )}
      {error && <p> error </p> }
      {data?.characters.results.length === 0 && (<>   <RandomCharacter/> </>)}
      
      {data && data.characters.results.map((character) => (
        
        <div className="card" key={character.name} style={{ backgroundImage: `url(${character.image})`,backgroundRepeat: 'no-repeat'}}> 
          <div className="info"> 
          <h2 className="h3"> {character.name}</h2>
          <p> Status: {character.status}</p>
          <p> Species: {character.species} </p>
          <p>Type: {character.type}</p>
          <p> Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
        </div>
        </div>
        
      ))}
    </div>
     

  );
}
