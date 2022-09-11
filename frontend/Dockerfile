# this is where docker gets the node image from
FROM node:16.17

# code executes in the command line INSIDE the docker container
RUN mkdir -p /usr/app/
# -p just lets mkdir create a parent directory

# set your working directory so that . is now /usr/src/app
WORKDIR /usr/app

# this copies everything you need into from local into your docker container to start
COPY ./src ./src/
COPY ./public ./public/
COPY ./package*.json ./

RUN npm i

CMD ["npm", "start"]