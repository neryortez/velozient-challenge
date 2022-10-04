Description
===

This is a code challenge for Velozient by Nery.
It consists of two projects: a NestJS project for the API and an Angular project for the UI.

Every project has their own run scripts, but to facilitate the review a script is included in the root folder.

To install all the dependencies run:
```
npm run install
```
To run both projects run:
```
npm run start
```

**API**
--
The API is written in Typescript for NodeJS using the framework NestJS.
The entry point is [here](./api/src/main.ts).


It uses Swagger (and swagger plugin) to document the Endpoints.

For this coding challenge, the password data is held in memory in the [PasswordCardsService](./api/src/password-cards.service.ts) in
an Array. Array's native functions are used to modify the list of Cards.

A test suite has been implemented in [here](api/src/app.controller.spec.ts). It covers all the API endpoints.


**UI**
--
The UI is an Angular project using Angular Material and TailwindCSS to style and facilitate the development.
The project heavily uses Observables.

Components where created where they made sense. 
- [CardComponent](ui/src/app/components/card/card.component.ts) to show the cards in the main page
- [EditCardComponent](ui/src/app/components/edit-card/edit-card.component.ts) is used as a dialog to create and edit cards
- [ConfirmationDialogComponent](ui/src/app/components/confirmation-dialog/confirmation-dialog.component.ts) is used as a 
dialog, to confirm actions. For now only to confirm the deletion of a card.



---

Assumptions
===
This project asumes that no authentication/authorization is needed to access the cards. This could be easily implemented
with authentication providers like Firebase Auth or Amazon Cognito, but is outside the scope of this challenge.
If this were to be implemented, the Angular Router can be used to show a login page and validate the authorization of the
users to the list of cards. Also, a Http Interceptor can be used to pass authentication data to every http call to the API.
 The API could also implement Guards to reject unauthorized request.

No validation are run in the fields like URL matching and password constraints. However, the API does check that there aren't
two cards with the same name.

The Angular project is limited to the main page containing the list of cards. In a modern webapp the project would be
divided into modules to organize code, implement lazy loading, and facilitate guarding.

The API avoids encryption of passwords, it could be implemented when a database is used.



---
Dependencies
=
Both the API and the UI uses the included [@nery/shared](shared/index.ts) library to share interfaces. In this case only the Card
interface was needed. But it could also be used to share other models, like DTOs.

The Angular (v14) uses:
- RxJS to provide Observables
- Angular Material for dialogs, snackbars, icons, buttons, form fields and cards
- Tailwind for styles (also to implement a little of responsive design)

The only non-default dependency in NestJS (v9) in the API is Swagger (and its NestJS plugin) used to document the endpoints

This project was originally written using Webstorm 2022.2.2
