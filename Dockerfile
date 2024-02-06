ARG NODE_IMAGE=node:20-alpine3.18

FROM $NODE_IMAGE as builder

WORKDIR /app

RUN curl -o- -L https://yarnpkg.com/install.sh | sh

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN node ace build \
    --ignore-ts-errors \
    && cd build \
    && yarn install --frozen-lockfile --production

FROM node:20-alpine3.18

ARG APP_RELEASE

ENV APP_RELEASE=$APP_RELEASE
ENV HOST=0.0.0.0
ENV PORT=51000

WORKDIR /app

COPY --from=builder /app/build .

EXPOSE 51000

CMD ["node", "bin/server.js"]


