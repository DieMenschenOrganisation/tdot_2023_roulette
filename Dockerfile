FROM node:20-alpine3.16
COPY backend ./backend
COPY frontend ./frontend
COPY assets ./assets
WORKDIR ./frontend
RUN npm install
RUN npm run build
WORKDIR ../backend
RUN npm install
RUN npm install dotenv
RUN npm install ts-node-dev
CMD ["npm", "run", "dev"]