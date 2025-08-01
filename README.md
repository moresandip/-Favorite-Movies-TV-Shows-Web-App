# Favorite Movies & TV Shows Web Application

A full-stack web application for managing your favorite movies and TV shows with CRUD operations, infinite scrolling, search, filtering capabilities, and video playback.

## Features

### Core Features
- ✅ **Add New Entry**: Create new movie or TV show entries with detailed information
- ✅ **Display Entries**: View all entries in a responsive table format
- ✅ **Video Playback**: Stream movies and TV shows directly in the app
- ✅ **Infinite Scroll**: Automatically load more entries as you scroll down
- ✅ **Edit & Delete**: Update any detail of existing entries or remove them
- ✅ **Search & Filter**: Search by title, director, location and filter by type
- ✅ **Form Validation**: Client and server-side validation with error handling
- ✅ **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Video Features
- ✅ **Multiple Video Sources**: Support for direct video files (.mp4, .webm) and YouTube URLs
- ✅ **Custom Video Player**: Full-featured video player with play/pause, seek, volume control
- ✅ **YouTube Integration**: Embedded YouTube player for YouTube URLs
- ✅ **Fullscreen Support**: Watch videos in fullscreen mode
- ✅ **Video Controls**: Progress bar, volume slider, and playback controls
- ✅ **Auto-hide Controls**: Controls automatically hide during playback for immersive viewing

### Technical Features
- ✅ **RESTful API**: Complete CRUD operations with proper HTTP methods
- ✅ **Input Validation**: Schema validation using Zod-like validation
- ✅ **Error Handling**: Comprehensive error handling with user feedback
- ✅ **Modern UI**: Clean, modern interface using shadcn/ui components
- ✅ **TypeScript**: Full type safety throughout the application
- ✅ **Pagination**: Efficient data loading with pagination support

## Technology Stack

### Frontend
- **React 18** with Next.js 14 App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons

### Backend
- **Next.js API Routes** (Node.js/Express equivalent)
- **RESTful API** design
- **Input validation** with custom validation logic
- **Error handling** middleware

### Database
- **MySQL** schema provided (currently using mock data for demo)
- **Prisma-ready** structure for easy ORM integration

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MySQL (for production use)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd movies-tv-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Add your database connection string:
   \`\`\`
   DATABASE_URL="mysql://username:password@localhost:3306/movies_tv_db"
   \`\`\`

4. **Set up the database** (Optional - currently using mock data)
   \`\`\`bash
   # Run the SQL scripts in the scripts/ folder
   mysql -u username -p < scripts/database-schema.sql
   mysql -u username -p < scripts/seed-data.sql
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Movies/TV Shows
- `GET /api/entries` - Get all entries with pagination, search, and filtering
- `POST /api/entries` - Create a new entry
- `GET /api/entries/[id]` - Get a specific entry
- `PUT /api/entries/[id]` - Update an entry
- `DELETE /api/entries/[id]` - Delete an entry

### Query Parameters
- `page` - Page number for pagination (default: 1)
- `limit` - Number of items per page (default: 10)
- `search` - Search term for title, director, or location
- `type` - Filter by "Movie" or "TV Show"

## Database Schema

\`\`\`sql
CREATE TABLE movies_tv_shows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type ENUM('Movie', 'TV Show') NOT NULL,
    director VARCHAR(255) NOT NULL,
    budget VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    year_time VARCHAR(100) NOT NULL,
    genre VARCHAR(100),
    rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 10),
    description TEXT,
    video_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── api/entries/          # API routes
│   ├── components/           # React components
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/ui/           # shadcn/ui components
├── lib/                     # Utility functions
├── scripts/                 # Database scripts
└── README.md
\`\`\`

## Features in Detail

### Add/Edit Modal
- Comprehensive form with validation
- Support for all required and optional fields
- Real-time validation feedback
- Responsive design for mobile devices

### Data Table
- Infinite scroll implementation
- Search across multiple fields
- Type filtering (Movies/TV Shows)
- Responsive table design
- Action buttons for edit/delete

### Video Playback
- Support for direct video files (.mp4, .webm) and YouTube URLs
- Full-featured video player with play/pause, seek, volume control
- Embedded YouTube player for YouTube URLs
- Watch videos in fullscreen mode
- Progress bar, volume slider, and playback controls
- Controls automatically hide during playback for immersive viewing

### Validation
- Required field validation
- Type checking for ratings (0-10)
- Input sanitization
- Server-side validation

## Deployment

### Frontend (Vercel)
\`\`\`bash
npm run build
vercel --prod
\`\`\`

### Backend Database
- Set up MySQL on your preferred cloud provider
- Update environment variables
- Run migration scripts

## Future Enhancements

- [ ] User authentication (login/signup)
- [ ] Image upload for movie posters
- [ ] Advanced filtering (by genre, rating, year)
- [ ] Favorites and watchlist features
- [ ] Export functionality
- [ ] Dark mode toggle

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
