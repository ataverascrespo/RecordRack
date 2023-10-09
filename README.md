<a href="https://recordrack.ca">
  <h1 align="center">Record Rack</h1>
  <p align="center">
    <img alt="Record Rack Logo" src="https://res.cloudinary.com/dlwfuryyz/image/upload/v1696172995/Group_23_crzpne.png" width="600" >
  </p>
</a>

<p align="center">
 Record Rack allows you to curate a digital music collection, powered by Spotify's Web API. <a href="https://recordrack.ca">Access the full app here.</a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#technology-stack"><strong>Tech Stack</strong></a> ·
  <a href="#front-end"><strong>Front-End</strong></a> ·
  <a href="#back-end"><strong>Back-End</strong></a> ·
  <a href="#deployment"><strong>Deployment</strong></a> ·
  <a href="#testing"><strong>Testing</strong></a> · 
  <a href="#installing"><strong>Installing</strong></a> ·
<a href="#what-i-learned"><strong>What I Learned</strong></a>
</p>
<br/>

## Introduction

Welcome to Record Rack, one of my most treasured projects and one that I have been iterating/expanding on since late 2022. 

As a fan of everything related to music, I love keeping track of the songs and albums I love and sharing them with the people around me. But because people use such a wide variety of streaming platforms (i.e Spotify, Apple Music, Amazon, YouTube, TIDAL, etc.) it can be hard to connect and share music digitally. And Record Rack is my interpretation of the solution to that problem.

## Technology Stack

<div class="flex flex-col">
  <h3>Front End - React, TypeScript, Tailwind CSS, MobX</h1> 
  
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="react" width="100"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png?20221110153201" alt="TypeScript" width="100"/>
<img src="https://files.raycast.com/sjxs3pxsc6k63ju0fzv8l3cu4v90" alt="tailwindCSS" width="100"/>
<img src="https://mobx.js.org/img/mobx.png" alt="MobxStateManagement" width="100"/>
</div>

<div class="flex flex-col">
  <h3>Back End - .NET Core, C#, PostgreSQL</h1> 
  
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/2048px-.NET_Core_Logo.svg.png" alt=".NET" width="100"/>
<img src="https://seeklogo.com/images/C/c-sharp-c-logo-02F17714BA-seeklogo.com.png" alt="C#" width="100"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" alt="PostgreSQL" width="100"/>
</div>


<div class="flex flex-col">
  <h3>Hosting/Deployment - Docker, NGINX, AWS EC2 and RDS</h1> 
  
  <img src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/ywjqppks5ffcnbfjuttq" alt="Docker" width="100"/>
<img src="https://managedserver.it/wp-content/uploads/2021/11/nginx.png" alt="NGINX" width="100"/>
<img src="https://static-00.iconduck.com/assets.00/aws-icon-1024x1024-runl182z.png" alt="AWS" width="100"/>
</div>


## Front-end 

The front-end is built using React and TypeScript, styled using Tailwind CSS (with some customized components from the amazing Shadcn/ui library). I took the time to configure it as a Progressive Web App, meaning mobile users can download it to their devices and have a user experience like that of a platform-specific app.

As for global state management, Record Rack uses Mobx, which I ultimately chose over libraries such as Redux, Jotai and Zustand because of the built-in abstraction making the codebase a bit simpler, and because of my previous experience with similar libraries in Flutter.

The front-end's music features are powered by the integrated Spotify Web API. Users don't have to know the meaningful information of the music they add - it's as easy as searching the title and/or artist!

## Back-end

The back-end consists of a REST API I built using the .NET Core 7 framework in C#. This API performs a variety of CRUD operations through HTTP request methods, including GET, POST, PUT and DELETE. These endpoints are securely locked behind OAuth 2.0 authorization, which is fulfilled by JSON Web Tokens in the form of refresh and access tokens. 

The API uses .NET Language Integrated Queries (LINQ) to insert, delete and retrieve app data from a PostgreSQL database, which is created and maintained by Entity Framework code-first migrations. 

The back-end is also supported by some additional APIs: 
- Cloudinary API integration allows uploaded profile photos to be inserted into and retrieved from a storage bucket.
-  Twillio Sendgrid API integration allows the app to send users emails regarding account verification/password resets.

## Deployment

The front-end is hosted on Netlify because I think it's the easiest place to host any front-end website/web app. Their integrated GitHub deployments make CI/CD  easy - everytime I push a change to this repo, it automatically deploys a new build! Plus, Netlify distributes and auto-renews SSL certification with LetsEncrypt, so one less thing I need to worry about.

The .NET 7 API is deployed onto a Docker container. The Docker container is ran on an Amazon Web Services EC2 instance, which has been configured with NGINX as a reverse proxy and load balancer. I manually installed Certbot to configure a LetsEncrypt SSL certificate on the EC2 instance, so the back-end is fully HTTPS encrypted. I added a CentOS cron task to handle the renewal of that certificate as well!

On top of this, the PostgreSQL database is hosted on an Amazon Web Services RDS environment, and directly interfaces with my EC2 API container to store application data.

## Testing

Due to some time constraints (mostly self-imposed) I didn't have as much time to automate testing as I would have liked. I have 24 unit tests cases using Jest so far - but soon, I'm gonna go back and do some more business logic testing with unit tests, as well as some integration and E2E testing. 

## Installing
Because Record Rack is open-source, feel free to report any issues or make contributions. 



    npm install --force*
    
	## To run dev environment
    npm run dev
    
    ## To run tests
    npm run test
    
    ## To build a prod version
    npm run build


**Unfortunately,  **react-textfit**, while being a great asset to the project, also has caused some dependency issues for myself and others using it. It doesn't affect development or deployment - but it does mean I have to use the **--force flag** on any npm tasks even when there are no other errors. Very annoying and hopefully I can push a fix soon. **For your own use, always make sure that you resolve all conflicts in the dependencies before using --force to ignore the react-textfit conflict.***

## What I Learned

Since I am focused on being consistent in my application of good coding practices and real-world concepts, I have been able to learn and apply alot. Here's an (ongoing) list of some of the cool things I've learned, re-learned or re-inforced my knowledge of: 

* Model-View-Controller architecture 
* Dependency injection and properly decoupling classes
* Asynchronous programming
* JSON Web Token authentication in the form of access/refresh tokens, and the security implications/solutions involved with those
* Creating a REST API with proper endpoint design
* Creating powerful web apps with React
* Global state management
* Using React hooks in an effective way
* The experimental View Transitions API (which is not actually used in the project, but I did spend a few weeks struggling to integrate it which is how you learn best)
* Deploying code into Docker containers
* Amazon Web Services platforms, such as RDS, EC2, and SSM Parameter Store
* NGINX and load balancer configuration
* CertOS Linux command line interface
* Security benefits of HTTPS
* Setting up custom domains, configuring SSL certification
* CI/CD considerations and automation
* How to make the best informed decisions when choosing web hosts
* How to apply software engineering principles (UML, ER diagrams, user stories, functional requirements) to a personal project and actually finish it :)

## About
This project and all content related to it is developed fully by Alex Taveras-Crespo. Thanks for reading!
 
