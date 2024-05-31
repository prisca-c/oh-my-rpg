ARG NODE_IMAGE=node:20.13.1-alpine3.18

FROM $NODE_IMAGE as base

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

COPY . .

FROM base as deps

RUN curl -o- -L https://yarnpkg.com/install.sh | sh

RUN yarn install --frozen-lockfile

FROM deps as builder

RUN node ace build \
    --ignore-ts-errors \
    && cd build \
    && yarn install --frozen-lockfile --production

FROM node:20.13.1-alpine3.18

ARG APP_RELEASE

ENV APP_RELEASE=$APP_RELEASE
ENV HOST=0.0.0.0
ENV PORT=3333

WORKDIR /app

COPY --from=builder /app/build .

EXPOSE 3333

CMD ["node", "bin/server.js"]


