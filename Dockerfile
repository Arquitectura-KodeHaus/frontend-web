# ====== 1) Build (Node) ======
FROM node:20-alpine AS build
WORKDIR /app

# Dependencias con buen caching
COPY package*.json ./
RUN npm ci

# Copia el código y construye (Angular CLI se ejecuta vía npm script)
COPY . .
# Si tu script se llama distinto, ajústalo (por defecto: "build": "ng build")
RUN npm run build

# ====== 2) Runtime (Nginx) ======
FROM nginx:alpine
# Config Nginx para SPA Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Angular genera /dist/<nombre-app>; el wildcard cubre cualquier nombre
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
