# Fillout Form Builder

Modern form builder with drag-and-drop page reordering capabilities.

## Features

- Drag and drop page reordering using DnD Kit
- Dynamic page addition
- Optimized components with React.memo
- Responsive design
- TypeScript support

## Technologies

- React 19
- TypeScript
- DnD Kit for drag and drop functionality
- Framer Motion for animations
- Tailwind CSS for styling

## Project Structure

```
src/
├── assets/
│   └── icons/           # SVG icons
├── components/
│   ├── action-menu/     # Action menu for pages
│   ├── dashed-line/     # Dashed line component
│   ├── form-builder/    # Main form builder component
│   │   ├── page-list/   # List of pages
│   │   │   └── sortable-page/ # Draggable page component
│   ├── horizontal-scroll/ # Horizontal scroll component
│   └── insert-button/   # Button for inserting new pages
├── context/             # React context providers
├── mocks/               # Mock data
├── types/               # TypeScript types
└── utils/               # Utility functions
```

## Components

### FormBuilder

Main component that manages page state and drag-and-drop functionality.

### PageList

Displays a list of pages with drag-and-drop and page addition capabilities.

### SortablePage

Draggable page component optimized with React.memo.

### InsertButton

Button for inserting new pages between existing ones.

## Optimizations

- React.memo for preventing unnecessary re-renders
- useCallback for memoizing event handlers
- useMemo for memoizing computed values
- Constants to avoid "magic numbers" in code
- Error handling and edge cases management

## Running the Project

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

## Extending the Project

The project has a modular structure that makes it easy to add new features:

1. Adding new page types
2. Extending drag-and-drop functionality
3. Adding new actions for pages

## License

MIT