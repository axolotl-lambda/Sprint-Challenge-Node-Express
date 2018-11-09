# Review Questions

## What is Node.js?

Node.js is a JavaScript runtime for running JavaScript code outside of the browser.

## What is Express?

Express is a lightweight, JavaScript library for building servers on Node.js.

## Mention two parts of Express that you learned about this week.

Middleware, routing.

## What is Middleware?

Middleware is, as the name implies, is a bit of code that runs in between other bits of code. This can be to modify data somehow, or to produce a side effect like logging. 

## What is a Resource?

A resource is a bit of data that lives on our server (such as a database entry), that is accessable through out API CRUD operations, much like how an object instance may contain data that is modifiable via its methods. 

## What can the API return to help clients know if a request was successful?

A 2xx status code.

## How can we partition our application into sub-applications?

With express routing, aka `express.Router()`.

## What is express.json() and why do we need it?

`express.json()` is a bit of middleware that teaches express how to parse JSON on our request body.