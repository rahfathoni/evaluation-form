# Gunakan Node LTS versi ringan
FROM node:20-alpine

# Set working directory di container
WORKDIR /usr/src/app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file server ke container
COPY . .

# Expose port sesuai env PORT (default: 4000)
EXPOSE 4000

CMD ["npx", "ts-node", "src/index.ts"]