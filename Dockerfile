ARG NODE_IMAGE=node:23

FROM $NODE_IMAGE as base

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

COPY . .

FROM base as deps

RUN corepack enable

RUN yarn install --immutable

FROM deps as builder

RUN node ace build \
    --ignore-ts-errors \
    && cd build \
    && yarn install --immutable --production

FROM $NODE_IMAGE as release

ARG APP_RELEASE

ENV APP_RELEASE=$APP_RELEASE
ENV HOST=0.0.0.0
ENV PORT=3333

WORKDIR /app

COPY --from=builder /app/build .

EXPOSE 3333

CMD ["node", "bin/server.js"]


