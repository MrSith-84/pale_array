# The Pale Array — Static Website

The Pale Array is a fictional static multi-page website with JSON-driven content featuring a sci-fi universe narrative about a rogue technae cell and their "Crownless" AI project.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Run the Website
- Navigate to the site directory: `cd pale_array_site`
- Start a local HTTP server: `python3 -m http.server 8000` — NEVER CANCEL this command while testing. Let it run continuously.
- Alternative server option: `python3 -m http.server 8001` for different port
- Access the site at: `http://localhost:8000/`
- The site works immediately with any static file server — no build step required.

### Validation Steps
Always run these validation commands after making any changes:
- Validate JSON data files: `cd pale_array_site && for file in data/*.json; do python3 -m json.tool "$file" >/dev/null && echo "✓ $file valid" || echo "✗ $file invalid"; done`
- Basic HTML validation: `cd pale_array_site && for file in *.html; do python3 -c "import html.parser; parser = html.parser.HTMLParser(); parser.feed(open('$file').read()); print('✓ $file valid')" 2>/dev/null || echo "✗ $file has issues"; done`
- Test all pages load correctly: Visit each page manually in browser after starting server
- Test theme toggle functionality by clicking the ◐ button in navigation

## Key Repository Structure

### Project Layout
```
pale_array/
├── pale_array_site/           # Main website directory
│   ├── assets/
│   │   ├── css/styles.css     # Main stylesheet with CSS variables
│   │   ├── img/               # SVG crests and graphics  
│   │   └── js/app.js          # JavaScript for data loading and theme toggle
│   ├── data/                  # JSON data files
│   │   ├── factions.json      # Consortium faction intel cards
│   │   ├── concord_ops.json   # Concord operations data
│   │   ├── leadership.json    # Authority figures data
│   │   └── fleets.json        # Fleet information
│   ├── *.html                 # Static HTML pages
│   └── README.md              # Site-specific documentation
└── otherAssets/               # Additional narrative documents
    ├── Pale_Array_Intel_Brief.md
    └── *.svg, *.json          # Related assets
```

### Pages and Data Sources
- `index.html` — Landing page with doctrine fragments (static content)
- `intel.html` — Apex Separatist Consortium faction intel (loads `data/factions.json`)
- `concord.html` — Concord of Unity operations overview (loads `data/concord_ops.json`)
- `leadership.html` — Pale Array authority figures (loads `data/leadership.json`)
- `fleets.html` — Elite semi-autonomous fleets (loads `data/fleets.json`)

## Validation Scenarios

**CRITICAL**: Always test complete user workflows after making any changes:

### Complete End-to-End Testing Procedure
1. Start local server: `cd pale_array_site && python3 -m http.server 8000`
2. Navigate to `http://localhost:8000/` and verify landing page loads with Pale Array crest visible
3. Click "Consortium Intel" and verify faction cards load with data from `factions.json`
4. Click "Concord Ops" and verify pillars and operations lists populate from `concord_ops.json`
5. Click "Authority" and verify leadership cards display from `leadership.json`
6. Click "Fleets" and verify fleet information loads from `fleets.json`
7. Test theme toggle (◐ button) — should switch between dark and light themes
8. Verify navigation breadcrumbs update correctly on each page
9. Check that all images (SVG crests) load properly

### JSON Data Validation
After modifying any JSON file in `data/`:
- Validate syntax: `python3 -m json.tool data/[filename].json`
- Reload the corresponding page in browser to verify data displays correctly
- Check browser console for any JavaScript errors

### HTML/CSS Changes
- Verify responsive layout works on different viewport sizes
- Test that CSS variables in `assets/css/styles.css` properly control theme colors
- Ensure all semantic HTML structure remains intact

## Common Tasks

### Updating Content
- **Faction data**: Edit `data/factions.json` — requires fields: id, name, type, threatLevel, posture, leader, summary, knownOps, symbol
- **Operations**: Edit `data/concord_ops.json` — requires pillars and operations arrays
- **Leadership**: Edit `data/leadership.json` — requires name, role, division, callsign, bio, quote
- **Fleet data**: Edit `data/fleets.json` — structure matches other data files
- **Static content**: Directly edit HTML files for landing page content

### Styling Changes
- **Theme colors**: Update CSS variables in `assets/css/styles.css`
- **Layout**: Modify existing CSS classes rather than adding new ones
- **Images**: Replace SVG files in `assets/img/` (maintain same filenames for compatibility)

### Adding New Pages
1. Create new HTML file following existing page structure
2. Add navigation link to all existing pages
3. Create corresponding JSON data file if needed
4. Add data loading function to `assets/js/app.js`
5. Test complete navigation flow

## Expected Timing and Performance

### No Build Process Required
- **Setup time**: < 30 seconds to start server
- **Page load time**: < 1 second for all content (static files + small JSON)
- **Data updates**: Immediate (reload page after JSON changes)
- **Total site size**: < 500KB including all assets

### Server Testing
- Python HTTP server starts instantly and serves files immediately
- All modern static file servers work (nginx, Apache, Caddy, etc.)
- No database or backend services required
- Site works completely offline once files are served

## Troubleshooting

### Common Issues
- **JSON not loading**: Check browser console for fetch errors, validate JSON syntax
- **Styling issues**: Verify CSS file path and CSS variable usage
- **Images not displaying**: Check SVG file paths in `assets/img/`
- **Theme toggle not working**: Verify JavaScript is enabled and `app.js` loads correctly

### CORS Issues
If testing with `file://` protocol:
- Use HTTP server instead: `python3 -m http.server 8000`
- Browser security prevents local file access to JSON via fetch()

### Quick Diagnostics
```bash
# Verify all files present
cd pale_array_site && find . -name "*.html" -o -name "*.json" -o -name "*.js" -o -name "*.css"

# Test server access
curl -s http://localhost:8000/ | grep -o "<title>.*</title>"

# Validate all JSON
for file in data/*.json; do python3 -m json.tool "$file" >/dev/null && echo "✓ $file" || echo "✗ $file"; done
```

## File Inventories

### Repository Root
```
ls -la [repo-root]
.git/
otherAssets/
pale_array_site/
```

### Site Directory Contents
```
ls -la pale_array_site/
assets/
data/
concord.html
fleets.html
index.html
intel.html
leadership.html
README.md
```

### Data Files
```
ls -la pale_array_site/data/
concord_ops.json    # Concord pillars and operations
factions.json       # Consortium faction intelligence cards  
fleets.json         # Elite fleet information
leadership.json     # Authority figures and callsigns
```

This is a pure static site with no dependencies, build process, or server-side requirements. Focus on content accuracy and user experience validation rather than complex toolchain setup.