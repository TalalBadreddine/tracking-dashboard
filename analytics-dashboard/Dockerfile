FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

COPY .env ./

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
