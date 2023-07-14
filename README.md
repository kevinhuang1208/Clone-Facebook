# FaceQuote

FaceQuote (https://facequote.onrender.com/) is a full-stack project inspired by Facebook. FaceQuote is a site which entails features that allow registered users to post their favorite quotes, comment on others' posts, and a live chat for all users to discuss and enjoy their favorite quotes.

## Technologies

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Python-darkblue?style=for-the-badge&logo=python&logoColor=yellow"/><img src="https://img.shields.io/badge/Flask-white?style=for-the-badge&logo=flask&logoColor=black
" /><img src="https://img.shields.io/badge/SQLAlchemy-maroon?style=for-the-badge&logoColor=black"><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src='https://img.shields.io/badge/Amazon%20Web%20Services-yellow?style=for-the-badge&logoColor=black
'/><img src='https://img.shields.io/badge/SocketIo-black?style=for-the-badge&logo=socketio&logoColor=white'/>

## Landing Page

![readme-example-1](https://cdn.discordapp.com/attachments/1117948168353628201/1121820199973306531/image.png)

## Home Page

![readme-example-2](https://cdn.discordapp.com/attachments/1117948168353628201/1121820323503947816/image.png)

## Making a Post

## Posting a Comment

## Open Discussion

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

# Features

## Posts
Logged-in Users:
* Users can create a Post
* Users can update their Post
* Users can delete their Post
* Users can view each Post

## Comments
Logged-in Users:
* Users can post Comments on Posts
* Users can delete their Comments on a Post
* Users can view Comments on each Post

## Messages
Logged-in Users:
* Users can post Messages on a live chat.
* Users can read/update/delete their Messages via "My Logs" modal
* Users can read the chat history via "Chat Log" modal


## Contributors:

* Kevin Huang
   * GitHub: https://github.com/kevinhuang1208
   * Linkdin: https://www.linkedin.com/in/kevin-huang-a53139186/
