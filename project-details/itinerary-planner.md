# Itinerary Planner

A full-stack travel planning web application built with Laravel 12 and a Tailwind CSS/Alpine.js front end. It helps travelers organize trips, plan activities, track budgets, and export itineraries.

## Features

- User authentication via Laravel Breeze for secure itinerary ownership
- Create, edit, delete, and view itineraries with date ranges, photos, and descriptions
- Map-based activity planning with draggable Leaflet markers
- Booking management for lodging and other reservations
- Group member tracking with notes and photos
- Budget tracking with category summaries and Chart.js visualizations
- Export itineraries and budgets to Excel and PDF
- Dashboard with search and date filters
- Dark/Light theme with responsive Tailwind UI

## Architecture

- Controllers: ItineraryController, ActivityController, BookingController, GroupMemberController, BudgetEntryController, DashboardController
- Models: Itinerary, Activity, Booking, BudgetEntry, GroupMember, User
- Exports: ItineraryExport using maatwebsite/excel
- Front end: Tailwind CSS, Alpine.js, Vite
- Mapping: Leaflet
- Charts: Chart.js

## Technology Stack

| Layer | Tools |
| --- | --- |
| Framework | Laravel 12 |
| Frontend | Tailwind CSS, Alpine.js, Vite |
| Mapping | Leaflet |
| Charts | Chart.js |
| Export | maatwebsite/excel, barryvdh/laravel-dompdf |
| Auth | Laravel Breeze |
| Database | MySQL |

## Status

Ongoing personal project for exploring Laravel and full-stack development.

## Repository

[GitHub - Seanneskie/itinerary-planner](https://github.com/Seanneskie/itinerary-planner)
