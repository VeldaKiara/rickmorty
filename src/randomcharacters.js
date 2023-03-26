import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "./characters";


export const RandomCharacter = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const randomIndex = Math.floor(Math.random() * data.characters.results.length);
  const randomCharacter = data.characters.results[randomIndex];

  return (
    <div>
      <p>But how about this character instead?</p>
      <img src={randomCharacter.image} alt={randomCharacter.name} />
      <p>{randomCharacter.name}</p>
    </div>
  );
};


