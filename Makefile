db:
	docker-compose up -d

logs:
	docker-compose logs server

build:
	docker-compose up --build -d