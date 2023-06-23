FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

ENV PORT 8989
ENV DB_CONNECTION mongodb+srv://tranngochoai02051999:xkKnEryoJy99@ht-branch.7dyk31g.mongodb.net/test

EXPOSE 8989
CMD [ "npm", "start" ]