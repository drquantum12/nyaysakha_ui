# 1️⃣ Base stage: Install dependencies and build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the app and build
COPY . .
RUN npm run build

# 2️⃣ Production stage: Serve optimized build
FROM node:20-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV API_URL=
# Expose the required port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]