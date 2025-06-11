# build from the root directory including server + shared so docker can access the shared types

FROM node:lts AS build
WORKDIR /app
# copy shared dir
COPY shared ./shared

WORKDIR /app/server
COPY server/package*.json .
RUN npm ci
COPY server .
RUN npm run build

FROM node:20-alpine
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/server/dist ./dist
EXPOSE 8080
CMD [ "npm", "run", "start" ]