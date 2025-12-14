# How to Upload to GitHub

You should upload the **entire root folder** (`react-assets-gen`) to GitHub.

## Why the root folder?

1.  **Monorepo Structure**: Your project contains both the source code for the tool (`cli/`) and a demo React application (`src/`) that shows how to use it.
2.  **Documentation**: The root contains `README.md`, `USAGE.md`, and other guides that are essential for users.
3.  **Development**: Developers who want to contribute need the full structure to run the demo and test changes.

## Step-by-Step Upload Guide

### 1. Initialize Git

Open your terminal in `d:\react-assets-gen` and run:

```bash
git init
```

### 2. Stage Files

Add all files to git (this will respect the `.gitignore` we just created):

```bash
git add .
```

### 3. Commit

Save the current state:

```bash
git commit -m "Initial commit: React Assets Gen CLI and Demo"
```

### 4. Create Repository on GitHub

1.  Go to [github.com/new](https://github.com/new).
2.  Name it `react-assets-gen`.
3.  Description: "Production-ready React Assets Code Generator".
4.  Public or Private: Your choice.
5.  **Do not** initialize with README, .gitignore, or License (we already have them).
6.  Click **Create repository**.

### 5. Push to GitHub

Copy the commands shown on GitHub (under "…or push an existing repository from the command line") and run them. They will look like this:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/react-assets-gen.git
git branch -M main
git push -u origin main
```

## What Users Will See

When users visit your repository, they will see:

-   **README.md**: The main documentation.
-   **cli/**: The source code for the npm package.
-   **src/**: The example React app.
-   **USAGE.md**: Detailed examples.

This is the standard structure for open-source tools.
