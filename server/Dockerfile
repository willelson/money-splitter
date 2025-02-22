FROM node:20-alpine

WORKDIR /app

# Install dependencies first
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project after dependencies are installed
COPY . .

# Ensure TypeScript compiles
RUN npm run build

# Start the server
CMD ["node", "--experimental-specifier-resolution=node", "dist/server.js"]

EXPOSE 3000