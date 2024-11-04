# TEST CRUD Frontend Application

A modern Angular-based CRUD application for managing CRUD efficiently.

## Technologies Used

- Angular 18.2.5
- TypeScript
- Tailwind CSS
- Angular Material
- Angular Material Icons
- RxJS

## Prerequisites

- Node.js (Latest LTS version)
- npm package manager
- Angular CLI

## Installation

1. Install dependencies:

npm install


## Running the Application

1. Start the development server:

ng serve


2. Open your browser and navigate to `http://localhost:4200`

## Features

- Create, Read, Update, and Delete operations
- Layout with Tailwind CSS
- Material Design components
- Form validation
- Error handling
- Loading states
- New Control Flow template syntax

## Project Structure

```plaintext
src/
├── app/
│   ├── components/
│   ├── core/
│   │   ├── models/
│   │   └── services/
│   └── pages/
└──  styles/
```

## Testing

Run unit tests:

ng test


## Building for Production

ng build --prod

## Contact

For contact, email nelson.patrao@gmail.com.

## Notes

- J'utilise habituellement mes propres composants custom (dumb ou smart) au lieu des composants Material Design, mais j'ai utilisé les composants Material Design pour ce projet afin de démontrer l'utilisation d'Angular Material.

- Je voudrais également noter l'utilisation de la syntaxe de template Control Flow, car j'ai récemment mis à jour des applications web Angular vers la dernière version d'Angular et converti les templates vers la nouvelle syntaxe. Cependant, je maîtrise également l'utilisation de la syntaxe de template legacy avec les directives comme ng-if, ng-for, etc.

- Avec plus de temps, je peux aussi implémenter la gestion des erreurs et des états de chargement à la création ou l'édition d'une demande.

- Coté CSS, on peux se créer un theme avec des variables css, pour gérer les couleurs, les tailles, les espacements, le dark mode, etc ...

- Au plaisir d'échanger ! :)