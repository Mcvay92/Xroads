# CrossRoads 💼

### Coding Standards:
You can't push directly to master. Here is how to get a new feature merged:

-   First, make sure there is an issue for what you're working on.
-   Then make a branch for it (idealy one branch per issue but you can do several small issues in a branch).
-   Do your coding, make commits, and make sure ESLint is linting your files (see below).
-   When you're finished with your feature, make a pull request, describing your changes by referencing the exact issue number(s).
-   Github won't let you merge to master unless you have at least one person review and approve your changes.

### How to ESLint:
We are using eslint to maintain coding style standards. Here is how to get it working.

-   Install the **eslint** extention in vscode
-   Install the **Prettier** extention in vscode
-   Reload vscode
-   In the control panel, go to Code -> Preferences -> Settings. Search _Prettier: Eslint Integration_ and check that box to true.
-   Try adding an unnessary space somewhere in your code. A red squigly underline should appear from ESLint telling you to remove it.

### How to Build:
-   Please make sure you have the most recent versions of npm and node installed.
-   run `npm install` in the terminal in the project directory to install all dependencies
-   run `npm start` in the terminal in the project directory.
-   run `npm run dev` in the terminal in the project directory to start react and the server at the same time.

### How to run the production server:

- Run an 'npm install' to install all the dependencies
- Make sure the MongoDB server is running
- Run 'npm run build' to create a production build for the React app
- Run 'pm2 start prod-server.js' to start the production server
	- If the production is already running, run 'pm2 restart prod-server' to restart it

### How to Test Code:
## TDD
-   Install jest by following this link: https://jestjs.io/docs/en/getting-started
-   run `npx jest server` to run unit tests on the node.js server
-   run `npm test` to run unit tests on the react components

## BDD
-   If Chrome is not installed, install Chrome
-   export chromedriver to PATH with `export PATH=$PATH:(path to)/node_modules/chromedriver/lib/chromedriver/`
-   run `npm start`
-   run `npx cucumber-js`

## Coverage Report
-   run `npm test -- --coverage` for the coverage of the react components unit tests
-   run `npx jest server --coverage` for the coverage of the node.js unit tests

Happy Coding ✌️ 😋
