# How to deploy

This document explains how to deploy the application on a Linux server.

## Prerequisites
- A Linux server

## Steps
1. **Setup the server** *(If not already done)*:
   - Install docker
   - Install git
   - Install nginx or apache
   - Install certbot (for https)
   

2. a. **Clone the repository** (If you have not already done so):
   - Use git to clone the repository
      ```bash
      git clone https://github.com/prisca-c/adonis-rpg.git
      ```
   - Move to the repository folder
      ```bash
      cd adonis-rpg
      ```
   - Create a .env file based on the .env.example file
      ```bash
      cp .env.example .env
      ```
   - Run docker compose to build the images and start the containers
      ```bash
      docker-compose up -d
      ```
   - Run the migrations
      ```bash
      docker-compose exec adonis ace migration:run (--force if needed for CICD)
      ```


2. b. **Pull the latest changes** (If you have already cloned the repository):
   - Use git to pull the latest changes
      ```bash
      git pull
      ```
   - Run docker compose to build the images and start the containers
      ```bash
      docker-compose up -d
      ```
   - Run the migrations
      ```bash
      docker-compose exec adonis ace migration:run (--force if needed for CICD)
      ```


3. **Setup the web server (Nginx or Apache)** *(If not already done)*:
   - Create a new server block
   - Add the server block to the sites-available folder
   - Enable the server block
   - Restart the web server
     ```bash
     systemctl restart nginx
     ```


4. **Setup the SSL certificate** *(If not already done)*:
   - Run certbot to get the certificate
   - Update the server block to use the certificate
   - Restart the web server
     ```bash
     systemctl restart nginx
     ```


5. **Setup the firewall** *(If not already done)*:
   - Allow the ports used by the web server
