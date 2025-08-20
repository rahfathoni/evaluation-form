# SUPERVISOR EVALUATION FORM

## Docker method, Setup Server and run on Local environment

  1. open server folder, go to `.env.template` and change to `.env`, configure your database username, password, and db_name
  2. open client folder, go to `.env.template` and change to `.env`
  3. back to root folder, open terminal 
  4. in root terminal, build docker image
      ```
      docker compose build
      ``` 
   
  5. in root terminal, run service 
      ```
      docker compose up -d
      ``` 
  6. in root terminal, create your local database 
      ```
      docker compose run --rm server npm run db:create
      ``` 
  7. in root terminal, apply scheme to DB
      ```
      docker compose run --rm server npm run db:migrate
      ```
  8. in root terminal, run seeder for default and dummy data
      ```
      docker compose run --rm server npm run db:seed
      ```
  9.  access server for testing
      ```
      http://localhost:4000/api/
      ```
  10. application ready to run, open
      ```
      http://localhost:3000
      ```

## MANUAL method, Setup Server and run on Local environment
see setup in `README.md` folder server and client