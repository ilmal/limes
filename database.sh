sudo docker run --name cine-mate -p 5432:5432 \
    -e POSTGRES_PASSWORD=mate \
    -e POSTGRES_DB=cine-mate \
    -e POSTGRES_USER=cine \
    -v ./mnt/cine-mate/:/var/lib/postgresql/data \
    postgres

sudo docker rm cine-mate

# postgres://cine:mate@localhost:5432/cine-mate
