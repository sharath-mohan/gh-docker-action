FROM node:22-alpine



WORKDIR /app

RUN corepack enable

COPY package*.json .

RUN pnpm install

COPY . .

CMD [ "pnpm" , "start" ]

