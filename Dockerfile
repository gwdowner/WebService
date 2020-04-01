FROM node:12.16.1
COPY . /app
WORKDIR /app
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]