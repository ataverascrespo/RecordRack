# Album API

Part of an on-going full stack development project.

The goal of this project was to build a minimal web API using the ASP.NET 7 framework in C#. This API performs CRUD operations through HTTP request methods, including GET, POST, PUT and DELETE. 

Although this is a minimalistic API, an important aspect I focused during development was being consistent in my application of good coding practices and real-world concepts, including: 

### Model-View-Controller Architecture
* An architectural pattern that focuses on structuring and dividing program logic; the "model" represents the data entities that interact with the user interface. The "controller" acts as a middle-man between the model and user interface, retrieving both client requests and model data as needed. 

### Dependency Injection
* A design pattern that makes classes rely on abstractions rather than hard-coded implementations. These loosely-coupled components have improved testability, stronger reusability, and easier maintainability. 

### Data Transfer Objects
* These objects are used to transfer data between application layers. In a simpler sense, the API uses DTOs to pass data between the model, controller and view. 

### Asynchronous Calls
* The API service and controller methods are written in an asynchronous manner. Tasks are performed concurrently which improves performance and response time by avoiding sequential bottlenecks.


# About

When coming to a decision for my framework of choice, I ruled out Django and Node.js because I like the type safety and reliability of statically-typed languages like Java and C#. 

With the luxury of choosing between two of my strongest languages, Java/Spring or C#/ ASP.NET 7, I ultimately chose ASP.NET 7 over Spring. Even though I have more experience with Java, and Spring's open-source ecosystem is larger, Microsoft's documentation is structured well for a learning experience. 

This project is developed fully by Alex Taveras-Crespo.

