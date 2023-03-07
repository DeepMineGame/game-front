FROM node:16.13.2-alpine as builder

WORKDIR /app
ARG UBS_URL
ARG MAINNET
ARG BETA

COPY package*.json ./
RUN npm ci

COPY . /app
RUN REACT_APP_UBS_ORIGIN=${UBS_URL} REACT_APP_MAINNET=${MAINNET}  REACT_APP_BETA=${BETA} npm run build


FROM nginx:1.16.0-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY ./docker/nginx.conf /etc/nginx/conf.d
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]