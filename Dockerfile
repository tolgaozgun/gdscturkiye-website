# Set the base image to node:12-alpine
FROM node as build

# Specify where our app will live in the container
WORKDIR /app

# Copy the React App to the container
COPY . /app/

RUN echo "The value of VITE_BACKEND_URL is $VITE_BACKEND_URL"
RUN echo "The value of VITE_BASE_NAME is $VITE_BASE_NAME"
RUN echo "The value of TEST_VAR is $TEST_VAR"
# Prepare the container for building React
RUN npm install
# RUN npm install react-scripts@3.0.1 -g
# We want the production version
RUN npm run build

# Prepare nginx
FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Fire up nginx
CMD ["nginx", "-g", "daemon off;"]