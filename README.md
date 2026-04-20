# Car Rental Management System

A modern, high-performance Car Rental Management System built with Next.js 14, Tailwind CSS, and Prisma.

## 🚀 Features

- **Dashboard**: Real-time statistics and recent booking activities.
- **Car Management**: Track fleet status, specifications, and daily rates.
- **Brand Management**: Manage car brands/manufacturers.
- **Booking System**: Automatic price calculation and status workflow.
- **Route Management**: Define origins, destinations, and base pricing.
- **Customer CRM**: Maintain customer records and identity details.
- **Payment Methods**: Manage accepted payment types.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with Glassmorphism
- **Database**: SQLite (Local)
- **ORM**: Prisma 6
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📦 Getting Started

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**:
   - Copy `.env.example` to `.env`
   - Ensure `DATABASE_URL` points to your local database file
4. **Database Migration**:
   ```bash
   npx prisma migrate dev
   ```
5. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🎨 Design

The application features a premium dark-themed "Glassmorphism" design system, ensuring a high-end feel for administrative management.

## 📄 License

This project is licensed under the MIT License.
