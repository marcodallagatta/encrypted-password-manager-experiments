# Project Fixes

In this file I'll document the fixes I've applied, explain some decisions, and so on:

## Contents

-   [Application Fixes](#application-fixes)
-   [Fixed Issues](#fixed-issues)
-   [Enhancement Notes](#enhancement-notes)
-   [My Fixes](#my-fixes)

## Application Fixes

-   Your passwords are hidden behind a login with a 'master password' which grants you access to view all your other passwords.
-   The master password is '123456789'.
-   You can view, create, edit and delete passwords.
-   Your passwords are persisted locally in an encrypted format, only decryptable via the master password.

## Fixed Issues

-   Currently, the application does not compile when running `npm start`. It should compile and run in development mode when running `npm start`.

    -   clsx package wasn't listed in package.json, so I installed that.
    -   The listed Typescript version was lower than 3.8, so import types would fail, updated to 3.8.0 fixed the issue.
    -   At this point simply running `npm install` to pull the dependencies and install them locally got everything working.

-   When I add a password and save it, then refresh my browser, I can't see the password that I just created any more. Passwords and modifications to them should be persisted so that I can still see my passwords after refreshing or revisiting after having closed my browser.

    -   used the built-in localStorage to persist data between reloads (not secure, this will get much better after an encryption course!)
    -   the useEffect() responsible to update the localstorage missed the [decryptedPasswords] dependency

-   In the passwords list view, when I select a password, then go and edit the name of the password, then click on save, the password is not highlighted in the list anymore even though it is still the selected one (indicated by the fact that I can still see it in the password view area). A password should remain selected in the list when I edit its name.

    -   fixed by the same fix that I applied for the next item.

-   In the passwords list view, when I have a password already selected and I select another one, both passwords are now highlighted indicating selection. Only the most recently selected password should be highlighted.

    -   fixed by using conditional style in PasswordListItem based on a state (highlight) collecting the selected item in Passwords

-   There should be no errors showing up in the console.

    -   added lsit keys to PasswordListItem which was causing a console error
    -   same with UrlList in PasswordEdit

-   When adding the same url to different passwords, the user should be alerted as to the fact that they might have an outdated password inside their password storage since different passwords are now stored for the same url.

-   In the password edit view, when I add new url items they don't appear in the list of urls while editing. After saving and clicking on edit again they do appear. They should appear while I'm adding them inside the password edit view.

-   In the password edit view, when trying to delete one of the urls for a given password by clicking the 'x' icon on one of the url list items, nothing happens. The url for which the 'x' icon was clicked should be deleted.
    -   the syntax for the callback to delete the url was wrong, as there was an additional "() =>"

## Enhancement Notes

-   PasswordEdit is not typed. Convert the file to typescript.

-   Improve the aesthetic aspect of the UI.

-   PasswordEdit and PasswordView seem to have some code duplication, especially in terms of layout and css. Find a way to abstract that into some shared code.

## My Fixes

-   made it so that when having an empty URL the app doesn't crash: <Labelled label="url">{password.url?.join(', ') || '-'}</Labelled>
-   'no urls added' didn't show correctly in password edit view without a url set (it was checking for length of 0 instead of undefined)
-   prepend 'https://' to new url field
-   in the PasswordEdit component's input, a 'value' instead of 'defaultValue' caused a console error.
-   'created at' resulted in an error since it was trying to pass an incorrect date instead of the current time of new Date() (no args)
