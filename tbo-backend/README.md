# nemi_bus

# Unit Testing

### `run all test`

The repository test need to connect to real db.
If we want to run all the test, we need to run the application and connect to **real db**.
(You can check the config/properites file to set a postgresDB)

### `run all tests without connect real db`
For the service test, we don't need to connect db.
We can disable repositrory test then run all the test.
Or we can just go to run specific service test.

#  The resource for test api(generate http request in intellij)

###
POST http://localhost:8080/api/nemi_v1/bus
Content-Type: application/json

{
"name":"supervivientes",
"location":"ho",
"client":"honduras",
"active":true
}

###
DELETE http://localhost:8080/api/nemi_v1/bus/1

###
PUT http://localhost:8080/api/nemi_v1/bus/3?name=Traveller_No1
Content-Type: application/json


###
GET http://localhost:8080/api/nemi_v1/bus

###
GET http://localhost:8080/api/nemi_v1/bus