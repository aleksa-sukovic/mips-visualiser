# MIPS Visualiser

MIPS processor visualisation.

## What is included

1.) Angular 8

2.) Tailwind CSS

3.) Docker configuration

## Allowed commands

1.) docker exec -it mips-visualiser ng test --watch=false

2.) docker exec -it mips-visualiser ng e2e --port 4201

3.) docker exec -it mips-visualiser bash

## Setup

1. Clone this repository wherever you see fit.
2. From terminal, navigate to cloned repository.
3. Run `docker-compose build`.
4. Run `docker-compose up`.
5. From host machine: `docker exec -it mips-visualiser bash`.
6. Run `npm i`.
7. Run `ng serve --host 0.0.0.0`.
8. Navigate to *http://localhost:4200*.
9. Upon next container initialization, command number 7. will be automatically run.
