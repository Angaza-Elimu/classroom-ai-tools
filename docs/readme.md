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


    ### Project Description

    This project is an Express.js application written in TypeScript. It serves as a backend for managing educational interventions using AI tools. The application provides APIs for various functionalities such as user management, data processing, and integration with external AI services. It leverages PostgreSQL as the database and includes support for the pgvector extension to handle vector-based data. The project is designed to be modular and scalable, with a clear folder structure to organize the codebase effectively.


    ### How It Works

    The project is structured to provide a robust and scalable backend for educational interventions using AI tools. Here's a high-level overview of how it works:

    1. **API Endpoints**: The application exposes various RESTful API endpoints to handle different functionalities such as user management, data processing, and AI service integration. These endpoints are defined in the `routes` directory.

    2. **Controllers**: The controllers in the `controllers` directory handle the business logic for each API endpoint. They process incoming requests, interact with the services, and send appropriate responses back to the client.

    3. **Services**: The services in the `services` directory contain the core logic of the application. They interact with the database, perform data processing, and integrate with external AI services like OpenAI.

    4. **Database**: The application uses PostgreSQL as its primary database. The `models` directory contains the database models defined using an ORM (Object-Relational Mapping) library. The pgvector extension is used to handle vector-based data, which is essential for AI-related functionalities.

    5. **Middlewares**: The middlewares in the `middlewares` directory are used to handle cross-cutting concerns such as authentication, logging, and error handling.

    6. **TypeScript**: The project is written in TypeScript, which provides static typing and helps catch errors at compile time. The `tsconfig.json` file contains the TypeScript configuration.

    7. **Build and Run**: The TypeScript code is compiled to JavaScript using the build scripts defined in `package.json`. The compiled code is placed in the `dist` directory, and the server is started by running the compiled `index.js` file.

    8. **Development Mode**: During development, the project can be run in hot-reloading mode using `npm run dev` or `yarn dev`. This allows for a faster development cycle by automatically recompiling and restarting the server when code changes are detected.

    9. **Testing and Linting**: The project includes scripts for running tests and linting the code to ensure code quality and correctness. Tests are placed in the `tests` directory and can be run using `npm test` or `yarn test`. Linting can be performed using `npm run lint` or `yarn lint`.

    By following this structure, the project ensures a clean separation of concerns, making it easier to maintain and extend. The use of TypeScript and PostgreSQL with pgvector provides a solid foundation for building advanced AI-driven educational tools.