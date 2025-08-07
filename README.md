# Full Stack Developer Portfolio

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and Node.js. Features a complete admin panel for content management and a contact form with email notifications.

## Features

### Frontend
- **Modern React App** with TypeScript and Vite
- **Responsive Design** using Tailwind CSS and DaisyUI
- **Smooth Animations** with Framer Motion
- **Dark/Light Theme** toggle with persistence
- **Dynamic Typing Animation** on homepage
- **Project Filtering** and categorization
- **Skills Showcase** with progress bars
- **Contact Form** with validation
- **YouTube Integration** for showcasing videos
- **SEO Optimized** with meta tags

### Backend
- **Express.js Server** with security middleware
- **JWT Authentication** for admin access
- **Contact Form Processing** with Nodemailer
- **Project Management API** for CRUD operations
- **Rate Limiting** and input validation
- **CORS Configuration** for cross-origin requests

### Admin Panel
- **Protected Routes** with JWT authentication
- **Project Management** (Create, Read, Update, Delete)
- **Image Upload Support** with URL validation
- **Technology Tag Management**
- **Project Categorization**
- **Dashboard Statistics**

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- DaisyUI
- Framer Motion
- React Router
- React Icons
- Axios

### Backend
- Node.js
- Express.js
- JWT (JSON Web Tokens)
- Nodemailer
- bcryptjs
- CORS
- Helmet (Security)
- Express Rate Limit

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Email account for SMTP (Gmail recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Copy environment file
   cp server/.env.example server/.env
   ```

4. **Configure Environment Variables**
   Edit `server/.env` with your actual values:
   ```env
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   RECIPIENT_EMAIL=your-email@gmail.com
   FRONTEND_URL=http://localhost:5173
   ```

### Running the Application

**Development Mode (Both Frontend & Backend):**
```bash
npm run dev:full
```

**Or run separately:**
```bash
# Frontend (React)
npm run dev

# Backend (Express) - in another terminal
npm run dev:server
```

**Production Build:**
```bash
npm run build
npm run server
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:5000`.

## Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate an App Password:
   - Go to Google Account settings
   - Security → App passwords
   - Generate password for "Mail"
3. Use the app password in `SMTP_PASS`

### Other Email Providers
Update the SMTP settings in `.env`:
- **Outlook**: `smtp-mail.outlook.com:587`
- **Yahoo**: `smtp.mail.yahoo.com:587`
- **Custom SMTP**: Use your provider's settings

## Admin Access

**Demo Credentials:**
- Email: `admin@demo.com`
- Password: `password123`

**Changing Admin Credentials:**
1. Hash your password using bcrypt
2. Update the `DEMO_ADMIN` object in `server/routes/admin.js`
3. Or implement proper user management with a database

## API Endpoints

### Public Routes
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/contact` - Send contact form

### Admin Routes (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Verify JWT token
- `GET /api/admin/projects` - Get all projects (admin)
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

## Project Structure

```
├── src/
│   ├── components/         # Reusable components
│   ├── contexts/          # React contexts
│   ├── pages/             # Page components
│   └── main.tsx           # App entry point
├── server/
│   ├── routes/            # Express routes
│   ├── middleware/        # Custom middleware
│   └── server.js          # Server entry point
├── public/                # Static assets
└── dist/                  # Production build
```

## Customization

### Personal Information
1. Update content in page components (`src/pages/`)
2. Replace placeholder images with your photos
3. Update social media links in `Footer.tsx`
4. Modify contact information in `Contact.tsx`

### Styling
1. Edit colors in `tailwind.config.js`
2. Update theme configuration for DaisyUI
3. Customize animations in component files

### Projects Data
1. Update mock data in `server/routes/projects.js`
2. Or integrate with a database (MongoDB/PostgreSQL)

## Deployment

### Frontend (Vercel)
1. Build the project: `npm run build`
2. Deploy `dist` folder to Vercel
3. Update API URLs for production

### Backend (Railway/Render)
1. Deploy `server` folder
2. Set environment variables
3. Update CORS origins

### Full Stack (Single Platform)
1. Use the production build setup
2. Serve frontend from Express server
3. Deploy entire project together

## Security Considerations

- Change default JWT secret
- Use strong admin passwords
- Implement rate limiting
- Validate all inputs
- Use HTTPS in production
- Keep dependencies updated

## License

MIT License - feel free to use this project as a template for your own portfolio!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

If you find this project helpful, please give it a ⭐ on GitHub!

For issues or questions, please open an issue in the repository.