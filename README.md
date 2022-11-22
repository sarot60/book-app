> **NOTE**
>
> This application uses a single database instance for all microservices.

</br>

# Run application loopback rest-api/microservices

## Option 1 - use docker-compose (Recommend)

```bash
$ cd book-app

$ ./run.docker-compose.sh
```

## Option 2 - use docker

```bash
$ cd book-app

$ ./run.docker.sh
```

# test 

```bash
$ curl localhost:3000

# or

$ curl 172.20.100.2:3000
# docker gateway ip
```

# swagger

localhost:3000/book-app-api