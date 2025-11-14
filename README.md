# react-color-picker

A tiny accessible React color picker component for React + TypeScript.

Features
- Dropdown palette of default colors with keyboard support.
- Create and edit custom colors (hex, rgb, hsl, tint).
- Persist saved colors in localStorage.
- Minimal, framework-friendly API suitable for publishing as a library.

Install
```bash
npm install
```

Usage
```tsx
import React from 'react';
import { ColorPicker } from 'react-color-picker';

export default function Example() {
  const [color, setColor] = React.useState('#ff0000');
  return <ColorPicker value={color} onChange={(c) => setColor(c as string)} />;
}
```

API
- `ColorPicker` component — see source: [src/ColorPicker.tsx](src/ColorPicker.tsx)
  - Props: `value?: string | { Name: string; Value: string }`, `onChange?: (color: string | object) => void`, `label?: string`
  - Type definitions available in the source: [`ColorPickerProps`](src/ColorPicker.tsx)

Key files
- Component: [src/ColorPicker.tsx](src/ColorPicker.tsx)
- Modal editor: [src/ColorModal.tsx](src/ColorModal.tsx)
- Utility conversions: [src/colorUtils.ts](src/colorUtils.ts)
- Default palette: [src/defaultColors.tsx](src/defaultColors.tsx)
- UI primitives: [src/ui/Primitives.tsx](src/ui/Primitives.tsx)
- Local storage hook: [src/hooks/useLocalStorage.tsx](src/hooks/useLocalStorage.tsx)
- Demo: [demo/App.tsx](demo/App.tsx) and [demo/main.tsx](demo/main.tsx)
- Tests: [src/__tests__](src/__tests__/)

Development
```bash
# install deps
npm install

# run demo locally
npm run dev

# run tests
npm test

# build package (generates dist/)
npm run build
```

Notes
- The library exports a default `ColorPicker` from [src/index.ts](src/index.ts).
- Helpers for color conversions are in [src/colorUtils.ts](src/colorUtils.ts).
- Tests use Vitest and jsdom (see `vitest.config.ts`).

License
MIT — see LICENSE