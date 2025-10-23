# Tiger Iron - Auburn's 24/7 Gym

A modern, full-featured gym website built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Landing Page**: Full-screen hero with action imagery, features, testimonials, and CTAs
- **Membership Pricing**: Dynamic pricing plans loaded from database
- **Signup Flow**: Multi-step signup process with plan selection and account creation
- **Authentication**: Secure login/logout with Supabase Auth
- **Member Portal**: Profile management and membership details
- **Admin Dashboard**: View members, inquiries, and analytics with CSV export
- **Contact Form**: Form submissions stored in database
- **App Download**: Track app downloads by platform
- **Legal Pages**: Privacy policy and terms of service
- **Responsive Design**: Mobile-first design with dark theme and tiger orange accent

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Payments**: Stripe (integration ready)

## Prerequisites

- Node.js 18+ and npm
- Supabase account with project configured

## Environment Variables

The following environment variables are required in `.env`:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These are already configured in your `.env` file.

## Database Schema

The database includes the following tables:

- `plans` - Membership plan details
- `profiles` - User profiles (extends Supabase auth.users)
- `memberships` - User membership records
- `payments` - Payment transaction history
- `inquiries` - Contact form submissions
- `app_downloads` - App download tracking

All tables have Row Level Security (RLS) enabled with appropriate policies.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Database is already set up with initial migration

3. Default membership plans are automatically created

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── Hero.tsx        # Landing page hero
│   ├── Features.tsx    # Features section
│   ├── Testimonials.tsx # Testimonials section
│   └── CallToAction.tsx # CTA section
├── pages/              # Route pages
│   ├── Landing.tsx     # Home page
│   ├── Pricing.tsx     # Pricing page
│   ├── Signup.tsx      # Signup flow
│   ├── Login.tsx       # Login page
│   ├── Portal.tsx      # Member portal
│   ├── Admin.tsx       # Admin dashboard
│   ├── Contact.tsx     # Contact page
│   ├── AppDownload.tsx # App download page
│   ├── Privacy.tsx     # Privacy policy
│   └── Terms.tsx       # Terms of service
├── lib/                # Utilities
│   └── supabase.ts     # Supabase client & types
└── App.tsx             # Main app with routing
```

## Routes

- `/` - Landing page
- `/pricing` - Membership pricing
- `/signup` - Member signup (supports ?plan=slug)
- `/login` - Member login
- `/portal` - Member account portal (protected)
- `/admin` - Admin dashboard (protected, admin only)
- `/contact` - Contact form
- `/app` - App download page
- `/legal/privacy` - Privacy policy
- `/legal/terms` - Terms of service

## Admin Access

To create an admin user:

1. Sign up normally through the signup flow
2. Manually update the user's role in the database:
```sql
UPDATE profiles SET role = 'admin' WHERE id = 'user_id';
```

## Default Membership Plans

Two plans are created by default:

1. **$29/Month** - Month-to-month auto-renewing membership
2. **$39/Month** - 31-day contract membership

Plans can be managed through the admin interface (future enhancement) or directly in the database.

## Features Implementation Notes

### Authentication
- Email/password authentication via Supabase Auth
- Session management with automatic token refresh
- Protected routes for portal and admin pages

### Row Level Security
All database tables have RLS enabled:
- Members can only access their own data
- Admins have full access to all records
- Public can view active plans and submit inquiries

### App Download Tracking
Anonymous analytics tracking for app store clicks with platform, user agent, and referrer data.

### Contact Form
Submissions are stored in the database and can be exported as CSV from the admin dashboard.

## Stripe Integration

Stripe integration is referenced in the code but requires:
1. Stripe account and API keys
2. Environment variables: `VITE_STRIPE_PUBLISHABLE_KEY`
3. Webhook setup for subscription events
4. Supabase Edge Function for secure server-side processing

For full Stripe setup instructions, visit: https://bolt.new/setup/stripe

## Design System

- **Colors**:
  - Background: Black (#000000)
  - Text: White (#FFFFFF)
  - Accent: Tiger Orange (#FF6A00)
  - Secondary: Gray shades

- **Typography**:
  - Headings: Black/bold, uppercase, tight tracking
  - Body: Default sans-serif

- **Components**:
  - Buttons: Orange primary, white outline secondary
  - Cards: Dark gray with hover effects
  - Forms: Dark inputs with orange focus states

## Browser Support

Modern browsers supporting ES2020+ features.

## License

Proprietary - Tiger Iron Gym

## Support

For questions or support:
- Email: info@tigeriron.gym
- Phone: (555) 555-5555
- Location: 123 Auburn Ave, Auburn, AL 36830
