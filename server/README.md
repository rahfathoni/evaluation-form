# Server or Backend Side

## DOCKER method, Setup Server and run on Local environment
see setup in `README.md` root folder

## MANUAL method, Setup Server and run on Local environment

  1. open terminal in server folder
  2. in server terminal, install depedencies 
      ```
      npm install
      ``` 
  3. go to `.env.template` and change to `.env`, configure your database username, password, db_name, and host (host to 127.0.0.1)
  4. in server terminal, create your local database
      ```
      npx sequelize-cli db:create
      ```
  5. in server terminal, run migration for db table
      ```
      npx sequelize-cli db:migrate
      ```
  6. in server terminal, run seeders for initial dummy data 
      ```
      npx sequelize-cli db:seed:all
      ```
  7. in server terminal, start server in local environment
      ```
      npm run dev
      ```