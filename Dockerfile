# Set the base image to node:12-alpine
FROM node as build

# Specify where our app will live in the container
WORKDIR /app

# Copy the React App to the container
COPY . /app/

ARG VITE_BACKEND_URL_ARG
ARG VITE_BASE_NAME_ARG

RUN ECHO $VITE_BACKEND_URL_ARG
RUN ECHO $VITE_BASE_NAME_ARG

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL_ARG
ENV VITE_BASE_NAME=$VITE_BASE_NAME_ARG

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