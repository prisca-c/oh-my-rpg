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
   - Move to the repository folder
   - Create a .env file based on the .env.example file
   - Run docker compose to build the images and start the containers
   - Run the migrations


2. b. **Pull the latest changes** (If you have already cloned the repository):
   - Use git to pull the latest changes
   - Run docker compose to build the images and start the containers
   - Run the migrations


3. **Setup the web server (Nginx or Apache)** *(If not already done)*:
   - Create a new server block
   - Add the server block to the sites-available folder
   - Enable the server block
   - Restart the web server


4. **Setup the SSL certificate** *(If not already done)*:
   - Run certbot to get the certificate
   - Update the server block to use the certificate
   - Restart the web server


5. **Setup the firewall** *(If not already done)*:
   - Allow the ports used by the web server
