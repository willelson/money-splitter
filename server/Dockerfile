FROM node:20-alpine

WORKDIR /app

# Install dependencies first
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project after dependencies are installed
COPY . .

# Ensure TypeScript compiles
RUN npm run build

# Start the server && run mirations to ensure db tables are created
CMD ["sh", "-c", "npm run drizzle:migrate && node dist/server.js"]

EXPOSE 3000
