// import React, { useState } from 'react';
// import { useLazyQuery } from '@apollo/client';
// import { GET_CHARACTERS } from './queries';
// import CharacterList from './CharacterList';
// import RandomCharacter from './RandomCharacter';

// const SearchForm = () => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const [getCharacters, { data, error }] = useLazyQuery(GET_CHARACTERS);

//   const handleSearch = async (event) => {
//     event.preventDefault();
//     getCharacters({ variables: { name: searchQuery } });
//   };

//   const handleError = () => {
//     const randomIndex = Math.floor(Math.random() * data.characters.results.length);
//     const randomCharacter = data.characters.results[randomIndex];
//     setCharacters([randomCharacter]);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Search for a character"
//           value={searchQuery}
//           onChange={(event) => setSearchQuery(event.target.value)}
//         />
//         <button type="submit">Search</button>
//       </form>
//       {error ? (
//         <div>
//           <RandomCharacter />
//           <p>Character not found.</p>
//         </div>
//       ) : (
//         <CharacterList characters={data?.characters?.results} />
//       )}
//     </div>
//   );
// };

// export default SearchForm;

