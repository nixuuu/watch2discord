FROM node:17.7-alpine3.15 as base
RUN npm i -g pnpm
WORKDIR /app

FROM base as deps
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile --prod --no-optional

FROM base as app
COPY --from=deps /app/node_modules /app/node_modules
COPY dist/ .
CMD ["node", "main.js"]
