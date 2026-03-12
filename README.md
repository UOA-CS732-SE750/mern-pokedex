# CS732 Pokedex React Demo

Demo on building a Pokedex with React. There are several branches in this repo, as follows:

- **step-00-starting-point**: Blank React app
- **step-01-copy-static-code**: HTML & CSS code copied over, as a single static component in App.jsx
- **step-02-static-components**: App broken up into components, with hardcoded data
- **step-03-use-dummy-data**: Moving away from hardcoded data; now using the data in the supplied dummy-data.js
- **step-04-placeholder**: Handling the case where there is no "selected" Pokémon - what should we display by default?
- **step-05-interactivity**: Allowing the user to search for Pokémon by name, select Pokémon on the sidebar, and toggle normal / shiny images
- **step-06-api**: Displaying data from an API rather than dummy data
- **step-07-image-load**: BONUS - Displays a placeholder image when switching between different pokémon, while the new images load
- **main**: The same as the latest step (07).

The API used is `https://pkserve.ocean.anhydrous.dev/api/pokedex`, which is essentially a much simplified version of PokeAPI (in-fact, that's where it gets its data from).

- **GET /?gen={gen}**: Gets names and dex numbers of all pokémon in the given generation (1 thru 9, or "all").
- **GET /{dexNumber}**: Gets the full details of the pokémon with the given dex number, or a 404 error if no such mon exists.
