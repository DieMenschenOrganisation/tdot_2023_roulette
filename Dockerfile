FROM node:20-alpine3.16
COPY backend ./backend
COPY mobile ./mobile
COPY main ./main
COPY assets ./assets
WORKDIR ./mobile
RUN npm install
RUN npm run build
WORKDIR ../main
RUN npm install
RUN npm run build
WORKDIR ../backend
RUN npm install
RUN npm install dotenv
RUN npm install ts-node-dev
CMD ["npm", "run", "dev"]