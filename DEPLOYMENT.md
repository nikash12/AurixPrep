# 🚀 Deployment Guide for AurixPrep

This guide covers deploying AurixPrep to production environments with best practices for security, performance, and scalability.

## 🎯 Deployment Options

### 1. **Vercel (Recommended)**
- **Best for**: Next.js applications, automatic deployments
- **Pros**: Zero config, automatic HTTPS, edge functions, analytics
- **Cons**: Limited database options, vendor lock-in

### 2. **Railway**
- **Best for**: Full-stack apps with PostgreSQL
- **Pros**: Easy database setup, good free tier, simple deployment
- **Cons**: Limited customization

### 3. **DigitalOcean App Platform**
- **Best for**: Production apps with custom requirements
- **Pros**: Full control, managed databases, reasonable pricing
- **Cons**: More complex setup

### 4. **AWS/GCP/Azure**
- **Best for**: Enterprise applications, high scalability
- **Pros**: Maximum control, advanced features, global presence
- **Cons**: Complex setup, higher costs

## 🛠️ Pre-Deployment Checklist

### ✅ Security
- [ ] All passwords are hashed with bcrypt
- [ ] JWT_SECRET is a strong, random string (32+ characters)
- [ ] Environment variables are properly set
- [ ] Database connection uses SSL
- [ ] API rate limiting is enabled

### ✅ Database
- [ ] PostgreSQL database is set up and accessible
- [ ] Prisma migrations have been run
- [ ] Database connection string is correct
- [ ] Database has proper backups configured

### ✅ Environment Variables
- [ ] `DATABASE_URL` - Production database connection
- [ ] `GOOGLE_API_KEY` - Valid Gemini API key
- [ ] `JWT_SECRET` - Strong secret key
- [ ] `NODE_ENV` - Set to "production"

## 🚀 Vercel Deployment (Recommended)

### 1. **Prepare Your Repository**
```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. **Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository

### 3. **Configure Environment Variables**
In Vercel dashboard, add these environment variables:
```env
DATABASE_URL=your_production_database_url
GOOGLE_API_KEY=your_gemini_api_key
JWT_SECRET=your_strong_jwt_secret
NODE_ENV=production
```

### 4. **Database Setup**
- Use **Vercel Postgres** (recommended) or external PostgreSQL
- Run migrations: `npx prisma migrate deploy`
- Generate client: `npx prisma generate`

### 5. **Deploy**
- Vercel will automatically build and deploy
- Check build logs for any errors
- Test all functionality in production

## 🚂 Railway Deployment

### 1. **Setup Railway Account**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project

### 2. **Add Services**
1. **Add PostgreSQL Database**
   - Click "New Service" → "Database" → "PostgreSQL"
   - Note the connection details

2. **Add Web Service**
   - Click "New Service" → "GitHub Repo"
   - Connect your repository

### 3. **Configure Environment Variables**
```env
DATABASE_URL=railway_postgresql_url
GOOGLE_API_KEY=your_gemini_api_key
JWT_SECRET=your_strong_jwt_secret
NODE_ENV=production
```

### 4. **Deploy**
- Railway will automatically build and deploy
- Run database migrations in Railway console

## 🐳 Docker Deployment

### 1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. **Create docker-compose.yml**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/aurixprep
      - GOOGLE_API_KEY=${GOOGLE_API_KEY}
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=aurixprep
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### 3. **Deploy with Docker**
```bash
# Build and run
docker-compose up -d

# Run migrations
docker-compose exec app npx prisma migrate deploy
```

## 🔒 Production Security Checklist

### Environment Variables
- [ ] Use strong, unique JWT_SECRET (32+ characters)
- [ ] Enable database SSL connections
- [ ] Set NODE_ENV=production
- [ ] Use production Google API key

### Database Security
- [ ] Enable SSL connections
- [ ] Use strong database passwords
- [ ] Restrict database access to app servers only
- [ ] Enable automated backups

### Application Security
- [ ] Enable HTTPS everywhere
- [ ] Set secure cookies
- [ ] Implement proper CORS policies
- [ ] Enable rate limiting
- [ ] Add security headers

### Monitoring & Logging
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Configure application logging
- [ ] Set up performance monitoring
- [ ] Monitor API usage and errors

## 📊 Performance Optimization

### 1. **Database Optimization**
```sql
-- Add indexes for better performance
CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_session_userid ON "Session"(userId);
CREATE INDEX idx_question_sessionid ON "Question"(sessionId);
```

### 2. **Next.js Optimization**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react']
  },
  images: {
    domains: ['your-domain.com']
  },
  compress: true,
  poweredByHeader: false
}

module.exports = nextConfig
```

### 3. **Caching Strategy**
- Implement Redis for session storage
- Add API response caching
- Use CDN for static assets

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check DATABASE_URL format
   - Verify database is accessible
   - Check firewall settings

2. **JWT Errors**
   - Ensure JWT_SECRET is set
   - Check token expiration
   - Verify token format

3. **Build Errors**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

4. **API Errors**
   - Check environment variables
   - Verify Google API key is valid
   - Check rate limiting settings

## 📞 Support

If you encounter deployment issues:
1. Check the deployment logs
2. Verify environment variables
3. Test locally with production config
4. Open an issue on GitHub

---

**Happy Deploying! 🚀**
