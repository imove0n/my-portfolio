# Design System Migration Guide

## Overview
This portfolio now uses a comprehensive **Design Token System** for consistency, maintainability, and easier theming.

---

## What Changed?

### ✅ Created Files
1. **`styles/design-tokens.css`** - Complete design token system
2. **`styles/portfolio.css`** - Portfolio-specific styles using tokens
3. **`DESIGN-SYSTEM-GUIDE.md`** - This documentation

### ✅ Updated Files
1. **`styles/globals.css`** - Now imports design tokens and uses them
2. **`pages/_app.js`** - Imports portfolio.css and uses design tokens

---

## Design Token Categories

### 1. Spacing Scale (8px base unit)
```css
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 1.5rem;    /* 24px */
--space-lg: 2rem;      /* 32px */
--space-xl: 2.5rem;    /* 40px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
--space-4xl: 5rem;     /* 80px */
```

**Usage:**
```css
/* ❌ Before */
padding: 1.5rem;
margin-bottom: 2rem;

/* ✅ After */
padding: var(--space-md);
margin-bottom: var(--space-lg);
```

---

### 2. Border Radius Scale
```css
--radius-xs: 0.25rem;  /* 4px - tags, badges */
--radius-sm: 0.5rem;   /* 8px - buttons, inputs */
--radius-md: 0.75rem;  /* 12px - small cards */
--radius-lg: 1rem;     /* 16px - cards, containers */
--radius-xl: 1.5rem;   /* 24px - major sections */
--radius-full: 50%;    /* circular elements */
```

**Usage:**
```css
/* ❌ Before */
border-radius: 8px;
border-radius: 16px;

/* ✅ After */
border-radius: var(--radius-sm);
border-radius: var(--radius-lg);
```

---

### 3. Typography Scale
```css
--font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);   /* 12-14px */
--font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);     /* 14-16px */
--font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);   /* 16-18px */
--font-size-md: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);    /* 18-20px */
--font-size-lg: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);     /* 20-24px */
--font-size-xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);           /* 24-32px */
--font-size-2xl: clamp(2rem, 1.5rem + 2.5vw, 2.5rem);        /* 32-40px */
--font-size-3xl: clamp(2.5rem, 2rem + 2.5vw, 3rem);          /* 40-48px */
--font-size-4xl: clamp(3rem, 2.5rem + 2.5vw, 4rem);          /* 48-64px */
```

**Font Weights:**
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

**Line Heights:**
```css
--line-height-tight: 1.2;      /* Headings */
--line-height-snug: 1.375;     /* Subheadings */
--line-height-normal: 1.5;     /* Body text */
--line-height-relaxed: 1.625;  /* Readable paragraphs */
--line-height-loose: 1.75;     /* Very readable text */
```

**Usage:**
```css
/* ❌ Before */
font-size: 2.2rem;
font-weight: 700;
line-height: 1.6;

/* ✅ After */
font-size: var(--font-size-3xl);
font-weight: var(--font-weight-bold);
line-height: var(--line-height-normal);
```

---

### 4. Shadow System
```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
--shadow-md: 0 8px 24px 0 rgba(0, 0, 0, 0.15);
--shadow-lg: 0 16px 48px 0 rgba(0, 0, 0, 0.2);
--shadow-xl: 0 24px 64px 0 rgba(0, 0, 0, 0.25);

/* Glow shadows (theme-aware) */
--shadow-glow-sm: 0 0 10px rgba(14, 165, 233, 0.3);
--shadow-glow-md: 0 0 20px rgba(14, 165, 233, 0.4);
--shadow-glow-lg: 0 0 30px rgba(14, 165, 233, 0.5);
--shadow-glow-xl: 0 0 40px rgba(14, 165, 233, 0.6);

/* Inset shadows */
--shadow-inner-sm: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
--shadow-inner-md: inset 0 4px 8px 0 rgba(0, 0, 0, 0.1);
```

**Usage:**
```css
/* ❌ Before */
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
box-shadow: 0 0 20px rgba(14, 165, 233, 0.5);

/* ✅ After */
box-shadow: var(--shadow-md);
box-shadow: var(--shadow-glow-lg);
```

---

### 5. Animation Timing
```css
--duration-instant: 0.1s;
--duration-fast: 0.2s;
--duration-normal: 0.3s;
--duration-slow: 0.5s;
--duration-slower: 0.8s;
--duration-epic: 1.2s;

/* Easing functions */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.6, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Usage:**
```css
/* ❌ Before */
transition: all 0.3s ease;
animation: fadeIn 1s ease-out;

/* ✅ After */
transition: all var(--duration-normal) var(--ease-standard);
animation: fadeIn var(--duration-epic) var(--ease-out);
```

---

### 6. Color System

#### Color Tokens (Theme-aware)
```css
/* Primary colors */
--color-primary
--color-primary-dark
--color-primary-light

/* Text colors */
--color-text-primary
--color-text-secondary
--color-text-tertiary
--color-text-inverse

/* Background colors */
--color-bg-primary
--color-bg-secondary
--color-bg-tertiary
--color-bg-overlay

/* Border colors */
--color-border-primary
--color-border-secondary
--color-border-accent

/* Semantic colors */
--color-success, --color-success-dark, --color-success-light
--color-error, --color-error-dark, --color-error-light
--color-warning, --color-warning-dark, --color-warning-light
--color-info, --color-info-dark, --color-info-light
```

**Usage:**
```css
/* ❌ Before */
color: #0ea5e9;
background: #1e293b;
border: 1px solid rgba(148, 163, 184, 0.2);

/* ✅ After */
color: var(--color-primary);
background: var(--color-bg-secondary);
border: 1px solid var(--color-border-primary);
```

---

### 7. Gradients
```css
--gradient-primary: linear-gradient(135deg, var(--color-primary), var(--color-accent));
--gradient-hero: linear-gradient(135deg, #ffffff, var(--color-primary), var(--color-accent-purple));
--gradient-card: linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-primary));
--gradient-border: linear-gradient(90deg, var(--color-primary), var(--color-accent));
```

---

### 8. Backdrop Filters (Glassmorphism)
```css
--blur-sm: blur(10px);
--blur-md: blur(20px);
--blur-lg: blur(30px);
--blur-xl: blur(40px);

--saturate-standard: saturate(180%);
--saturate-high: saturate(200%);
```

**Usage:**
```css
/* ❌ Before */
backdrop-filter: blur(20px) saturate(180%);

/* ✅ After */
backdrop-filter: var(--blur-md) var(--saturate-standard);
```

---

### 9. Z-Index Scale
```css
--z-base: 1;
--z-dropdown: 100;
--z-sticky: 500;
--z-fixed: 1000;
--z-modal: 1500;
--z-popover: 2000;
--z-tooltip: 3000;
```

---

## Theme System

### How Themes Work
The design token system supports **three themes**:

1. **Original** (default) - Dark blue cyberpunk aesthetic
2. **Dark** - Pure black high-contrast theme
3. **Light** - Clean white professional theme

Themes are applied via the `data-theme` attribute on the `<html>` or `<body>` element:

```javascript
// Set theme
document.documentElement.setAttribute('data-theme', 'dark');
// or
document.documentElement.setAttribute('data-theme', 'light');
// Remove attribute for original theme
document.documentElement.removeAttribute('data-theme');
```

### Updating Portfolio.js Theme Switcher

**Current approach (inline styles):**
```javascript
const [theme, setTheme] = useState('original');
// Inline styles use ternary: ${theme === 'light' ? 'white' : 'black'}
```

**New approach (data attributes):**
```javascript
const [theme, setTheme] = useState('original');

useEffect(() => {
  // Apply theme via data attribute
  if (theme === 'original') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}, [theme]);
```

Then remove inline style ternaries and let CSS handle it automatically.

---

## Reduced Motion Support

The design system now respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

All users who have enabled "Reduce Motion" in their OS will experience minimal animations.

---

## Migration Checklist for portfolio.js

### Step 1: Import the new CSS
✅ **DONE** - Added to `_app.js`

### Step 2: Replace hardcoded values
Use Find & Replace to convert inline styles:

**Spacing:**
- `padding: 1.5rem` → `padding: var(--space-md)`
- `margin-bottom: 2rem` → `margin-bottom: var(--space-lg)`
- `gap: 1rem` → `gap: var(--space-sm)`

**Border Radius:**
- `borderRadius: '8px'` → `borderRadius: 'var(--radius-sm)'`
- `borderRadius: '16px'` → `borderRadius: 'var(--radius-lg)'`

**Colors:**
- `color: '#0ea5e9'` → `color: 'var(--color-primary)'`
- `background: '#1e293b'` → `background: 'var(--color-bg-secondary)'`
- `color: '#f8fafc'` → `color: 'var(--color-text-primary)'`

**Shadows:**
- `boxShadow: '0 8px 24px rgba(0,0,0,0.15)'` → `boxShadow: 'var(--shadow-md)'`

**Transitions:**
- `transition: 'all 0.3s ease'` → `transition: 'all var(--duration-normal) var(--ease-standard)'`

### Step 3: Update theme switcher
Replace conditional inline styles with `data-theme` attribute switching.

### Step 4: Remove duplicate styles
Many styles are now in `portfolio.css`. Remove duplicate inline definitions.

---

## Utility Classes Available

You can now use these utility classes in your JSX:

**Spacing:**
```jsx
<div className="p-md">Padding medium</div>
<div className="m-lg">Margin large</div>
```

**Border Radius:**
```jsx
<div className="rounded-lg">Rounded large</div>
<div className="rounded-full">Circular</div>
```

**Shadows:**
```jsx
<div className="shadow-md">Medium shadow</div>
<div className="shadow-glow">Glow effect</div>
```

**Typography:**
```jsx
<p className="text-lg font-bold">Large bold text</p>
```

**Transitions:**
```jsx
<div className="transition-normal">Smooth transition</div>
```

---

## Benefits of This System

### 1. Consistency
All spacing, colors, shadows, and timing use the same scale.

### 2. Maintainability
Change a design token once, updates everywhere.

### 3. Theme Support
Switching themes now automatic - colors adapt instantly.

### 4. Performance
CSS variables are more performant than inline styles.

### 5. Accessibility
Built-in support for reduced motion and proper focus states.

### 6. Developer Experience
- Autocomplete in VS Code with IntelliSense
- Easy to understand semantic names
- Documented system

---

## Examples

### Before:
```jsx
<button style={{
  padding: '12px 20px',
  borderRadius: '8px',
  background: '#0ea5e9',
  color: 'white',
  fontSize: '1rem',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
}}>
  Click Me
</button>
```

### After:
```jsx
<button className="btn btn-primary">
  Click Me
</button>
```

Or with inline styles using tokens:
```jsx
<button style={{
  padding: 'var(--space-sm) var(--space-md)',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--color-primary)',
  color: 'white',
  fontSize: 'var(--font-size-base)',
  fontWeight: 'var(--font-weight-medium)',
  transition: 'all var(--duration-normal) var(--ease-standard)',
  boxShadow: 'var(--shadow-sm)'
}}>
  Click Me
</button>
```

---

## Next Steps

1. ✅ Design tokens created
2. ✅ Global styles updated
3. ✅ Portfolio.css created
4. ⏳ Update portfolio.js inline styles (in progress)
5. ⏳ Update theme switcher to use data-theme
6. ⏳ Optimize floating symbols (30 → 15)
7. ⏳ Test all three themes
8. ⏳ Test on mobile devices

---

## Questions?

For any issues or questions about the design system, refer to:
- `styles/design-tokens.css` - Full token definitions
- `styles/portfolio.css` - Component styles using tokens
- This guide - Usage documentation

Happy coding! 🎨
