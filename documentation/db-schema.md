# Database Schema and Backend Routes

## Database Schema

![Database Schema](https://cdn.discordapp.com/attachments/1117948168353628201/1118219548701757481/dbshema.PNG)


## Backend Routes

### Users
`GET /api/users/`
* Returns the information for all users

`GET /api/users/:id`
* Returns the information for one user

### Sessions
`GET /api/auth/`
* Returns the information for the logged in user

`POST /api/auth/signup`
* Signs a new user up

`POST /api/auth/login`
* Logs in a user

`DELETE /api/auth/`
* Logs out a user

### Posts
`GET /api/posts/`
* Returns the information for all posts

`POST /api/posts/`
* Creates a new post

`GET /api/posts/:id`
* Returns the information for one post

`PUT /api/posts/:id`
* Edits the information for one post

`DELETE /api/posts/:id`
* Deletes a post

### Comments
`GET /api/posts/:id/comments`
* Returns all the comments associated with the post

`POST /api/posts/:id/`
* Creates a new comment

`GET /api/posts/:id/comments/:id`
* Returns the information for one comment

`PUT /api/posts/:id/comments/:id`
* Edits the information for one comment

`DELETE /api/posts/:id/comments/:id`
* Deletes a comment
