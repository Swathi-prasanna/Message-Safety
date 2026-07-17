# Contributing Guidelines

Welcome to the team! To ensure our codebase remains clean, maintainable, and free of styling conflicts as we scale, please follow these strict guidelines when contributing to the project.

## 1. Folder Structure & Component Architecture

We strictly follow a **"One Component = One Folder"** architecture.

When creating a new React component, you must create a dedicated folder for it inside the appropriate feature module in `src/components/`. The folder must contain BOTH the JSX file and its corresponding CSS file.

**Correct Example:**
```text
src/components/ContentModeration/
  └── ReviewPanel/
      ├── ReviewPanel.jsx
      └── ReviewPanel.css
```

**Rules:**
- Never leave a CSS file outside its corresponding component folder.
- Never create a JSX file without its matching CSS file. If your component doesn't need custom styles yet, create an empty CSS file and import it anyway.
- Imports should be placed at the top of your JSX file like this: `import './ReviewPanel.css';`

## 2. CSS Architecture & Naming Conventions

Because standard CSS is global in React, we must prevent "CSS naming collisions" where two developers accidentally use the same class name (e.g., `.wrapper` or `.title`) and break each other's layouts across different branches.

To prevent this, **you must use a strict prefix naming convention** for all custom CSS classes in your component files. 

**Prefix every custom class name with your component's name.**

**❌ Bad (Will cause collisions):**
```css
/* Inside ReviewPanel.css */
.container { padding: 20px; }
.header { font-size: 18px; }
.btn-submit { background: blue; }
```

**✅ Good (Safe & Isolated):**
```css
/* Inside ReviewPanel.css */
.review-panel-container { padding: 20px; }
.review-panel-header { font-size: 18px; }
.review-panel-btn-submit { background: blue; }
```

## 3. Using Global vs. Local CSS

Before writing custom CSS, always check if a global utility class already exists. 

We maintain a global design system in `src/index.css`. This file contains:
- **Shared Layout Structures:** `.main`, `.content`, `.card`, `.page`, `.grid`, `.topbar`
- **Custom Width Utilities:** `.w-250`, `.w-300`, `.w-350`, `.w-400` (for fixed-pixel sidebars/panels)
- **Bootstrap Utilities:** We actively utilize standard Bootstrap utility classes for spacing (`mt-4`, `p-3`), flexbox (`d-flex`, `align-items-center`), and grids (`row`, `col-lg-4`).

**Rule of Thumb:**
1. Try to build your layout using Bootstrap utilities and our global classes (like `.card` or `.topbar`) first.
2. Only if you need a highly specific style that doesn't exist globally, write it in your component's local CSS file using the prefixed naming convention described above.

---
*By following these rules, we guarantee that multiple developers can work on different branches simultaneously without ever causing merge conflicts in styles or breaking the UI. Happy coding!*
