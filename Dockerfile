FROM node:20-alpine

# Install pnpm using npm instead of corepack to avoid compatibility issues
RUN npm install -g pnpm@9.15.0

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of your app's source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the Next.js development server
CMD ["pnpm", "run", "dev"]
