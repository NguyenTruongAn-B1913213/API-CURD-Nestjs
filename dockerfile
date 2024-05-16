# Sử dụng base image Node.js
FROM node:17

# Set working directory
WORKDIR /app

# Copy package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy mã nguồn vào thư mục làm việc
COPY . .

# Expose port 3000
EXPOSE 3000

# Command để chạy ứng dụng
CMD ["npm", "run", "start:dev"]
