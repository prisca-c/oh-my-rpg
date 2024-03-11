# Browser RPG Project

## Description

This is a project to create a browser RPG game.

## Installation

### Prerequisites

- [Node.js ( >= 20.\* )](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/)
- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [git](https://git-scm.com/)

### Steps

1. Clone the repository
   ```bash
   git clone https://github.com/prisca-c/adonis-rpg.git
   ```
2. Move to the project directory
   ```bash
   cd adonis-rpg
   ```
3. Set up the environment
   ```bash
   cp .env.example .env
   ```
4. Install the dependencies
   ```bash
   yarn install
   ```
5. Run Docker
   ```bash
   docker-compose up -d
   ```
6. Run the migrations
   ```bash
   node ace migration:run
   ```
7. Start the server
   ```bash
   node ace serve --watch
   ```
