# Gunakan Node LTS versi ringan
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file client
COPY . .

# Set env variable default
ENV API_BASE_URL=http://localhost:4000/api

# Expose port default Next.js
EXPOSE 3000

# Jalankan Next.js dev server
CMD ["npm", "run", "dev"]
