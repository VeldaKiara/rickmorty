# How to Write a GraphQL Query
## A beginner’s guide to writing your first GraphQL query

I enjoy fictional books about greek gods, demigods, the oracle, and prophecies. I am a huge fan of Rick Riordan's books. I recently came across Apollo's Trials, based on the greek god Apollo. When I hear any mention of Apollo, my mind goes to the greek god who was the god of practically everything – including but not limited to music, poetry, art, prophecy, truth, archery, plague, healing, sun, and light. 

Apollo client, just like the god Apollo, can do many things. For example, it lets you fetch and manage data from a GraphQl API on your client-side application. It is also simple, flexible, and compatible with any data source.

In this article, we will use the Apollo client to fetch data from the Rick and  Morty API, named after the animated TV show with the same name. We will write a GraphQL query to specify the data we need. The data will then be displayed using React. 

### Use Case of GraphQL

- GraphQL is used to build applications that require real-time data synchronization, like chat applications. GraphQL allows developers to fetch data that is needed reducing data transfer over the network hence improving application performance.

- Microservices handles specific functionality or feature of the application, which poses a challenge to developers to work with multiple APIs individually. GraphQL allows the developers to create a single API that acts as a gateway to numerous microservices. GraphQL improves performance since one query retrieves various microservices in a single request. 

- GraphQL provides a self-documenting schema, making it easy for developers to understand the data model and relationships between data. It also eases the process of creating, testing, and maintaining API, reducing time and cost.

- GraphQL provides versioning capabilities to allow the evolution of the API schema without breaking existing clients. Versioning is possible since clients specify the exact data they need, making it easy to add new fields and remove depreciated ones without affecting existing clients.
### Differences Between GraphQL and REST APIs

- In GraphQL, the client sends a query with the data it needs, and the server responds with that data alone, while in REST APIs, the client sends on a request to an endpoint, and the server responds with all the data/response related to the endpoint.

- REST APIs are resource-based, where the endpoints represent data that can be accessed, created, updated, or deleted. On the other hand, GraphQL is graph-based, where each node represents a relationship between objects.

- REST APIs return data in a JSON(JavaScript Object Notation) or XML(Extensible Markup Language) format. At the same time, GraphQL allows the client to specify the data they need and responds with a JSON object matching the query.

- GraphQL provides versioning to enable the APIs evolution without disrupting the existing clients, while REST APIs are done by creating new endpoints for each version.

- In some cases, REST APIs can suffer from over-fetching or under-fetching, where the server may send much or little data. GraphQL accounts for this by allowing clients to request the data they need, thus reducing the amount of data transferred over a network.

### Project Setup
### Prerequisites

- Fundamentals on React
- Know about how APIs work and CSS(Cascading Style Sheets)
### Installation Dependencies

Create a new React App (rickandmorty)
```js
 npm init react-app rickandmorty 
 ```
 or
 ```js
 npx create-react-app rickandmorty 
 ```
Install Apollo Client and GraphQL. The code below installs two dependencies:
1. @apollo/client contains everything you need, like an in-memory cache, local state management, error handling, and a React-based view layer.
2. GraphQL provides logic for parsing the queries.
```js
npm install @apollo/client graphql
```
### Rick & Morty API and Apollo Client Setup 
Once the project is setup, we need to start using it in our files. `cd` to your `index.js` file then add this code:
```js 
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
  <App />
</ApolloProvider>,
);
```
The code above creates an instance of the Apollo client with the URL(Uniform Resource Locators) of the Rick and Morty API GraphQL endpoint. The App component is wrapped with the Apollo provider component to pass the client to all child components.

### Query Implementation
Create a file called `characters.js` inside the `src` folder. The file will contain the query and any other functions that you want to add.
Inside the file, add the following code:
```js
import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
query Characters{
    characters{
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
```
In the code above, we import `gql` from the `@apollo/client` to define our query. We create and export the variable `GET_CHARACTERS` as a string with capitalized letters. Capitalization is a best practice when defining queries in GraphQl, including wrapping them with a template literal.

Objects in Javascript are collections or containers filled with key-value pairs. A key-value pair is referred to as a property.
The query, in our case, searches for the characters in Rick and Morty. The query returns an object with the resultsproperty, an array of character objects. Each character has properties like name, species, status, type, gender, and image. The other properties, origin and location, are objects with a name property for each character’s origin and location.
#### Character Function Definition

In the `character.js` file add the following code below the `GET_CHARACTERS` query after modifying it as shown below.

```js
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
          <p> Type: {character.type}</p>
          <p> Gender: {character.gender}</p>
          <p> Origin: {character.origin.name}</p>
          <p> Location: {character.location.name}</p>
        </div>
        </div> 
      ))}
    </div> 
  );
}
```
The `export function CharacterList()` creates a function that is also exported to be used by other parts of the code. The `searchTerm` variable initializes state  to an empty string and create a function `setSearchTerm` to update the value. The `useQuery` hook from `@apollo/client`library fetches data from the API. The query passes the `GET_CHARACTERS ` and a variable for the name `searchTerm` which is a variable to hold the character names being searched. The `handleChange `  sets the searchTerm variable's value to the input field's current value. The `input` field is the search bar where the user will use to search the names of the characters they want to view. The state is handled by `handleChange`.

We need to account for issues of loading the site and in case of any bugs that may occur. The code with `loading` handles the spinner for the loading part if loading is True. An error message is displayed if the error is not null. Since we are looking for characters when the user searches for a character who is non-existent, we want to present a message and an alternate character they can find more information about; this is where the RandomCharacter comes in. We will define this later on. For now, let us keep it as is.

We then map the `data.characters.results` array to each character's card. We also want to change the background of the cards to represent the character the information is for. The `backgroundImage` in the`style` property handles the dynamic change of the images. The rest of the items are displayed as text on the card.
### Displaying Data
Now that we have a function working, we need to view what is being seen on the browser and whether we can make queries and get the data we need. In your `App.js` file, add the following code:
```
function App() {
  return (
    <div>
    <h1 style={{ textAlign: 'center' }} >Rick and Morty Characters</h1>
    <CharacterList />
  </div>
      );
    }
```
`<CharacterList />` component displays the information about the characters we are getting from the API. 
### Randomizing The Characters

Remember that we called the `RandomCharacter`component but had yet to define it. Create a file called `randomcharacters.js` in `src` and add the following code:

```
import { useQuery } from "@apollo/client";
import { gql } from '@apollo/client';
import { useState } from "react";
import './App.css';

export const GET_SINGLE_CHARACTER = gql`
query Character($id: ID!){
    character   (id: $id) {
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
`;

export const RandomCharacter = () => {
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100));
    const { loading, error, data } = useQuery(GET_SINGLE_CHARACTER, {variables: {id: randomNumber } });
    

  return (
    <div>
       <p className="intro" >
         Sorry, we couldn't find that character 😞  
         <br/>
         <br/>
         How about this one instead? 😉 </p>

      {/* {loading && <p>loading...</p>} */}
      {loading && (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
       )}
      {error && <p> error </p> }
      {data && (<> 
        <div className="card" key={data.character.name} style={{ backgroundImage: `url(${data.character.image})`,backgroundRepeat: 'no-repeat'}}> 
        <div className="info"> 
          <h2 className="h3">{data.character.name}</h2>
          <p>Status: {data.character.status}</p>
          <p>Species: {data.character.species}</p>
          <p>Type: {data.character.type}</p>
          <p>Gender: {data.character.gender}</p>
          <p>Origin: {data.character.origin.name}</p>
          <p>Location: {data.character.location.name}</p>
        </div>
        </div>
      </>
      )}
    </div>
  );
};
```

We will replicate the query we created in the `characters.js` file, rename it to `GET_SINGLE_CHARACTER` and instead of looking for names, we will look for IDs. We look for IDs because they are unique, and we want to randomize the characters that will be picked once a user does not get the character they are looking for. 
`randomNumber` initializes state to the `Math.floor` function which generates a random number between 0 and 99 inclusive, using the `Math.random()` method, multiplying it by 100. The `Math.floor`rounds the result of the expression to the nearest integer. Everytime the `randomNumber` needs to be updated the  `setRandomNumber` function takes a new value as its argument and updates the state.

We have a message to alert the user that the character they are looking for is not found, but they can check out a new character. The loading spinner is also implemented in this component, and the errors are in case of any issues. The images and cards are similar to the `characters.js` format since we want consistency in how everything looks.

### Styling the Display
We will use CSS to style how the cards will look, the search bar and the general page.
Having defined the functions and components we will be adding `className` attributes to what needs to be styled. 
Add the following code:
```js
@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700);
body{
  background: navajowhite;
  font-family: Roboto, veranda;
  padding-bottom: 4em;
}
.card{
  position: relative;
  width: 22em;
  height: 30em;
  background-size: 22em 30em;
  box-shadow: 3px 3px 20px rgba(0,0,0,0.5);
  margin: auto;
  overflow: hidden;
  margin-bottom: 2em;
}
.card *{
  position: relative;
  z-index: 2;
}
.card:hover .info{
  bottom: -3em;
  opacity: 1;
  padding: 2px 1px;
  background-color: navajowhite;
}
.info{
  font-family: 'Droid Serif', serif;
  font-size: 1.2em;
  color: black;
 
  line-height: 1.1em;
  padding: 0 2em;
  position: relative;
  bottom: -4em;
  opacity: 0;
  background: transparent;
  transition: opacity 0.3s, bottom 0.3s;
  text-align: center;
}
/* search  bar*/
input[type="text"] {
  border: none;
  border-radius: 10px;
  background-color: #f2f2f2;
  padding: 10px;
  width: 500px;
  margin: 0 auto;
  display: block;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
  margin-bottom: 2em;
}

input[type="text"]::placeholder {
  color: #999;
  font-style: italic;
}
/* no result */
.intro{
/* width: 10px; */
text-align: center;
margin: 0 auto;
color:black;
font-family: 'Droid Serif', serif;
font-size: 23px;
font-style: italic;
line-height: 20px;
padding-bottom: 15px;
}
/* spinner */
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.loader {
  border: 8px solid #f3f3f3; 
  border-top: 8px solid black;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

```
Things to note:
-  The class `.card` represents what the card will look like. 
- The class `.info` is the body text for the characters, such as the species
- The class `.intro` is the text that appears in the event if the character is not found
- The class `.loader` is the spinner showing before the resluts are shown in the event of a loadtime.

Your website should now look like [this](https://github.com/VeldaKiara/rickmorty/blob/main/src/final-images/outlook1.png)

Check out this video demo of how everything should work [here](https://github.com/VeldaKiara/rickmorty/blob/main/src/final-images/overviewafterstyling.mov)

Through this article, you have learned how to use GraphQL queries with React, manage state using the useState hook, and style the different components of the web application. 

May your keyboard be swift, your bugs be few, and your fun meter be off the charts as you code away!