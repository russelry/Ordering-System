# Ordering-System
## Project description
This project was an exercise to show off my skills to create a simple API using Node.js and Express. I will keep working on this project even after school. I have many ideas to add on to this API. What I have to show is a couple major parts of the API. The first are enpoints that have to do with pizza related tasks and the seconded is the ordering system. Each of these are in the API folder. I am using docker to run my Mongo database and Node.js + Express to run the server.
## Future add-ons
In the future I would like the server to run in a docker container. I will be adding a docker script that will build everything needed for this API to run. I would also like to add a system for employees to clock in and clock out from. This will keep track of employee hours and each employee can view their own timecard. Adding a simple front in is also in the books. I might interfiew a couple employees from American Dream Pizza to see what they think should be added to their current POS system so that I can improve mine. Authentication is a must in my mind, so that will be the first thing that I will be adding to this API. 
## Starting the server
- You have to manually start up a docker database using MongoDB (This will change in the future)
- Run the command "npm run server" (This will change)
- The you can use go to localhost:{PORT_VALUE} and use the openapi.yaml script to view some documentation for how the API work

To start a docker server, run this command: 
docker run -d --name final-server            \
  --network final-net                    \
  -p "27017:27017"                        \
  -e "MONGO_INITDB_ROOT_USERNAME=root"            \
  -e "MONGO_INITDB_ROOT_PASSWORD=password"    \
  mongo:latest

Then run this command to launch into a mongo terminal:
docker run --rm -it                \
    --network final-net         \
    mongo:latest                \
    mongo --host final-server        \
        --username root        \
        --password password        \
        --authenticationDatabase admin

Once you are in MongoDB you need to create a database using this command "use ordering-database". You will have to configure the mongo.js file inside of the lib folder to match your mongo username, password, host, port, and database name. 


## Postman Collection
I have uploaded a postman collection and you can import the .json file into Postman and test some of my enpoints if you would like. Keep in mind that the server and the docker containter with the database has to be running as well. 
