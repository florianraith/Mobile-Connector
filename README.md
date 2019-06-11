# Mobile Connector

A simple web application written in node that allows you to connect with your desktop browser and mobile phone browser simultaneously in one channel. Then the orientation information of the mobile phone is sent in real time to the desktop, which then converts this information into a rotating cube.

Technologies used:

* [node.js](https://nodejs.org/en/) The backend Javascript-Runtime
* [express.js](https://expressjs.com/) The backend libary
* [socket.io](https://socket.io/) The real-time engine
* [axios](https://github.com/axios/axios) Promise based HTTP client for the browser and node.js
* [p5.js](https://p5js.org/) A processing port for Javascript, used for the 3D rotating cube
