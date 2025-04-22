# Install dependencies only when needed
FROM node:18-alpine AS deps

# Create app directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./ 
RUN npm install

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
RUN npm run build

# Production image, copy all needed files and run app
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# If you use next/image or other static optimizations
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
