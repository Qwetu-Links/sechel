# Étape 1 : Construction (Build)
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de configuration npm
COPY package*.json ./

# Installer toutes les dépendances (y compris de développement)
RUN npm ci

# Copier tout le reste du code
COPY . .

# Compiler l'application (Vite frontend + esbuild backend)
RUN npm run build

# Étape 2 : Production (Image allégée)
FROM node:20-alpine

WORKDIR /app

# Copier uniquement les fichiers de configuration
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm ci --omit=dev

# Copier les fichiers compilés depuis l'étape de build
COPY --from=builder /app/dist ./dist

# Variables d'environnement pour Cloud Run
ENV NODE_ENV=production
ENV PORT=8080

# Exposer le port attendu par Cloud Run
EXPOSE 8080

# Démarrer le serveur
CMD ["npm", "start"]
