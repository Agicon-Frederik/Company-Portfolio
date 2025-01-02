# Website Template

This is an open-source Portfolio website template built using TypeScript, Vite, Tailwind CSS, and Supabase as the backend database. Anyone can use this template to kickstart their web development projects.

![Preview](./images/preview.png)

## Features

- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Vite**: Next-generation frontend tooling for fast and optimized builds.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Supabase**: Open-source Firebase alternative for backend services.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Set up Supabase:
    - Create a new project in Supabase.
    - Copy the `supabaseUrl` and `supabaseKey` from your Supabase project settings.
    - Create a `.env` file in the root directory and add your Supabase credentials:
        ```env
        VITE_SUPABASE_URL=your-supabase-url
        VITE_SUPABASE_KEY=your-supabase-key
        ```

### Running the Development Server

Start the development server with the following command:
```sh
npm run dev
# or
yarn dev
```

### Building for Production

Build the project for production with the following command:
```sh
npm run build
# or
yarn build
```

### Deployment

Deploy the production build to your preferred hosting service.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is free for everyone.