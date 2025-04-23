# Walla Walla Neighborhood Observation - Project Documentation

This document explains the structure and setup of the Walla Walla Neighborhood Observation website project. The site uses a simplified MDX-based approach with direct component imports and CSS styling.

## Project Structure

The project follows this structure:

```
src/
├── App.tsx                    # Main application component
├── App.css                    # Styling for MDX content
├── components/                # Reusable components
│   ├── layout/                
│   │   └── Layout.tsx         # Main layout with sidebars
│   ├── charts/                # Chart components
│   │   └── CensusChart.tsx    # Example census data chart
│   ├── SideNote.tsx           # Side note component
│   └── ui/                    # UI components from shadcn
│       ├── card.tsx
│       └── ...
└── content/
    └── main.mdx               # Main content file written in MDX
```

## How It Works

This setup uses a simplified approach compared to traditional MDX Provider setups:

1. **Direct Imports**: Components are imported directly in the MDX file
2. **CSS Styling**: All MDX styling is handled through CSS classes in App.css
3. **Layout Structure**: The page layout is defined in Layout.tsx with sidebars
4. **Custom Components**: Create custom components as needed in the components folder

## Adding New Components

To add a new component (e.g., a chart for census data):

1. Create a new .tsx file in the appropriate folder (e.g., src/components/charts/CensusChart.tsx)
2. Import and use it directly in your MDX file

## Layout and Sidebars

The layout consists of:

- A header
- A main content area (where MDX content is rendered)
- Two sidebars (left and right)
- A footer

To modify the sidebars:

- Update the `LeftSidebar` and `RightSidebar` functions in `Layout.tsx`
- Use the `SideNote` component within your MDX content for content that should visually appear in the sidebar

## Example Components

### SideNote Component

Use this for adding notes to the sidebars:

```jsx
<div className="relative">
  Some text in your main content.
  <SideNote position="right">
    This note appears in the right sidebar.
  </SideNote>
</div>
```

### Census Chart Component

Here's how to use the example CensusChart component:

```jsx
import { CensusChart } from '../components/charts/CensusChart'

<CensusChart 
  title="Population by Age" 
  data={[
    { age: "0-18", count: 7250 },
    { age: "19-35", count: 9830 },
    { age: "36-55", count: 8450 },
    { age: "56+", count: 7470 }
  ]} 
/>
```

## Styling

All MDX styling is handled through CSS classes in `App.css`. This includes:

- Heading styles (h1, h2, h3)
- Paragraph and text styles
- List styling
- Code blocks
- Blockquotes
- Links

To modify the styling, simply update the corresponding classes in `App.css`.

## Creating New Pages

To create additional pages:

1. Add new MDX files in the content directory
2. Update the routing configuration if needed

## Best Practices

- Create focused, single-purpose components
- Use semantic HTML within your components
- Keep the MDX content focused on the narrative, with components for visualizations
- When adding complex components, create them in separate files rather than inline
- Use TypeScript interfaces for component props to ensure type safety