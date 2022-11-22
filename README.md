> **NOTE**
>
> This microservice application uses a single database instance for all microservices.
> 
> Because my device will :boom::bomb::boom:

</br>

# Run application loopback rest-api/microservices

## Option 1 - use docker-compose (Recommend)

```bash
$ cd book-app

$ ./run.docker-compose.sh

# if cannot excute this file
$ chmod -R 777 run.docker-compose.sh
```

## Option 2 - use manual docker (Required docker login, Not Recomand)

```bash
$ cd book-app

$ ./run.docker.sh

# if cannot excute this file
$ chmod -R 777 run.docker.sh
```

# test 

```bash
$ curl localhost:3000

# or

$ curl 172.20.100.2:3000
# docker gateway ip
```

# swagger open-api

localhost:3000/book-app-api