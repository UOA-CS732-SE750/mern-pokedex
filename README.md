# CS732 Pokedex React Demo

Demo on building a Pokedex with React. There are several branches in this repo, as follows:

## Client-side only steps

- **step-00-starting-point**: Blank React app
- **step-01-copy-static-code**: HTML & CSS code copied over, as a single static component in App.jsx
- **step-02-static-components**: App broken up into components, with hardcoded data
- **step-03-use-dummy-data**: Moving away from hardcoded data; now using the data in the supplied dummy-data.js
- **step-04-placeholder**: Handling the case where there is no "selected" Pokémon - what should we display by default?
- **step-05-interactivity**: Allowing the user to search for Pokémon by name, select Pokémon on the sidebar, and toggle normal / shiny images
- **step-06-api**: Displaying data from an API rather than dummy data
- **step-07-image-load**: BONUS - Displays a placeholder image when switching between different pokémon, while the new images load

The API used is `https://pkserve.ocean.anhydrous.dev/api/pokedex`, which is essentially a much simplified version of PokeAPI (in-fact, that's where it gets its data from).

- **GET /?gen={gen}**: Gets names and dex numbers of all pokémon in the given generation (1 thru 9, or "all").
- **GET /{dexNumber}**: Gets the full details of the pokémon with the given dex number, or a 404 error if no such mon exists.

## Steps including Node.js / Express backend and MongoDB database

- **step-08-monorepo-express**: Move the frontend code into "frontend" folder; add "backend" folder with Node.js / Express skeleton; use npm workspaces to setup a monorepo structure.
- **step-09-routes**: Add skeleton routes for the Pokédex API using Express Router
- **step-10-schema**: Add MongoDB schema using mongoose library
- **step-11-pokedex-api**: Completed Pokédex API, including handling of invalid inputs
- **step-12-tanstack-query**: Modifying our frontend to use [Tanstack Query](https://tanstack.com/query/latest)'s `useQuery()` hook to communicate with our backend
- **step-13-favourites-frontend**: Adding the frontend code for a new feature - adding and removing "favourite" Pokémon
- **step-14-favourites-backend**: Adding a new API route for handling "add / remove favourites"
- **step-15-favourutes-mutation**: Using the `useMuatation()` hook provided by Tanstack Query to send "add / remove favourite" calls to our backend

**Remember:** The backend and frontend both now contain _environment varialbes_. `.env.example` files are provided in the repo, but you will need to create the actual `.env` files (by copy / pasting and modifying as needed) or provide the environment variables to your running programs in some other way.

The **main** branch is setup as being equal to the final step.