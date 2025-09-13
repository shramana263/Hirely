FROM node:20-alpine 
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3017

CMD ["npm", "run", "start", "--", "-p", "3017", "-H", "0.0.0.0"]






