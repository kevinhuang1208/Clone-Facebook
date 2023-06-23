# FaceQuote

This is our full-stack capstone project reflecting what we have learned over the course of the program. FaceQuote (https://facequote.onrender.com/), a replicate site of Facebook (https://www.facebook.com/), is a project that encorporates the backend (databases, servers, routes) as well as the frontend (user/client side). Various technologies were used to help us achieve the site (listed below).

## Technologies

Technologies used were Javascript, REACT, Redux, Amazon Web Services, Python, Flask, SQLAlchemy , and PostgreSQL.

## Landing Page

![readme-example-1](https://cdn.discordapp.com/attachments/1117948168353628201/1121820199973306531/image.png)

## Home Page

![readme-example-2](https://cdn.discordapp.com/attachments/1117948168353628201/1121820323503947816/image.png)

## Launching the App Locally

1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
7. Open a new terminal while keeping the terminal running `flask` running.

8. In a NEW terminal, `cd` into `react-app` directory and run `npm install` to install all your dependencies before starting up the application.

9. Run `npm start` and it will open up your browser to http://localhost:3000

10. Test the features!


## Live Site

There is also a live site for you to test the features at https://facequote.onrender.com/



## Contributors:

* Kevin Huang
   * GitHub: https://github.com/kevinhuang1208
   * Linkdin: https://www.linkedin.com/in/kevin-huang-a53139186/
