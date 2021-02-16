## React Boilerplate

### Project Setup

1. Run **`yarn install`** (yarn is required on your local machine)
2. Create a **`.env`** file in the project’s root and fill in the variables from **`.env-example`**
3. Run **`yarn start`** (this will start your project in dev environment)

#### Production

1. Run **`yarn build`** to create a production build. The final output will be located in a **`/build`** folder.

---

### Folder Structure

The project contains the following tree structure:

```
/src
  /assets - contains the project’s assets that are used throughout the application.
    /icons - contains all custom icons (since this repo has fontawesome icons)
    /images - contains all images
  /components - contains all reusable components
    /controls - contains all reusable input fields and input fields custom styles
  /global - contains all global variables and styles
  /pages - contains all containers that represent a React Route
  /store - contains the global state of the webapp
  /utils - contains utility functions
```

---

### Coding Conventions

- This project follows functional paradigm and is built only with functional components using React hooks

- Each component is put into a folder named the same as we would like to call the component (ex: **Button**)

- The component is written in an **`index.js`** file and it’s styles are written as **`styles.module.scss`** (CSS Modules are used for styling)

- If there are additional files that are needed for the component (animations, tests) they are put into their own folders inside the component’s folder.

  **Example:**

  ```
  /Button
    /animations
      index.js
    /tests
      index.test.js
    index.js
    styles.module.scss
  ```

- If a particular component is only used and only makes sense inside another component (For example we want to divide a component into multiple subcomponents for readability) then we create another **`components`** folder inside the parent and create the component there.

  **Example:**

  ```
  /Header
    /components
      /HeaderPromo
        index.js
        styles.module.scss
    index.js
    styles.module.scss
  ```

- Use named exports instead of default exports

- Use absolute path as much as possible

- Use relative path only if the maximum distance is 2 directories

- When importing global styles inside other sass files use absolute paths: **`@import '~global/styles'`**

---

### Linting

#### Eslint

This project uses Airbnb's eslint config, react-hooks config and prettier config.

Install and configure an ESLint plugin for your IDE to be able to see all eslint errors.

All customized rules are inside **`.eslintrc`**.

All files that should be ignored by eslint are specified inside **`.eslintignore`**.

#### Stylelint

Stylelint is used for linting the CSS.

Install a stylelint plugin in your IDE to be able to see all potential errors.

All rules can be found inside **.stylelintrc** file.

---

Code with linting errors should not be pushed to repositories. For that reason a pre-hook is attached that checks for any linting errors when committing.

If you find a certain rule to be invaluable and make the code worse, talk with the team to potentially get it disabled.

---

### Committing Conventions

- When committing do not use capital letters
- Commit messages should always start with `task:`, `feature:`, or `fix:` (e.g `task: create homepage`)
- When doing a feature always create a merge request branch (e.g feature/homepage)

### Dependencies

- **react-router-dom** (page routing)
- **react-query** (storing server side data)
- **hookstate.js** (storing client side data)
- **axios** (http requests)
- **css-modules** (styling)
- **react-bootstrap** (components & styling)
- **autoprefixer** (no need to add vendor prefixes when styling)
