# Software Engineering Project 2022-2023
![my badge](https://badgen.net/badge/nodeJS/v18.12.1/green/?icon=https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg) ![react](https://user-images.githubusercontent.com/115226054/218500804-ab08f439-cd40-4554-8003-1a3957338a38.svg) ![my badge](https://badgen.net/badge/express/v4.18.2/red/?icon=https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg) ![mysql](https://user-images.githubusercontent.com/115226054/218501030-55685c2d-a632-4cab-a57e-0c5ef694059d.svg) 

#### Members: 

- Athina Mavrommati (el19120)
- Natalia Bourdi (el19031)
- Georgios Mystriotis (el19065)
- Nikolaos Stamatopoulos (el19020)
  
IntelliQ is a software system designed to allow users to upload custom questionnaires and distribute them to the public to answer. It includes a REST API which provides the following functional endpoints:
1. GET questionnaire info
2. GET question info
3. GET all answers given for a question
4. GET all answers given in a session
5. POST an answer to a question<br> 
<br>
The software also includes a Command Line Interface which performs commands that call the various endpoints.<br>
<br>
The use cases "Answer Questionnaire" and "View Questionnaire Response Data with Pie" are also implemented in front-end as a web-app interface.<br> 

### Prerequisites
* Have Node installed. Visit:
  https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
* Apache & MySQL (preffered XAMPP)

### How to run
1. Set up the database
2. Open the shell, connect to the database with mysql -u root -p and run the database dump to fill the database.
3. Run intelliQ.exe found in ~/SoftEng22-13/api-backend 
4. Run the installer.js:
  ```sh
  node installer.js
  ```
5. Build the front-end using the instructions given in the respective folder.

#### Group: SoftEng22-13


