FROM node:20-alpine3.16
COPY server ./server
COPY mobile ./mobile
COPY main ./main
COPY assets ./assets
WORKDIR ./mobile
RUN npm install
RUN npm run build
WORKDIR ../main
RUN npm install
RUN npm run build
WORKDIR ../server
RUN npm install
CMD ["npm", "run", "dev"]