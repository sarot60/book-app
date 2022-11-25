> **NOTE**
>
> This microservice application uses a single database instance for all microservices.

# Description

user init data = 10 users</br>
book init data = 10 books</br>
purchase order init data = 100 orders</br>

</br>

# Run application loopback rest-api/microservices

## Option 1 - use docker-compose (Recommend)

```bash
$ cd book-app

$ ./run.docker-compose.sh

#

# Optional
# if cannot excute this file
$ chmod -R 777 run.docker-compose.sh
```

## Option 2 - use manual docker (Required docker login, Not Recommand)

```bash
$ cd book-app

$ ./run.docker.sh

#

# Optional
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