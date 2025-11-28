# 1. Base image
FROM node:20

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of the project
COPY . .

# 5. Expose gRPC port
EXPOSE 50052

# 6. Start the server
CMD ["node", "server.js"]
