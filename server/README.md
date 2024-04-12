# API DOCUMENTATION

- [SIGN-UP](#sign-up)
- [LOGIN](#login)

## SIGN UP
## Not complete
### POST /api/users/

Expected JSON :

> {<br>
> "username": "test",<br>
> "email": "test@test.com",<br>
> "password": "poisson44",<br>
> }


## LOGIN

### POST /api/users/login

#### Expected JSON :

> {<br>
> "email": "test@test.com",<br>
> "password": "poisson44",<br>
> }

#### It should return a 200 with :

> {<br>
> "status": "Login Success"<br>
> }

#### With a session cookie and a csrf token like this :

> csrftoken : zWhUhJQQzvNoF5nvQ8PiQzAtkfgvzAZe<br>
> sessionid : 8qh8ch485yf7a8vad7o9pnw29p1eou5v

This session cookie have a 2 hours live spawn in the server side (unless the session data is updated). On the client side, the session cookie doesn't have any expiry time. Instead it's deleted when the user close the navigator.

If there is "stay_connected": true added in the request, then the session cookie will be set to 90 days instead. (client and server side)

#### <u>Errors cases</u> :

If the data send is missing either email or password, it returns a 400 :

> "error": "Missing Credentials"

If the "email" in the request is not of email format, it returns a 400 :

> "error": "Enter a valid email address."

If the credentials in the request doesn't match anything in the DB, returns a 401 :

> "error": "Invalid Credentials"

This was written with love and energy drink
