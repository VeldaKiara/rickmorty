import { useQuery, gql } from '@apollo/client';
import { useState } from "react";
import  { RandomCharacter } from './randomcharacters';


export const GET_CHARACTERS = gql`
query Characters($name: String) {
    characters(filter: { name: $name })  {
      results {
        name
        species
        status
        type
        gender
        origin{ name }
        location {name}
        image
        
      },
    },
  }
`;
// export function ErrorFallback() {
//   return (
//     <div>
//       <RandomCharacter />
//       <p>Character not found.</p>
//     </div>
//   );
// }
// export function CharacterList() {
//     // state for search
//   const [search, setSearch] = useState("");
//   const [error, setError] = useState(null);
//   const { loading,error, data } = useQuery(GET_CHARACTERS, {
//     variables: { name: search },
//   });
//   //handle search
//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//   };
//  //handle error
// const handleError = () => {
//   setError(true);
// };

//   if (loading) return <p>Loading...</p>;
//   //error 404 
//   if (error && error.networkError.statusCode === 404) 
//   return(
//     <div>
//       <p>No character found!</p>
//       <RandomCharacter />
//    </div>
//   );
//   if (error) return <p> Error :(</p>;


export function CharacterList() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.characters.results.map((character) => (
        <div key={character.name}>
          <h2>{character.name}</h2>
          <p>Species: {character.species}</p>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Type: {character.type}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
          <p>Image: {character.image}</p>
        </div>
      ))}
    </div>
  );
}
