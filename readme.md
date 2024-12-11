# Express TypeScript Project

## Getting Started

Follow these instructions to set up and run the Express TypeScript project on your local machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Angaza-Elimu/classroom-ai-tools.git
    cd classroom-ai-tools
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

### Running the Project

1. Compile TypeScript to JavaScript:
    ```sh
    npm run build
    # or
    yarn build
    ```

2. Start the server:
    ```sh
    node dist/index.js
    ```

    ### Additional Setup

    Make sure you have the following installed:

    - [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
    - [pgvector](https://github.com/pgvector/pgvector) extension for PostgreSQL
    - An OpenAI API key. You can generate one [here](https://beta.openai.com/signup/).

    ### Development

    To start the project in development mode with hot-reloading:

    ```sh
    npm run dev
    # or
    yarn dev
    ```

    ### Testing

    Run the tests using:

    ```sh
    npm test
    # or
    yarn test
    ```

    ### Linting

    Lint the code using:

    ```sh
    npm run lint
    # or
    yarn lint
    ```

    ### Folder Structure

    ```
    .
    ├── src
    │   ├── controllers
    │   ├── middlewares
    │   ├── models
    │   ├── routes
    │   ├── services
    │   └── index.ts
    ├── tests
    ├── dist
    ├── package.json
    ├── tsconfig.json
    └── README.md
    ```

    ### License

    This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
    ```sh
    git clone https://github.com/Angaza-Elimu/classroom-ai-tools.git
    cd classroom-ai-tools
    ```