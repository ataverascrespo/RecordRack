# Record Rack - v1.0.0-beta
### Record Rack can be accessed and used at https://recordrack.netlify.app/

Forecasted changes in next release:
 - Account functionality overhaul (change to e-mail, forgot password requests)
 - More mobile compatability

## Table of Contents
  - [Background](#background)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
  - [What I Learned](#what-i-learned)
  - [About](#about)

## Background

I made Record Rack because I listen to a lot of music through different mediums (e.g Spotify, physical media like CDs and vinyl records, independent websites). I wanted to create a centralized application that would allow me to keep track of all the different music I listen to, instead of just using the Notes app on my phone. I also wanted to run it for cheap (less than $5 a month).

## Front-end 

The front-end consists of a minimal website built with HTML, CSS and JavaScript. It allows users to interact with a REST API that manages CRUD operations. Users can add, edit, delete and view the albums in their rack. 

Using three.js libraries, I was able to create and display animated graphics using WebGL. I added interactive 3D models such as a record disk* and a custom 3D model of the currently-viewed album, which resembles album cover sleeve packaging.  

The front-end also features Spotify API integration. This allows users to enter a Spotify URL when adding an album, which will auto-fill the available fields and auto-download the album cover in .jpg format from the Spotify servers.

### Front-end Deployment
I am using Netlify to host Record Rack's front-end. I chose Netlify because of the simplicity and powerful CI/CD architecture for deployment. I also used Netlify serverless Lambda functions in order to make a service call so that I could retrieve the Spotify API secret key. 

## Back-end

The back-end consists of a RESTful Web API using the .NET Core 7 framework in C#. This API performs CRUD operations through HTTP request methods, including GET, POST, PUT and DELETE. These endpoints are locked behind OAuth 2.0 authorization, which is fulfilled with JSON Web Token authentication.

The API is linked to a PostgreSQL database, created by Entity Framework code-first migrations, which saves the albums. 

Additionally, saved images from the client-side are uploaded to and retrieved from a Cloudinary storage bucket via an API service call. 

### Back-end Deployment
My .NET 7 API is packed and deployed into a Docker container. This Docker container is stored and ran on an Amazon Web Services Elastic Cloud Compute (EC2) instance. This API runs on a custom domain with an SSL certification for maximum security. I setup NGINX as a reverse proxy for my EC2 Container, and used Certbot to configure SSL certificates on my domain so that HTTPS encryption could be guaranteed. 

My PostgreSQL database is hosted on Amazon Web Services RDS environment, and directly interfaces with my EC2 container to store application data.

## What I Learned

Since I focused on being consistent in my application of good coding practices and real-world concepts, I was able to learn and apply new things such as:

* Model-View-Controller architecture 
* Dependency injection and properly decoupling classes
* Data Transfer Objects
* Asynchronous programming
* JSON Web Token authentication, and the security implications/solutions involved with it
* RESTful API integration
* Lambda Functions
* Docker containers
* Amazon Web Services platforms, such as RDS, EC2, and SSM Parameter Store
* NGINX and load balancer configuration
* CertOS Linux command line interface
* Security benefits of HTTPS
* SSL certification
* Custom domain setup
* CI/CD considerations and automation
* WebGL integration on a functioning web-app
* How to actually finish a personal project

## About
This project and all content related to it is developed fully by Alex Taveras-Crespo. Thanks for reading!

*3D Record Model acquired from https://sketchfab.com/3d-models/anisotropic-record-test-3e1325d9cc6349a085b79d0413c1d36f
 
