# Local deployment

docker build -t my-nodejs-app .
docker run -dp 127.0.0.1:8080:8080 my-nodejs-app

Dont do this:
docker run -p 8080:8080 -v ${pwd}:/app my-nodejs-app


# Local run
npm run mole


Links:
localhost:8080
localhost:8080/lecturer