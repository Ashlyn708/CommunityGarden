# CommunityGarden
CONTENTS OF THIS FILE

- Introduction
  - Hello and thank you so much for visiting this page. This is the page for the community garden for Web Development Projects.
       - Date: 2/23/21
       - Title: Community Garden 
       - Author: Lauren Arthur,Ashley Locey, Ashlyn Averett

- Requirements
   - For this code we are requireing the packages node-fetch, express, and ejs. In order to run this code you will need to reinstall the express package.
   - The following steps is what you should take to run this code:
               - reinstall express package: <code> npm install express --save </code>
               
               - to run the code: <code>  node index.js </code>


- Implementation
   - This page implements Bootstrap framework. 
   - To obtain all the data needed, a fetch call is used to be sent to EJS. 

-Database
   - The index page uses MongoDB to hold the information it receives from the plot forms.
   - The database can be accesed through using the given email as the login
   
-Emails
   - For the emails to work in both the index page and contact page, the account owner has to 
    turn on less secure app access that can be found in the google account setting under security.
    - They also have confirm google.com/accounts/DisplayUnlockCaptcha .
     Just allow access once and let nodemailer login automatically, it will.

- Additional information
   - This page is currently hosted in Heroku: 
   - Github Link: https://github.com/Ashlyn708/CommunityGarden.git
