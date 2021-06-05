# SkenarioLabs

Frontend assignment

[LIVE Demo](https://erkanskenariolabs.netlify.app)

## Description

Task from interview in SkenarioLabs

### Tech used

- Frontend
  - Typescript
  - React
  - Redux
  - react-map-gl
- Backend(API)
  - https://www.geoapify.com/geocoding-api
- Tests
  - Cypress
- Deployment
  - Netlify Free Tier

### Usage

- Installing and starting

```
Keys are public in this repo just so you can test the application.
In your own app you should use .env file with own keys.
key of geopfy here: https://www.geoapify.com/
key of map gl requires mapbox keys: https://www.mapbox.com/

git clone https://github.com/erkanisuf/skenariolabsNOTREADY.git
npm install - to install all needed packages
npm start  - to run the application
```

- Running tests

```
> npm run cypress:open - opens cypress UI
> npm run cypress:run - runs cypress test in terminal
```

## Commits

List of commits can be found in gitlogs.txt

## Issues

- react maps gl in my Chrome browser caused some console.log errors because it was in conflict with some Chrome extentions.Issue is fixed now , if you have same trouble , make sure update Chrome or remove some extentions that are not maintained.
- react mapbox is working fine in development but in production seems like it had some issues , map wasnot showing , after some searching the solution was found here:
https://github.com/mapbox/mapbox-gl-js/issues/10173 , required also some eslint ignores.

## Author

Erkan Isuf
