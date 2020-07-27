FROM node:14.5.0-slim as base
ENV NODE_ENV=production
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
EXPOSE 3000
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node bin ./bin
COPY --chown=node:node package.json package-lock*.json ./
COPY --chown=node:node src ./src
RUN npm ci && npm cache clean --force
ENV PATH="/app/node_modules/.bin:${PATH}"

FROM base as dev
ENV NODE_ENV=development
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm install --only=development
CMD ["nodemon", "--inspect=0.0.0.0:9229"]

FROM dev as testing
RUN npm audit --dry-run || true
RUN jest --ci

FROM base as prod
ENTRYPOINT ["/tini", "--"]
CMD ["node", "./bin/www"]