# AI-Powered Email Generator

A web application that leverages Django and LangChain to compose professional emails with help from large language models served through OpenRouter.

## Overview

Users enter the recipient's details, topic, tone, and purpose through a form. The app generates a complete email and automatically appends personalized sender information sourced from environment variables. Recent emails are logged for review and can be sent directly via Gmail.

## Key Features

- **Custom Email Generation:** Compose polished emails with adjustable tone and purpose using modern LLMs.
- **Personalized Signature:** Automatically append sender details such as name, email, phone, position, and affiliation.
- **Email Logs:** Store each generated email for easy review and retrieval.
- **Send via Gmail:** Convert a generated email into an actual message using Django’s `EmailMessage`.
- **Responsive UI:** Tailwind CSS powers the frontend styling.

## Tech Stack

- **Backend:** Django
- **AI/LLM:** LangChain (ChatOpenAI wrapper) with OpenRouter API for model access
- **Frontend:** Tailwind CSS
- **Database:** SQLite by default
- **Other Tools:** python-dotenv, Node.js for Tailwind setup

## Structure Overview

```
email_creator/
├── generator/             # Core Django app handling email logic
│   ├── views.py           # Generates emails, logs them, enables sending
│   ├── forms.py           # Forms for user input and Gmail sending
│   ├── models.py          # Email log model
│   ├── signals.py         # Logs each generated email
│   ├── templates/         # Django templates for UI
│   └── urls.py            # Routing for email generation, logs, and sending
├── manage.py              # Django management script
└── (optional) requirements.txt & .env for config
```

## Getting Started

1. Clone the repo and set up a Python virtual environment.
2. Install dependencies (`Django>=5.0`, `python-dotenv`, `langchain>=0.1.17`, `langchain-community`).
3. Create a `.env` with OpenRouter API keys and personal signature details.
4. Run migrations and launch the development server.

This project demonstrates full-stack development—combining backend logic, AI-powered text generation, and frontend styling—making it a strong portfolio piece for showcasing both web development and AI integration.
