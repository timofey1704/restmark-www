FROM node:20-alpine
WORKDIR /build
COPY . ./
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
