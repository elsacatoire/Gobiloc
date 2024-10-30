# API DOCUMENTATION

- [SIGN-UP](#sign-up)
- [LOGIN](#login)
- [LOGOUT](#logout)
- [FLAT SHARE](#flat_share)
- [INVITE](#invite)
- [TODOS](#todos)

## SIGN UP

### POST /api/v1/user/

#### Expected JSON :

> {<br>
> "username": "test",<br>
> "email": "test@test.com",<br>
> "password": "poisson44",<br>
> }

#### Return a **201** with username, date_joined, flat_share_id (=null) and email.

#### <u>Error cases</u> :

If username, email and/or password is missing, **400** :
> {<br>
>   'username': [<br>
>     'This field is required.'<br>
>   ],<br><br>
>   'email': [<br>
>     'This field is required.'<br>
>   ],<br>
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
> ],<br>
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

### POST /api/v1/token/

#### Expected JSON :

> {<br>
> "email": "test@test.com",<br>
> "password": "poisson44",<br>
> }

#### It should return a 200 with "refresh" token and "access" token. The first is valid for 90 days and the later for 5 min.

#### <u>Error cases</u> :

If the data send is missing either email or password, it returns a 400 :

> "error": "This field is required"

If the credentials in the request doesn't match anything in the DB, returns a 401 :

> "detail": "No active account found with the given credentials"


## FLAT_SHARE

### POST /api/v1/flat/

#### Expected JSON :

> {<br>
> &nbsp;&nbsp;&nbsp; "id": 21,<br>
> &nbsp;&nbsp;&nbsp; "name": "Le Mordor",<br>
> &nbsp;&nbsp;&nbsp; "description": null,<br>
> &nbsp;&nbsp;&nbsp; "users": [<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "id": 7,<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "username": "Patrick"<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br>
> &nbsp;&nbsp;&nbsp; ]<br>
> }

Field "description" is optional.

#### It should return a 201 with :

> {<br>
> "name": "A name"<br>
> "description": null<br>
> }

#### <u>Error cases</u> :

If user is already in a flat, 400 with :

> "error": "User is already in a flat."

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

### GET /api/v1/flat/{id}/

#### No body. Return 200 with :


> {<br>
> &nbsp;&nbsp;&nbsp; "id": 21,<br>
> &nbsp;&nbsp;&nbsp; "name": "Le Mordor",<br>
> &nbsp;&nbsp;&nbsp; "description": null,<br>
> &nbsp;&nbsp;&nbsp; "users": [<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "id": 7,<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "username": "Patrick"<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br>
> &nbsp;&nbsp;&nbsp; ]<br>
> }

Also

#### <u>Error cases</u> :

If flat doesn't exist, or if it exists but the user is not in it, 404 with :

>{<br>
	"detail": "Not found."<br>
}

### PUT/PATCH /api/v1/flat/{id}/

#### Expect either the "name" or the "description" (or both) in the JSON. Return a 200 with the "name" and "description".

#### <u>Error cases</u> :

FOR THE PUT : <u>name</u> field is required

If flat doesn't exist, or if it exists but the user is not in it, 404 with :

>{<br>
	"detail": "Not found."<br>
}


## INVITE

### To create an invite :
### POST /api/v1/flat/{flat_id}/create-invite/

#### No body. Return 201 with :

>{<br>
	"invited_by": "test@test.com",<br>
	"flat_share": 24,<br>
	"code": "951385d84fa078f25285",<br>
	"created_at": "2024-10-20T17:45:00.786275Z"<br>
}

An invitation last up to 7 days.
The invitation code is always 20 characters long.

#### <u>Error cases</u> :

If User is not in a flat share, 403 with :

> {<br>
> "error": "User does not have a flat share"<br>
> }


### To accept an invite :
### POST /api/v1/accept-invite/

#### Expected JSON :

>{<br>
> "invitation_code": "951385d84fa078f25285"<br>
> }

#### Return 200 with :

>{<br>
> "message": "Invitation accepted"<br>
> },

#### <u>Error cases</u> :

If User is already in a flat share, 400 with :

> {<br>
> "error": "User is already in a flat share"<br>
> }

If invitation_code send is invalid, or there's no matching Invitation :

> {<br>
> "error": "Invalid invitation code"<br>
> }

If Invitation is expired :

> {<br>
> "error": "Invitation expired"<br>
> }

## TODO

### CREATE /api/v1/flat/{flat_id}/todo/

#### Expected JSON :

>{<br>
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

### GET /api/v1/flat/{flat_id}/todo/

Should return all todos for a flat using the flat_id.

#### No body expected. Return a 200 with :

> [<br>
&nbsp;&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;"id": 20,<br>
&nbsp;&nbsp;&nbsp;&nbsp;"name": "Courses",<br>
&nbsp;&nbsp;&nbsp;&nbsp;"category": null,<br>
&nbsp;&nbsp;&nbsp;&nbsp;"tasks": [<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 1,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"todo": 20,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"content": "Tofu",<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"done": false<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 2,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"todo": 20,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"content": "Patate",<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"done": true<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
&nbsp;&nbsp;&nbsp;&nbsp;]<br>
&nbsp;&nbsp;},<br>
&nbsp;&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;"id": 21,<br>
&nbsp;&nbsp;&nbsp;&nbsp;"name": "Checklist",<br>
&nbsp;&nbsp;&nbsp;&nbsp;"category": null,<br>
&nbsp;&nbsp;&nbsp;&nbsp;"tasks": []<br>
&nbsp;&nbsp;},<br>
]<br>

If no todos for this flat, return the empty list.

#### <u>Error cases</u> :

If flat doesn't exist, 404 with :

>{<br>
	"detail": "Not found."<br>
}


### PATCH /api/v1/flat/{flat_id}/todo/{todo_id}/

#### Modify name or category, return a 200 with todo information

### DELETE /api/v1/flat/{flat_id}/todo/{todo_id}/

#### No body. Return 204.

#### <u>Error cases</u> :

If todo doesn't exist, 404 with :

>{<br>
	"detail": "Not found."<br>
}

## TASK

### CREATE /api/v1/flat/{flat_id}/todo/{todo_id}/task/

### GET /api/v1/flat/{flat_id}/todo/{todo_id}/task/

#### Get all the tasks for a specific todo.

### GET /api/v1/flat/{flat_id}/todo/{todo_id}/task/{task_id}/

#### Get one specific task.

### PATCH /api/v1/flat/{flat_id}/todo/{todo_id}/task/{task_id}/

### DELETE /api/v1/flat/{flat_id}/todo/{todo_id}/task/{task_id}/



## BUDGET

### (unused in frontend) CREATE /api/v1/flat/{flat_id}/budget/

### GET /api/v1/flat/{flat_id}/budget/{budget_id}
#### Get the budget with all the expenses

### (unused) GET /api/v1/flat/{flat_id}/budget/
#### Get the budget with all the expenses

## EXPENSE

### CREATE /api/v1/flat/{flat_id}/budget/{budget_id}/expense/

### DELETE /api/v1/flat/{flat_id}/budget/{budget_id}/expense/{expense_id}/


This was written with love and energy drink
