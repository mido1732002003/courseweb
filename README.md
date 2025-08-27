# Modern Courses Platform

A production-ready, free courses platform with video and PDF content, built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

## Features

- 🎓 Seven course sections: AI, Frontend, Backend, UI/UX, Graphic Design, ML, DL
- 📹 Video and PDF course content
- 🗺️ Learning roadmaps for each section
- 🔐 Authentication with email/password
- 📊 Progress tracking
- ⭐ Favorites system
- 🔍 Global search with filters
- 🌙 Dark/Light theme
- 📱 Fully responsive design
- ♿ Accessibility compliant
- 🚀 SEO optimized
- 📈 Analytics integration ready

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Custom JWT implementation
- **Validation:** Zod
- **Testing:** Jest & Testing Library

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database (local or cloud like Neon/Railway)
- Git

## Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/courses-platform.git
cd courses-platform
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` with your database credentials and secrets:
- `DATABASE_URL`: Your PostgreSQL connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `NEXT_PUBLIC_APP_URL`: Your application URL

4. Set up the database:
\`\`\`bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed the database with initial data
npm run prisma:seed
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database with sample data

## Project Structure

\`\`\`
src/
├── app/          # Next.js app router pages and API routes
├── components/   # React components organized by feature
├── lib/          # Utility functions and configurations
├── hooks/        # Custom React hooks
├── actions/      # Server actions
├── types/        # TypeScript type definitions
└── providers/    # React context providers
\`\`\`

## Default Admin Account

After seeding, you can login as admin with:
- Email: admin@example.com
- Password: SecureAdminPassword123!

**Important:** Change these credentials in production!

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app is configured to work with any Node.js hosting platform. Ensure you:
1. Set all environment variables
2. Run database migrations
3. Build the application
4. Start with `npm run start`

## Database Management

- View database: `npm run prisma:studio`
- Create migration: `npx prisma migrate dev --name your-migration-name`
- Apply migrations: `npm run prisma:migrate`
- Reset database: `npx prisma migrate reset`

## Testing

Run tests with:
\`\`\`bash
npm run test
npm run test:watch  # Watch mode
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- Passwords are hashed with bcrypt
- JWT tokens for authentication
- Input validation with Zod
- SQL injection protection via Prisma
- XSS protection headers
- Rate limiting on auth endpoints

## Performance

- Server-side rendering for SEO
- Image optimization with Next.js Image
- Lazy loading for heavy components
- Database query optimization
- Edge caching ready

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions, please use the GitHub issues page.
\`\`\`

### 15. robots.txt

```txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /dashboard
Disallow: /api
Sitemap: https://your-domain.com/sitemap.xml