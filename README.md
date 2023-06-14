# About this project

The goal of this project was to create a front-end app that implements the Firebase authentication service, while consuming data from a 3rd party API. The API used was The Cat API (https://thecatapi.com/).

To implement CRUD functionality, a Firebase Real Time Database was implemented.

The project was created with Next.js and bootstrapped with create-next app.

## Decisions Log

Since the data from both the API and the DB needed to be displayed, it was necessary to normalize the data structure from both sources. The data from the API has a data structure consisting of an array of breed objects. Since Firebase does not have the capability to implement this data structure, it was modeled as an array of arrays, and manipulated on the frontend to match the data structure of the API. When the homepage loads, a request is sent to both the API and the database, and consolidated so data from both sources can be displayed.

To implement the create functionality, a newBreed component was created and wired to the realtime database.

The user has the option to favorite a determinate cat breed; these selections persist on the database and are linked to the unique user ID.

The app also allows to filter cat breeds per temperament, and breed name.

## To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
