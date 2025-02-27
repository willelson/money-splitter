
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and lock file, then install dependencies
COPY frontend/package.json frontend/package-lock.json ./frontend/

# Use a build argument to inject VITE_SERVER_URL
ARG VITE_SERVER_URL
ENV VITE_SERVER_URL=${VITE_SERVER_URL}

RUN cd frontend && npm install

# Copy frontend and server directories for type imports
COPY frontend ./frontend
COPY server ./server

# Build the server
RUN cd server && npm install && npm run build

# Build the frontend
RUN cd frontend && VITE_SERVER_URL=${VITE_SERVER_URL} npm run build

# Stage 2: Serve with Vite
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the built frontend and required files
COPY --from=builder /app/frontend/dist ./dist
COPY --from=builder /app/frontend/package.json ./package.json
COPY --from=builder /app/frontend/node_modules ./node_modules

# Expose the default Vite preview port
EXPOSE 4173

# Serve using Vite preview
CMD ["npm", "run", "preview", "--", "--host"]
