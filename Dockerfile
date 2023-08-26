# plantilla de node
FROM node:16.13.0-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]