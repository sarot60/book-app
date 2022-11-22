#!/bin/sh

if [ ! "$(docker network ls | grep api_microservice)" ]; then
    docker network create --subnet=172.20.0.0/16 api_microservice
else
    echo "api_microservice network exists."
fi

# mongodb
docker build -t nestjs-mongodb:prod -f ./mongodb/Dockerfile .
docker run -d \
    -p 27017:27017 \
    --restart always \
    --net api_microservice \
    --ip 172.20.100.10 \
    --name nestjs-mongodb \
    nestjs-mongodb:prod

# redis
docker build -t nestjs-redis:prod -f ./redis/Dockerfile .
docker run -d \
    -p 6379:6379 \
    --restart always \
    --net api_microservice \
    --ip 172.20.100.3 \
    --name nestjs-redis \
    nestjs-redis:prod

# gateway
docker build -t nestjs-gateway:prod -f ./gateway/Dockerfile .
docker run -d \
    -p 3000:3000 \
    --restart always \
    --net api_microservice \
    --ip 172.20.100.2 \
    --name nestjs-gateway \
    nestjs-gateway:prod

# user service
docker build -t nestjs-user-service:prod -f ./user-service/Dockerfile .
docker run -d \
    -p 4001:4001 \
    --restart always \
    --net api_microservice \
    --ip 172.20.100.4 \
    --name nestjs-user-service \
    nestjs-user-service:prod

# book service
docker build -t nestjs-book-service:prod -f ./book-service/Dockerfile .
docker run -d \
    -p 4002:4002 \
    --restart always \
    --net api_microservice \
    --ip 172.20.100.5 \
    --name nestjs-book-service \
    nestjs-book-service:prod