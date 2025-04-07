# Health Imaging Prototype

A **proof-of-concept** medical imaging viewer built with **React** and **CornerstoneJS**, showcasing:

- **DICOM** image rendering (2D stack)  
- **Pan & Zoom** on separate mouse buttons (middle-click for Pan, right-click for Zoom)  
- **Measurement tools** (Length, Probe) with easy left-click activation  
- **Window/Level** controls (slider-based W/WC adjustments)  
- **Annotation clearing** (reset all measurements)  
- **Fully responsive UI** for various screen sizes  

> **Note**: This is an exploratory prototype demonstrating the ability to integrate healthcare imaging libraries with a modern frontend stack. It’s not intended as a production-ready viewer.

---

## Demo

- **Live Demo**: [https://health-imaging-poc.netlify.app](#)  

---

## Features

1. **Multi-Tool Mouse Bindings**  
   - **Left-click**: User-selected tool (Length or Probe)  
   - **Middle-click**: Pan  
   - **Right-click**: Zoom  

2. **Thumbnail Selection**  
   - Quickly switch between multiple CT series thumbnails.  
   - Each thumbnail loads a different DICOM file.

3. **Window/Level Sliders**  
   - Adjust **Window Width** and **Window Center** in real time.  
   - Updates the image contrast and brightness on the fly.

4. **Reset All**  
   - Resets camera (Pan/Zoom).  
   - Resets Window/Level to default.  
   - Removes last annotations (Length/Probe).

5. **Loading Indicator**  
   - A simple overlay spinner while images load.  
   - Disappears once DICOM rendering is complete.

---

## Tech Stack

- **React**: For UI components and state management.  
- **CornerstoneJS**: Core library for DICOM rendering.  
- **@cornerstonejs/tools**: Measurement tools, annotation state, etc.  
- **TailwindCSS** for styling.

---

## Local Development

1. **Clone** the repo:
   ```bash
   git clone https://github.com/yourusername/health-imaging-prototype.git
   cd health-imaging-prototype
   ```
2. **Install** dependencies:
   ```bash
   npm install
   ```
or `yarn install`, `bun` or `pnpm`

3. **Run in Dev Mode**
```bash
npm run dev
```
- Opens your app at http://localhost:5173 (or whichever port is used).

4. **Place** your DICOM files:

By default, .dcm files live in /public/ so you can reference them with wadouri:/sample-2.dcm.

Adjust the code or the imageId references if you have different filenames.

---
## Building & Serving Production

### Build
```bash
npm run build
```
Creates a production-ready bundle in the `build` (or `dist`) folder.

### Serve Locally
```bash
npx serve -s build
```
Serves your compiled app at [http://localhost:3000](http://localhost:3000) (or another port).
This emulates a real production environment for final testing.

---

## Deployment

- Deployed with **Netlify**.
- **Public URL**: [https://health-imaging-poc.netlify.app](#)  

---

## Screenshots / Demo
![Screenshot from 2025-04-07 02-59-33](https://github.com/user-attachments/assets/3033e98c-d9b0-4475-b58f-438b5ed778d5)
![Screenshot from 2025-04-07 02-58-58](https://github.com/user-attachments/assets/aa3ed209-e49b-4733-9c73-0b90d9327453)
![Screenshot from 2025-04-07 02-56-56](https://github.com/user-attachments/assets/3cb51c8e-470b-4134-9392-ab3ef5928585)

---

## Contributing / Feedback

This is a personal prototype demonstrating my skills in **medical imaging frontends**.

Feedback is welcome! Feel free to open an issue or reach out with suggestions.

---



