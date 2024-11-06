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

Dans le cadre de ce test technique, j’ai utilisé les composants Angular Material, conformément à la consigne. Habituellement, je crée mes propres composants custom (qu’ils soient “dumb” ou “smart”) avec des thèmes dédiés, mais ici, j’ai appliqué Angular Material pour répondre aux attentes spécifiques de ce test.

J’ai pris en charge la gestion du responsive, optimisée autant que possible dans le contexte du projet. Même si ça reste assez simple, avec la collaboration d’un designer, le design pourrait être encore affiné pour garantir une expérience optimale. Ayant l’expérience des design systems, je suis à l’aise pour adapter le rendu visuel en fonction des besoins du projet et maintenir une cohérence esthétique.

Pour ce test, j’ai également intégré la nouvelle syntaxe de template Control Flow et les standalone components d’Angular, suite à la mise à jour d'une application vers la dernière version sur ma mission actuelle. Je maîtrise également la syntaxe legacy (avec ng-if, ng-for, etc.), ce qui me permet d’adapter le code aux différentes versions et aux standards les plus récents.

Bien que non demandé, j’ai développé et hébergé une API très simple en NestJS avec MongoDB pour fournir des données en temps réel et permettre un test complet de la solution.
Avec plus de temps, je pourrais approfondir la gestion des erreurs et des états de chargement lors de la création ou de l’édition de demandes pour une expérience utilisateur plus sympa.

Enfin, côté CSS, j’envisagerais la création d’un thème basé sur des variables CSS, pour centraliser la gestion des couleurs, des espacements, et éventuellement le dark mode, ce qui permettrait une adaptabilité et une cohérence visuelle accrues.

Au plaisir d’échanger davantage sur cette mission ! 🙂