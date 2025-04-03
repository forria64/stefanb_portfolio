```
         ▄             ▄▀█▄                  ▀██      
 ▄▄▄▄  ▄██▄    ▄▄▄▄  ▄██▄    ▄▄▄▄   ▄▄ ▄▄▄    ██ ▄▄▄  
██▄ ▀   ██   ▄█▄▄▄██  ██    ▀▀ ▄██   ██  ██   ██▀  ██ 
▄ ▀█▄▄  ██   ██       ██    ▄█▀ ██   ██  ██   ██    █ 
█▀▄▄█▀  ▀█▄▀  ▀█▄▄▄▀ ▄██▄   ▀█▄▄▀█▀ ▄██▄ ██▄  ▀█▄▄▄▀  
                                                      
                           ▄     ▄▀█▄          ▀██   ██          
▄▄▄ ▄▄▄    ▄▄▄   ▄▄▄ ▄▄  ▄██▄   ▄██▄     ▄▄▄    ██  ▄▄▄    ▄▄▄   
 ██▀  ██ ▄█  ▀█▄  ██▀ ▀▀  ██     ██    ▄█  ▀█▄  ██   ██  ▄█  ▀█▄ 
 ██    █ ██   ██  ██      ██     ██    ██   ██  ██   ██  ██   ██ 
 ██▄▄▄▀   ▀█▄▄█▀ ▄██▄     ▀█▄▀  ▄██▄    ▀█▄▄█▀ ▄██▄ ▄██▄  ▀█▄▄█▀ 
 ██                                                                     
▀▀▀▀                                                                                     
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~v1.1.0
```
This repository hosts the source code for **StefanB's Art Portfolio** – a Next.js-based art portfolio deployed as an Internet Computer Protocol (ICP) canister.

## Features

- **ICP Deployment:** Built as a canister using the DFX toolchain, enabling on-chain hosting on the Internet Computer.
- **Next.js Frontend:** Developed with Next.js for optimized static export and dynamic routing.
- **Tailwind CSS Styling:** Uses Tailwind CSS for a responsive and modern user interface.
- **Dynamic Artwork Display:** Loads artwork images and metadata dynamically from the `public/artwork` directory.
- **Modular Architecture:** Managed via npm workspaces, keeping dependencies and source code well-organized.

## Project Structure

- **.gitignore:** Lists files and directories to exclude from version control.
- **README.md:** This file – providing an overview, deployment instructions, and development workflow.
- **dfx.json:** Configuration for deploying the frontend as an ICP canister.
- **canister_ids.json:** Contains the ICP canister ID(s) after deployment.
- **package.json:** Root package file defining workspaces and project-level dependencies.
- **src/stefanb_portfolio_frontend/:** Contains the Next.js application code, including pages, components, and utility functions.
- **public/artwork/:** Holds artwork images and the associated metadata in JSON format.

## Prerequisites

Before deploying or developing, ensure you have the following installed:
- [Git](https://git-scm.com/)
- [Node.js (>=16.0.0)](https://nodejs.org/)
- [npm (>=7.0.0)](https://www.npmjs.com/)
- [DFX (Internet Computer SDK)](https://smartcontracts.org/docs/developers-guide/install-upgrade-remove.html)

## Deployment in Test Environment

To deploy the ICP canister locally in a test environment, run the following commands:

```bash
git clone https://github.com/forria64/stefanb_portfolio
cd stefanb_portfolio
dfx start --clean --background
dfx deploy
```

## Development

For local development, follow these steps:

1. Navigate to the frontend workspace:
   ```bash
   cd src/stefanb_portfolio_frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
This launches the Next.js development server, allowing you to preview and test changes in real time.

## Artwork & Metadata

- Artwork images and their metadata are stored in the `public/artwork` directory.
- The artwork is dynamically loaded using utility functions found in:
  - `src/stefanb_portfolio_frontend/utils/getArtwork.js`
  - `src/stefanb_portfolio_frontend/utils/getMetadataYears.js`
