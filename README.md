# 🎯 AurixPrep - AI-Powered Interview Practice Platform

AurixPrep is a modern, AI-driven interview practice platform that helps job seekers master their interview skills through personalized questions, voice interaction, and real-time feedback. Built with Next.js 15, TypeScript, and powered by Google's Gemini AI.

## ✨ Features

- **🎤 Voice-Powered Practice** - Practice with AI-generated questions using text-to-speech technology for realistic interview experience
- **🧠 AI Feedback Analysis** - Get real-time analysis and feedback on your coding explanations and interview responses
- **🏆 Gamified Learning** - Level up your interview skills through engaging gamification and progress tracking
- **👤 Personalized Questions** - Receive tailored interview questions based on your unique profile and goals
- **🌍 Multi-language Support** - Available in multiple languages including English, Japanese, Hindi, Tamil, Spanish, French, German, Italian, Portuguese, and Russian
- **🎨 Modern UI/UX** - Beautiful, responsive design with dark/light theme support
- **📱 Responsive Design** - Works seamlessly across all devices

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Reliable relational database
- **Google Gemini AI** - Advanced AI question generation
- **JWT** - Secure authentication

### Development Tools
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing
- **Prisma Studio** - Database management

## 📁 Project Structure

```
AurixPrep/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── interview/     # Interview-related endpoints
│   │   ├── tts/          # Text-to-speech endpoints
│   │   └── user/         # User authentication endpoints
│   ├── auth/              # Authentication pages
│   ├── interview/         # Interview practice pages
│   └── profile/           # User profile pages
├── backend/               # Backend services
│   └── services/          # AI and business logic
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── sections/         # Page sections
│   └── interview/        # Interview-specific components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── prisma/               # Database schema and migrations
└── types/                # TypeScript type definitions
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database
- **Google Cloud** account with Gemini API access

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd AurixPrep
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/aurixprep"

# Google AI
GOOGLE_API_KEY="your-gemini-api-key"

# JWT Secret
JWT_SECRET="your-jwt-secret-key"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build and Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Start Production Server

```bash
npm start
# or
yarn start
```

## 📱 Usage

### 1. **Registration & Login**
- Create an account or sign in to access your personalized dashboard
- Secure authentication with JWT tokens

### 2. **Start Interview Practice**
- Choose your interview mode (HR, Technical, etc.)
- Select your preferred language
- Add a title and description for your practice session

### 3. **AI-Generated Questions**
- Receive personalized questions based on your profile
- Questions are generated using Google's Gemini AI
- Available in multiple languages

### 4. **Voice Interaction**
- Practice with text-to-speech questions
- Record your answers using the built-in audio recorder
- Get real-time feedback and analysis

### 5. **Track Progress**
- View your interview session history
- Monitor your improvement over time
- Access detailed session analytics

## 🔧 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/me` - Get current user info

### Interview Management
- `POST /api/interview/create` - Create new interview session
- `GET /api/interview/[sessionId]` - Get session details
- `POST /api/interview/[sessionId]/answer` - Submit answer
- `POST /api/interview/[sessionId]/end` - End session

### Text-to-Speech
- `POST /api/tts` - Generate speech from text
- `PUT /api/tts/update` - Update TTS settings

## 🎨 Customization

### Themes
The application supports both light and dark themes with automatic system preference detection.

### Styling
- Customize colors and components in `components/ui/`
- Modify animations in `components/animate-ui/`
- Update global styles in `app/globals.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent question generation
- **Next.js Team** for the amazing framework
- **Vercel** for deployment and hosting
- **Tailwind CSS** for the utility-first CSS approach
- **Radix UI** for accessible component primitives

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Contact the development team

---

**Made with ❤️ by the AurixPrep Team**

*Transform your interview skills with AI-powered practice and personalized feedback.*
