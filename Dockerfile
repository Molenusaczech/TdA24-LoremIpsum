FROM node:18

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install
# --omit=dev

ENV PORT=3000

EXPOSE 8080
EXPOSE 24678

COPY . .
ENV ENV=prod
CMD ["npm", "run", "mole"]
