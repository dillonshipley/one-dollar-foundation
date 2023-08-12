# Use an Alpine-based Node.js 18 image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy all the project files into the container
COPY . .

# Install the serve package globally
RUN yarn global add serve

# Build the production version of your app
RUN yarn install --production
RUN yarn build

# Set the command to start the serve package
CMD ["serve", "-s", "build", "-l", "3000"]  # Adjust the port as needed

ENV PORT=3000
EXPOSE ${PORT}