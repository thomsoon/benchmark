FROM golang:1.17

COPY go.mod /app/go.mod
COPY go.sum /app/go.sum
WORKDIR /app

RUN go mod download

COPY . /app

CMD ["go", "run", "benchmark.go"]