# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:16-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Copy local code to the container image.
COPY . ./

# Install production dependencies.
RUN npm install -g npm
RUN npm install --only=production
RUN npm install typescript
RUN npm run build

EXPOSE $PORT

# Run the web service on container startup.
CMD [ "npm", "start" ]