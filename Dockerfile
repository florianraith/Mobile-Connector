FROM node:10.13-alpine AS build

LABEL maintainer "Florian Raith"

WORKDIR /usr/src/app

COPY ["package*.json", "./"]

RUN npm ci --silent

COPY . .

RUN npm run build && npm prune --production

FROM node:10.13-alpine

ENV NODE_ENV production
ENV PORT 8000

COPY --from=build /usr/src/app/node_modules node_modules
COPY --from=build /usr/src/app/dist dist
COPY --chown=node cert cert

EXPOSE $PORT

USER node

CMD ["node", "dist/app/index.js"]
