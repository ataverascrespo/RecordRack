
<h1 align="center"><a href="https://recordrack.ca">Record Rack</a></h1>
<p align="center">
 Record Rack allows you to curate a digital music collection, powered by Spotify's Web API.
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

## Change Notes (2024-07-18)
- Added functionality on API and client-side to allow for anonymous, logged out partial browsing. Logged out users can now view other users' Racklist pages, and view individual (non-private) records with some redacted info.
- Updated navigation bar layout on mobile and desktop, including active page highlighting and new labels for both logged in and logged out users
- Overhauled the social search UI, including scenarios such as invalid results, empty set, etc.
- Reworked dark/light mode toggle
- Updated some styling quirks for consistency

## Introduction

Welcome to Record Rack, a project I have been developing since late 2022. 

I love sharing my music taste with the people around me. But because people use such a wide variety of platforms (i.e Spotify, Apple Music, YouTube Music, Soundcloud, etc.) it can be hard to connect and share music tastes digitally. Record Rack is my solution to that problem!

Get started with Record Rack today, <a href="https://recordrack.ca/alextaveras2">you can view my own profile here</a> before getting started yourself!

## Demo

![](https://github.com/ataverascrespo/ataverascrespo/blob/main/recordrack_demo.gif)

Note: This demo .gif is outdated by a few months. The core functionality is the same, but <a href="https://recordrack.ca/alextaveras2">you should take a look at the app for yourself.</a>

## Technology Stack

<div class="flex flex-col">
  <h3>Front End - React, TypeScript, Tailwind CSS, MobX</h1> 
  
  <div class="flex flex-row">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="react" width="100"/>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png?20221110153201" alt="TypeScript" width="100"/>
    <img src="https://files.raycast.com/sjxs3pxsc6k63ju0fzv8l3cu4v90" alt="tailwindCSS" width="100"/>
    <img src="https://mobx.js.org/img/mobx.png" alt="MobxStateManagement" width="100"/>
  </div>
</div>

<div class="flex flex-col">
  <h3>Back End - .NET Core, C#, PostgreSQL</h1> 
  
  <div class="flex flex-row">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/2048px-.NET_Core_Logo.svg.png" alt=".NET" width="100"/>
    <img src="https://seeklogo.com/images/C/c-sharp-c-logo-02F17714BA-seeklogo.com.png" alt="C#" width="100"/>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" alt="PostgreSQL" width="100"/>
  </div>
</div>


<div class="flex flex-col">
  <h3>Deployment - Docker, NGINX, AWS EC2 and RDS</h1> 
  
  <div class="flex flex-row">
    <img src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/ywjqppks5ffcnbfjuttq" alt="Docker" width="100"/>
    <img src="https://managedserver.it/wp-content/uploads/2021/11/nginx.png" alt="NGINX" width="100"/>
    <img src="https://static-00.iconduck.com/assets.00/aws-icon-1024x1024-runl182z.png" alt="AWS" width="100"/>
  </div>
</div>

## About Record Rack
The following sections include some more in-depth documentation about the making of Record Rack!
### Front-end 

The front-end is built using React and TypeScript, styled using Tailwind CSS (with some customized components from the amazing Shadcn/ui library). I took the time to configure it as a Progressive Web App, meaning mobile users can download it to their devices and have a user experience like that of a platform-specific app.

As for global state management, Record Rack uses Mobx, which I ultimately chose over libraries such as Redux, Jotai and Zustand because of the built-in abstraction making the codebase a bit simpler, and because of my previous experience with similar libraries in Flutter.

### Back-end

The back-end consists of a REST API I built using the .NET Core 8 framework in C#. This API performs a variety of CRUD operations through HTTP request methods, including GET, POST, PUT and DELETE. These endpoints are securely locked behind OAuth 2.0 authorization, which is fulfilled by JSON Web Tokens in the form of refresh and access tokens. 

The API uses .NET Language Integrated Queries (LINQ) to insert, delete and retrieve app data from a PostgreSQL database, which is created and maintained by Entity Framework code-first migrations. 

The back-end also features third-party API integrations:
- Cloudinary API allows uploaded profile photos to be inserted into and retrieved from a storage bucket.
- Twillio Sendgrid API allows the app to send users emails regarding account verification/password resets.
- Spotify API allows users to search Spotify's database of albums, tracks, and artists. 

### Deployment

The front-end is hosted on Netlify because I think it's the easiest place to host any front-end website/web app. The .NET 8 API is deployed onto a Docker container. The Docker container is ran on an Amazon Web Services EC2 instance, which has been configured with NGINX as a reverse proxy and load balancer and SSL certification through Certbot. 

As for CI/CD, that is handled by Netlify on the front-end, and by GitHub Actions and AWS CodeDeploy on the back-end.

For the front-end, Netlify's integrated GitHub deployments make CI/CD easy - everytime I push a change to this repo, it automatically deploys a new build.

For the back-end, the GitHub pipeline builds and tests the API code, then calls the AWS CLI to create an AWS deployment. From there, CodeDeploy runs some custom Bash scripts to refresh the Docker image and restart the container. For more info, read [here](https://blog.alextaverascrespo.com/implementing-cicd-for-net-8-apis-on-aws-ec2-using-github-actions-and-docker).

On top of this, the PostgreSQL database is hosted on an Amazon Web Services RDS environment, and directly interfaces with my EC2 API container to store application data.

## Installing
Because Record Rack is open-source, feel free to report any issues or make contributions/PRs.

#### Frontend
To run dev environment
    
    cd client-app
    npm run dev

To build a prod version
    
    cd client-app
    npm run build

#### Backend
To run dev environment
    
    cd API
    dotnet watch run

To build a deployable version
    
    dotnet publish

## Testing
As of December 2023 I have written **66 API unit tests** and **24 frontend unit tests**. If there any new/existing test cases you want to contribute to, feel free do to so!

To run API tests: 
    
    cd APITests
    dotnet test

To run frontend tests: 
    
    cd client-app
    npm run test

## What I Learned

Since I am focused on being consistent in my application of good coding practices and real-world concepts, I have been able to learn and apply alot. Here's an (ongoing) list of some of the cool things I've learned, re-learned or re-inforced my knowledge of: 

* Model-View-Controller architecture 
* Dependency injection and properly decoupling classes
* Asynchronous programming
* JSON Web Token authentication and the security implications/solutions involved with those
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
* CI/CD automation
* How to make the best informed decisions when choosing web hosts
* How to apply software engineering principles (UML, ER diagrams, user stories, functional requirements) to a personal project and actually finish it :)

## About
This project and all content related to it is developed fully by Alex Taveras-Crespo. Thanks for reading!
 
