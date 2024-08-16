# API DOCUMENTATION

- [SIGN-UP](#sign-up)
- [LOGIN](#login)
- [LOGOUT](#logout)
- [FLAT SHARE](#flat_share)
- [TODOS](#todos)

## SIGN UP

### POST /api/user/

#### Expected JSON :

> {<br>
> "username": "test",<br>
> "email": "test@test.com",<br>
> "password": "poisson44",<br>
> }

#### Return a **201** with username and email.

#### <u>Error cases</u> :

If username, email and/or password is missing, **400** :
> {<br>
>   'username': [<br>
>     'This field is required.'<br>
>   ],<br><br>
>   'email': [<br>
>     'This field is required.'<br>
>   ]<br>
> }

Works the same if the username, email and/or password is blank ('username': ''), return a **400** with :
> 'username': ['This field is required']

If the username and/or the email are already taken, **409** :
> {<br>
> 'username': [<br>
> "A user with that username already exists."<br>
> ],<br><br>
> 'email': [<br>
> "user with this email already exists."<br>
> ]<br>
> }

#### The followings are all about password validations, so they are all return a 400 and can all be found in { 'password': [] }.
If the password is too similar to the username :
> 'The password is too similar to the username.'

If it's too similar to the email :
> 'The password is too similar to the email.'

If it's too short :
> 'This password is too short. It must contain at least 8 characters.'

If the password is too common :
> 'This password is too common.'

If the password is entirely numeric :
> 'This password is entirely numeric.'

## LOGIN

### POST /api/user/login/

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

#### <u>Error cases</u> :

If the data send is missing either email or password, it returns a 400 :

> "error": "Missing Credentials"

If the "email" in the request is not of email format, it returns a 400 :

> "error": "Enter a valid email address."

If the credentials in the request doesn't match anything in the DB, returns a 401 :

> "error": "Invalid Credentials"


## LOGOUT

### DELETE /api/user/logout/

#### If successful, should return a 204

#### Error Cases :

Return a 204 with :

> "error": "The error message"


## FLAT_SHARE

### POST /api/flat/

#### Expected JSON :

>{<br>
> "name": "A name"<br>
> }

Field "description" is optional.

#### It should return a 201 with :

> {<br>
> "name": "A name"<br>
> "description": null<br>
> }

#### <u>Error cases</u> :

If sent with an empty string for "name", 400 with :

> {<br>
>&nbsp;&nbsp;&nbsp;"name": [<br>
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"This field may not be blank."<br>
>&nbsp;&nbsp;&nbsp;	]<br>
>}

If sent without "name", 400 with :

> {<br>
>&nbsp;&nbsp;&nbsp;"name": [<br>
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"This field is required."<br>
>&nbsp;&nbsp;&nbsp;	]<br>
>}

### GET /api/flat/{id}/

#### No body. Return 200 with : 


>{<br>
	"name": "A flat",<br>
	"description": "The description of the flat."<br>
}

#### <u>Error cases</u> :

If flat doesn't exist, 404 with :

>{<br>
	"detail": "Not found."<br>
}

### PATCH /api/flat/{id}/

#### Expect either the "name" or the "description" (or both) in the JSON. Return a 200 with the "name" and "description".

#### <u>Error cases</u> :

/!\ There is some cases to handle. Not Implemented Yet.

### DELETE /api/flat/{id}/

#### No body. Return 204.

#### <u>Error cases</u> :

If flat doesn't exist, 404 with :

>{<br>
	"detail": "Not found."<br>
}


## TODO

### CREATE /api/todo/

#### Expected JSON :

>{<br>
	"flat_share": 1,<br>
	"name": "A todo list",<br>
	"category": null<br>
}

You can send it without the "category", it will be set to null.

#### Should return a 201 with "flat_share", "name" and "category" in the body.

#### <u>Error cases</u> :

If "flat_share": "", return 400 with :

> {<br>
	"flat_share": [<br>
		"This field may not be null."<br>
	]<br>
}

If no "flat_share" in the body, return 400 with :

{<br>
	"flat_share": [<br>
		"This field is required."<br>
	]<br>
}

Would be the same for "name" instead of "flat_share".

### GET /api/todo/flat/{id}/

Should return all todos for a flat using the flat_id.

#### No body expected. Return a 200 with :

> {<br>
	"todos": [<br>
		{<br>
			"id": 4,<br>
			"flat_share_id": 1,<br>
			"name": "Course",<br>
			"updateDate": "2024-05-31T09:26:26.769916Z",<br>
			"category_id": null<br>
		},<br>
		{<br>
			"id": 5,<br>
			"flat_share_id": 1,<br>
			"name": "Course",<br>
			"updateDate": "2024-05-31T10:48:38.573414Z",<br>
			"category_id": null<br>
		}<br>
> 	]<br>
> }<br>

If no todos for this flat, return the empty list.

#### <u>Error cases</u> :

If flat doesn't exist, 404 with :

>{<br>
	"detail": "Not found."<br>
}

### DELETE /api/todo/{id}/

#### No body. Return 204.

#### <u>Error cases</u> :

If todo doesn't exist, 404 with :

>{<br>
	"detail": "Not found."<br>
}

## TASK



This was written with love and energy drink
