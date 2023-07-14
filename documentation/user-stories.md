# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `signup` modal:
    * I would like to be able to enter my email, first+last name, preferred password, birthday and gender on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the home (`/`) page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log-in form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-in form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` modal or the home page with the login form:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a the landing page with the log-in form.
      * So that I can easily log out to keep my information secure.

## Posts

### Create Posts

* As a logged in user, I want to be able to make a new post.
  * When I'm on the `/` page as a logged in user:
    * I can write and create a new post.
      * So that I can share my thoughts, memes, and videos with other users.

### Viewing Posts

* As a logged in user, I want to be able to view the posts created by other users.
  * When I'm on the `/` page:
    * I can view all posts by other users.
      * So that I can read and interact with the thoughts and memes of other users.

* As a logged in user, I want to be able to view a specific post and its associated comments and likes.
  * When I'm on the `/:id` page:
    * I can view the content of the post, as well as the associated comments and likes.
      * So that I can read the contents of the post.

### Updating Posts

* As a logged in user, I want to be able to edit my posts by clicking an Edit button associated with the post anywhere that post appears.
  * When I'm on the `/` or `/:id` pages:
    * I can click "Edit" to make permanent changes to posts I have posted.
      * So that I can fix any errors I make in my posts.

### Deleting Posts

* As a logged in user, I want to be able to delete my posts by clicking a Delete button associated with the post anywhere that post appears.
  * When I'm on the `/` or `/:id` pages:
    * I can click "Delete" to permanently delete a post I have posted.
      * So that when I realize I shouldn't have publicly said something, I can easily remove it.


## Comments

### Posting Comments

* As a loggin in user, I want to be able to post a comment on anyone's post, including my own.
    * When I am on the `/` page, I want to be able to click on `comments` and doing so would open a modal for me to add a comment for the post.
    * When I am on the `/:id` page, I want to be able to add a comment for the post.

### Viewing Comments

* As a logged in user, I want to be able to view the comments created by other users or myself.
  * When I'm on the `/` page:
    * I can view all posts by other users which will have the amount of comments on the bottom-right.
    * There will be a `comment` button that will open a modal for me to add a comment for the post.

* As a logged in user, I want to be able to view a specific post and its associated comments and likes.
  * When I'm on the `/:id` page:
    * I can view the content of the post, as well as the associated comments and likes.
      * So that I can read and interact with the thoughts and memes of other users, and add my own thoughts and memes in the comments.

### Updating Comments

* As a logged in user, I want to be able to edit my comments by clicking an Edit button associated with the post anywhere that comment appears.
  * When I'm on the `/` or `/:id` pages:
    * I can click "Edit" to make permanent changes to comments I have posted.
      * So that I can fix any errors I make in my comments.

### Deleting Comments

* As a logged in user, I want to be able to delete my comments by clicking a Delete button associated with the comment anywhere that comment appears.
  * When I'm on the `/` or `/:id` pages:
    * I can click "Delete" to permanently delete a comment I have posted.
      * So that when I realize I shouldn't have publicly said something, I can easily remove it.

## Messages

### Sending Messages

* As a loggin in user, I should be able to send a message on the "Open Discission" chat.
    * When I am on the `/chat` page, I want to be able to see all `messages` live.

### Viewing Messages

* As a logged in user, I want to be able to view messages created by other users or myself.
  * When I'm on the `/chat` page:
    * There is a `Chat Log` modal where I can view all messages by other users, including my own.
    * There is a `My Logs` modal where I can view all message send by me.

### Updating Messages

* As a logged in user, I should be able to edit my messages by clicking an Edit button associated with the message in the `My Logs` modal.
  * When I'm on the `My Logs` modal:
    * I can click "Edit" to make permanent changes to messages I have sent.
      * So that I can fix any errors I make in my messages.

### Deleting Messages

* As a logged in user, I want to be able to delete my messages by clicking a Delete button associated with the message in the `My Logs` modal.
  * When I'm on the `My Logs` modal:
    * I can click "Delete" to permanently delete a message I have sent.
      * So that when I realize I shouldn't have publicly said something, I can easily remove it from the chat log.
