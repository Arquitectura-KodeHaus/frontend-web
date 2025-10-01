# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Ajusta "build" si tu script es diferente
RUN npm run build

# ---- Run stage (nginx) ----
FROM nginx:alpine
# elimina default.conf y agrega SPA fallback
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia artefactos (ajusta si tu carpeta es 'dist' o 'build')
COPY --from=build /app/dist /usr/share/nginx/html

# Cloud Run setea $PORT. nginx escucha 8080 por defecto, así que exponemos 8080
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
