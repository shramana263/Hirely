FROM node:20-alpine

WORKDIR /app/krishanu/src

COPY package.json* /app/krishanu/src/

COPY /src /app/krishanu/src

COPY /public /app/krishanu/src/public

COPY . /app/krishanu/src/

RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "dev"]