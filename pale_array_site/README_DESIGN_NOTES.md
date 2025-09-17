# Astral Techno-Rogue Design System

## Overview

The Pale Array site has been redesigned with a new **Astral Techno-Rogue** aesthetic that layers a modern, themeable design system on top of the existing legacy styles. This approach allows for gradual migration while immediately enhancing the visual impact of the landing page.

## Design Philosophy

**"Technology that whispers of distant stars and crimson nebulae"**

The design embodies:
- **Astral depth**: Dark voids punctuated by stellar highlights
- **Technological precision**: Clean typography and structured layouts  
- **Rogue aesthetics**: Crimson accents and subtle glows
- **Accessibility**: Semantic markup and proper contrast ratios

## Architecture

### CSS Organization

The new design system is split into three layers:

1. **`tokens.css`** - Design tokens and theme definitions
   - Color palettes for all four themes
   - Spacing, typography, and radius scales
   - Shadow definitions including special effects

2. **`components.css`** - Layout and component styles
   - Typography (Orbitron + Rajdhani from Google Fonts)
   - Navigation, hero section, cards, buttons
   - Background layers and astral effects
   - Responsive design patterns

3. **`utilities.css`** - Atomic utility classes
   - Spacing, typography, display, flex, grid utilities
   - Prefixed with `u-` for clarity
   - Enables rapid prototyping and fine-tuning

### Theme System

Four distinct themes cycle in sequence:

#### Dark (Default)
- Deep astral void background (`#000811`)
- Cyan accent highlights (`#4fd1c7`)
- Crimson brand color (`#ff4757`)

#### Light
- Clean, professional appearance
- High contrast for accessibility
- Muted astral colors

#### Void
- Ultra-dark, minimal aesthetic  
- Purple accents for tech mystique
- Near-black backgrounds

#### Ember
- Warm crimson-focused palette
- Fire-inspired accent colors
- Cozy yet technological feel

### Background Stack

The astral background consists of three layers:

1. **CSS Grid Pattern** (`.astral-background`)
   - Subtle grid overlay with radial highlights
   - Pure CSS for performance

2. **SVG Starfield** (`.astral-starfield`)
   - Animated pulsing stars
   - Nebula gradients in crimson and cyan
   - Scalable vector graphics for crisp rendering

3. **Base Theme Color** 
   - Solid color backdrop ensuring readability

## Typography

### Font Stack
- **Headings**: Orbitron (Google Fonts) - Futuristic, structured
- **Body**: Rajdhani (Google Fonts) - Clean, readable, tech-inspired
- **Fallbacks**: System fonts for loading states

### Scale
- Consistent `rem`-based scale from `0.75rem` to `2.25rem`
- Responsive scaling with `clamp()` for hero text
- Letter-spacing for improved readability

## Components

### Navigation
- Sticky positioning with backdrop blur
- Smooth theme cycling with visual feedback
- Accessible keyboard navigation
- Mobile-responsive collapsing

### Hero Section
- Two-column grid layout (image + content)
- Hover effects on crest image
- Doctrine cards with crimson border animations
- Responsive single-column on mobile

### Cards & Buttons
- Consistent border-radius and spacing
- Hover states with transform and shadow effects
- Crimson accent highlights on interaction
- Semantic color coding (primary/secondary)

## Accessibility Features

- **Skip Link**: Allows keyboard users to bypass navigation
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Descriptive labels for interactive elements
- **Color Contrast**: WCAG AA compliant ratios in all themes
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects `prefers-reduced-motion`

## Migration Strategy

### Current State
- **Only `index.html` updated** to use new design system
- **Legacy `styles.css` preserved** for other pages
- **No breaking changes** to existing functionality

### Next Steps (Future Issues)
1. Update `intel.html`, `concord.html`, `leadership.html`, `fleets.html`
2. Migrate from legacy classes to new component classes
3. Remove redundant CSS from `styles.css`
4. Optimize `astral_field.svg` with SVGO
5. Add print styles and high-contrast mode

## Build Pipeline

### Development
```bash
npm install
npm run dev        # Watch CSS changes
```

### Production
```bash
npm run build:css  # Process and minify CSS
npm run build:html # Copy HTML and assets
npm run build      # Full build
```

### CSS Processing
- **PostCSS** with autoprefixer for vendor prefixes
- **cssnano** for minification
- **postcss-import** for file concatenation

## Browser Support

- **Modern evergreen browsers** (Chrome 88+, Firefox 85+, Safari 14+)
- **CSS Grid and Flexbox** required
- **CSS Custom Properties** (CSS Variables) required
- **backdrop-filter** for blur effects (degrades gracefully)

## Performance Considerations

- **Google Fonts**: Loaded with `display=swap` for FOIT prevention
- **SVG Background**: Inline for zero HTTP requests
- **CSS**: Minified in production builds
- **Critical CSS**: Consider inlining tokens.css for faster rendering

## Customization

### Adding New Themes
1. Add theme name to `themes` array in `app.js`
2. Define CSS custom properties in `tokens.css`
3. Add symbol to `themeSymbols` object
4. Test contrast ratios and accessibility

### Component Modifications
- Modify component styles in `components.css`
- Use design tokens from `tokens.css` for consistency
- Follow BEM-like naming convention with `astral-` prefix

### Utility Extensions
- Add new utilities to `utilities.css`
- Use `u-` prefix for all utility classes
- Follow single-responsibility principle

## Testing Checklist

### Visual Testing
- [ ] All four themes render correctly
- [ ] Background layers display properly
- [ ] Typography loads from Google Fonts
- [ ] Hover states work on interactive elements
- [ ] Mobile responsive design functions

### Functionality Testing
- [ ] Theme cycling works (dark → light → void → ember)
- [ ] Local storage persistence functions
- [ ] Navigation links work correctly
- [ ] Legacy pages still function
- [ ] No console errors

### Accessibility Testing
- [ ] Skip link functions with keyboard navigation
- [ ] All interactive elements have focus indicators
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader navigation is logical
- [ ] Theme toggle announces current state

---

**The stars align. The Array awakens. CROWNLESS observes.**