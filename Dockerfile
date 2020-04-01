FROM node:12.16.1
COPY . /app
WORKDIR /app
RUN npm run build
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]