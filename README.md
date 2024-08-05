# Suitcase 3D editor

Suitcase 3D model editor built with Flask and Tailwind.

- **Tailwind CSS**

Tailwind CSS is a utility-first CSS framework that enables rapid UI development. Its utility classes make it easy to create responsive and custom-designed user interfaces without writing custom CSS.

- **Flask**

Flask is a lightweight and flexible web framework for Python. It provides tools and libraries for routing, template rendering, handling requests and responses,
database integration, form handling, authentication, and more.

## How to run

PIP install dependencies
`pip install -r requirements.txt`

Run the Flask server
`python app.py`

Install Tailwind via NPM
`npm install -D tailwindcss`

Compile and watch for changes for the Tailwind CSS
`npx tailwindcss -i ./static/css/style.css -o ./static/css/output-style.css --watch`

## App hosted on Vercel
https://syntax-tawny.vercel.app
