# How to Write a GraphQL Query
## A beginner’s guide to writing your first GraphQL query

I enjoy fictional books about greek gods, demigods, the oracle, and prophecies. I am a huge fan of Rick Riordan's books. I recently came across Apollo's Trials, based on the greek god Apollo. When I hear any mention of Apollo, my mind goes to the greek god who was the god of practically everything – including but not limited to music, poetry, art, prophecy, truth, archery, plague, healing, sun, and light. 

Apollo client, just like the god Apollo, can do many things. For example, it lets you fetch and manage data from a GraphQl API on your client-side application. It is also simple, flexible, and compatible with any data source.

In this article, we will use the Apollo client to fetch data from the Rick and  Morty API, named after the animated TV show with the same name. We will write a GraphQL query to specify the data we need. The data will then be displayed using React. 

### Use Case of GraphQL

- GraphQL is used to build applications that require real-time data synchronization, like chat applications. GraphQL allows developers to fetch data that is needed reducing data transfer over the network hence improving application performance.

- Microservices handles specific functionality or feature of the application, which poses a challenge to developers to work with multiple APIs individually. GraphQL allows the developers to create a single API that acts as a gateway to numerous microservices. GraphQL improves performance since one query retrieves multiple microservices in a single request. 

- GraphQL provides a self-documenting schema, making it easy for developers to understand the data model and relationships between data. It also eases the process of creating, testing, and maintaining API, reducing time and cost.

- GraphQL provides versioning capabilities to allow the evolution of the API schema without breaking existing clients. Versioning is possible since clients specify the exact data they need, making it easy to add new fields and remove depreciated ones without affecting existing clients.
### Differences Between GraphQL and REST API's

- In GraphQL, the client sends a query with the data it needs, and the server responds with that data alone, while in REST APIs, the client sends on a request to an endpoint, and the server responds with all the data/response related to the endpoint.

- REST APIs are resource-based, where the endpoints represent data that can be accessed, created, updated, or deleted. On the other hand, GraphQL is graph-based, where each node represents a relationship between objects.

- REST APIs return data in a JSON(JavaScript Object Notation) or XML(Extensible Markup Language) format. At the same time, GraphQL allows the client to specify the data they need and responds with a JSON object matching the query.

- GraphQL provides versioning to allow the evolution of the API without disrupting the existing clients, while REST APIs are done by creating new endpoints for each version.

- In some cases, REST APIs can suffer from over-fetching or under-fetching, where the server may send much or little data. GraphQL accounts for this by allowing clients to request the data they need, thus reducing the amount of data transferred over a network.

### Project Setup

#### Prerequisistes

- Fundamentals on React
- Have knowledge on how API's work
- Have prior knowledge on CSS