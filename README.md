# React typescript + RxJs Boilerplate

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn coverage`

Launches the test runner and outputs the tests code coverage.

### `yarn build` or `yarn build.ci`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Tech Stack

Here's a curated list of packages that you should be at least familiar with before starting your project. However, the best way to see a complete list of the dependencies is to check package.json.

### Core

- [ ] [React](https://facebook.github.io/react/)
- [ ] [React Router](https://github.com/ReactTraining/react-router)
- [ ] [Redux](http://redux.js.org/)
- [ ] [RxJs](https://rxjs-dev.firebaseapp.com/)
- [ ] [React Redux](https://github.com/reduxjs/react-redux/)
- [ ] [Redux Act](https://github.com/pauldijou/redux-act)
- [ ] [Redux Observable](https://redux-observable.js.org/)
- [ ] [Redux Persist](https://github.com/rt2zz/redux-persist)
- [ ] [Typescript](https://www.typescriptlang.org/)

### Unit Testing

- [ ] [Jest](http://facebook.github.io/jest/)
- [ ] [Enzyme](https://airbnb.io/enzyme/)
- [ ] [Redux mock store](https://github.com/dmitry-zaets/redux-mock-store)

### Linting

- [ ] [ESLint](http://eslint.org/)
- [ ] [Prettier](https://prettier.io/)
- [ ] [Lint Staged](https://github.com/okonet/lint-staged)

## Project Structure

### `src/components/`

Folder that contains all the UI reusable components.

### `src/hooks/`

Folder that contains all custom hooks. Ex: useI18n.  
Create inside here all custom hooks and export them using the `index.tsx` file.

```ts
export * from './useCustomHook'
```

### `src/pages/`

Folder that contains all react components that represent website pages.  
Structure of a page component:

- Page/
  - ** snapshots **/
  - Page.scss
  - Page.test.tsx
  - index.tsx

`__snapshots__/` folder is auto generated by jest.  
Export the component from the `index.tsx` file

```ts
export default Page
```

### `src/router/`

Contains the component that maps the Pages to routes as well as the routes.  
To add a new page add it's path to the `routes.ts` file and then map the component to the file.

```tsx
<Switch>
  <Route path={paths.PAGE_PATH} component={Page} />
  ...
  <Route path={paths.ROOT} component={Home} />
</Switch>
```

### `src/state/`

#### `src/state/actions/`

This folder contains the actions RxJs and Redux listens to.

```ts
export const ACTION_NAME = createAction('ACTION_NAME')
```

#### `src/state/epics/`

This folder contains RxJs epics that fire when their corresponding action is fired
