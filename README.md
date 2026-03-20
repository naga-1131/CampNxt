CampWiz NXT React Migration
Overview

This project is an initial implementation for migrating the CampWiz NXT frontend from Next.js to a pure React-based architecture.
The objective is to simplify the frontend, improve maintainability, and optimize performance for large-scale media evaluation workflows used in Wiki Loves contests.

Problem Statement
The existing CampWiz NXT frontend is built using Next.js, which introduces tight coupling with server-side rendering and increases overall complexity. For an interactive evaluation platform dealing with large volumes of media, this architecture is not optimal.

Key limitations include:
Reduced flexibility due to SSR dependency
Increased maintenance complexity
Inefficient handling of large media datasets
Lack of modular component structure
Solution Approach

This project follows an incremental migration strategy:
Replace Next.js with a React single-page application
Maintain compatibility with the existing Go backend
Build a modular, component-based architecture
Introduce a clean API service layer
Optimize rendering for large datasets

Current Implementation
The current version includes:
React project setup
Basic routing using React Router
Initial UI components:
Media Viewer
Scoring Panel
Prototype evaluation page
This serves as a foundation for further migration.

Planned Improvements
Migration of all existing frontend pages
Integration with backend APIs
Performance optimizations:
Lazy loading of media
List virtualization for large datasets
Controlled re-rendering using memoization
Improved evaluation workflow for faster interaction

Status:Work in progress.
This repository represents the initial phase of the CampWiz NXT frontend migration.

Note:The goal of this project is not to redesign the system but to improve its structure and performance while preserving all existing functionality.
-->1

<img width="1896" height="851" alt="image" src="https://github.com/user-attachments/assets/a45d44f9-b50c-4026-b5f0-7524548d6f9a" />


-->2
<img width="1896" height="860" alt="image" src="https://github.com/user-attachments/assets/9d1a84e6-f9aa-4198-818e-64918104f968" />
