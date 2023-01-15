# Record Rack

As someone who listens to a lot of music through different mediums (e.g Spotify, physical media like CDs and vinyl records, independent websites) I wanted to create a centralized application that would allow me to keep track of all the different music I listen to, instead of continuing to use the iPhone Notes app. 

![image](https://res.cloudinary.com/dlwfuryyz/image/upload/v1673813516/album-api/rack1_btg55m.jpg)

![image](https://res.cloudinary.com/dlwfuryyz/image/upload/v1673813515/album-api/rack2_uk9suh.jpg)

![image](https://res.cloudinary.com/dlwfuryyz/image/upload/v1673813515/album-api/viewalbum_mg3z1s.jpg)


## Front-end 

The front-end consists of a simple, static website that manages CRUD operations, built with:

* HTML
* CSS
* JavaScript

I chose to avoid frameworks because I think using anything else other than vanilla JS would have been overkill for this project. I didn't want to introduce too many framework dependencies when I knew I was able to do it vanilla. 

## Back-end

The back-end consists of a minimal web API using the ASP.NET 7 framework in C#. This API performs CRUD operations through HTTP request methods, including GET, POST, PUT and DELETE. 

The API is linked to a SQL database, created by Entity Framework code-first migrations, which saves the albums. 

Additionally, saved images from the client-side are uploaded to and retrieved from Cloudinary storage via API call.

## What I Learned

I learned alot by the time I finished Record Rack. Since I focused on being consistent in my application of good coding practices and real-world concepts, I was able to learn and apply new things such as:

* Model-View-Controller architecture 
* Dependency injection and properly decoupling classes
* Data Transfer Objects
* Asynchronous programming
* JSON Web Token authentication, and the security implications/solutions involved with it

## About
This project and all content related to it is developed fully by Alex Taveras-Crespo.

 
