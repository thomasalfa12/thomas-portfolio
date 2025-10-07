"use client";

import { lazy } from "react";

// Gunakan React.lazy untuk mengubah komponen Anda menjadi "lazy"
// Ini memberitahu Next.js untuk memuat kodenya hanya saat dibutuhkan

export const LazyExperienceSection = lazy(() =>
  import("./experience").then((module) => ({ default: module.Experience }))
);

export const LazyProjectsPage = lazy(() =>
  import("./project-page").then((module) => ({ default: module.ProjectsPage }))
);

export const LazyCredentialsSection = lazy(() =>
  import("./credentials").then((module) => ({ default: module.Credentials }))
);

export const LazyContactSection = lazy(() =>
  import("./contact").then((module) => ({ default: module.Contact }))
);
