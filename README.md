# Album API

Part of an on-going full stack development project.

The goal of this project was to build a minimal web API using the .NET 7 framework in C#. This API performs CRUD operations through HTTP request methods, including GET, POST, PUT and DELETE. 

Although this is a smaller, minimalistic API, an important aspect I focused during development was applying the best back-end coding practices and concepts, including: 

### Model-View-Controller Architecture
* An architectural pattern that focuses on structuring and dividing program logic; the "model" represents the data entities that interact with the user interface. The "controller" acts as a middle-man between the model and user interface, retrieving both client requests and model data as needed. 

### Dependency Injection
* A design pattern that makes classes rely on abstractions rather than hard-coded implementations. These loosely-coupled components have improved testability, stronger reusability, and easier maintainability. 

### Data Transfer Objects
* These objects are used to transfer data between application layers. In a simpler sense, the API uses DTOs to pass data between the model, controller and view. 

### Asynchronous Calls
* The API service and controller methods are written in an asynchronous manner. Tasks are performed concurrently which improves performance and response time by avoiding sequential bottlenecks.


# About
This project is developed fully by Alex Taveras-Crespo.
