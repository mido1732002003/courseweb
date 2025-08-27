// tree.js
// Run with: node tree.js
// Generates the entire courses-platform project structure with empty files.

import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// full list of files (directories auto-created)
const files = [
  ".env.example",
  ".env.local",
  ".eslintrc.json",
  ".gitignore",
  ".prettierrc",
  "next.config.js",
  "package.json",
  "postcss.config.js",
  "tailwind.config.ts",
  "tsconfig.json",
  "README.md",
  "robots.txt",
  "jest.config.js",
  "jest.setup.js",
  "vercel.json",
  "prisma/schema.prisma",
  "prisma/seed.ts",
  "public/favicon.ico",
  "public/logo.svg",
  "public/images/placeholder-course.jpg",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/loading.tsx",
  "src/app/error.tsx",
  "src/app/not-found.tsx",
  "src/app/globals.css",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/app/manifest.ts",

  // api routes
  "src/app/api/auth/sign-up/route.ts",
  "src/app/api/auth/sign-in/route.ts",
  "src/app/api/auth/sign-out/route.ts",
  "src/app/api/courses/route.ts",
  "src/app/api/courses/[id]/route.ts",
  "src/app/api/courses/search/route.ts",
  "src/app/api/favorites/route.ts",
  "src/app/api/progress/route.ts",
  "src/app/api/sections/route.ts",
  "src/app/api/roadmap/route.ts",
  "src/app/api/analytics/route.ts",

  // auth pages
  "src/app/auth/sign-in/page.tsx",
  "src/app/auth/sign-up/page.tsx",

  // dashboard
  "src/app/dashboard/layout.tsx",
  "src/app/dashboard/page.tsx",
  "src/app/dashboard/loading.tsx",
  "src/app/dashboard/favorites/page.tsx",
  "src/app/dashboard/recent/page.tsx",

  // sections
  "src/app/sections/page.tsx",
  "src/app/sections/[slug]/page.tsx",
  "src/app/sections/[slug]/loading.tsx",

  // courses
  "src/app/courses/[slug]/page.tsx",
  "src/app/courses/[slug]/loading.tsx",
  "src/app/courses/[slug]/error.tsx",

  // admin
  "src/app/admin/layout.tsx",
  "src/app/admin/page.tsx",
  "src/app/admin/sections/page.tsx",
  "src/app/admin/sections/new/page.tsx",
  "src/app/admin/sections/[id]/edit/page.tsx",
  "src/app/admin/courses/page.tsx",
  "src/app/admin/courses/new/page.tsx",
  "src/app/admin/courses/[id]/edit/page.tsx",
  "src/app/admin/roadmaps/page.tsx",
  "src/app/admin/roadmaps/new/page.tsx",
  "src/app/admin/roadmaps/[id]/edit/page.tsx",

  // components/ui
  "src/components/ui/button.tsx",
  "src/components/ui/card.tsx",
  "src/components/ui/input.tsx",
  "src/components/ui/label.tsx",
  "src/components/ui/select.tsx",
  "src/components/ui/textarea.tsx",
  "src/components/ui/badge.tsx",
  "src/components/ui/skeleton.tsx",
  "src/components/ui/toast.tsx",
  "src/components/ui/toaster.tsx",
  "src/components/ui/dialog.tsx",
  "src/components/ui/dropdown-menu.tsx",
  "src/components/ui/tabs.tsx",
  "src/components/ui/progress.tsx",
  "src/components/ui/scroll-area.tsx",
  "src/components/ui/separator.tsx",

  // components/layout
  "src/components/layout/navbar.tsx",
  "src/components/layout/footer.tsx",
  "src/components/layout/mobile-nav.tsx",
  "src/components/layout/theme-toggle.tsx",

  // components/home
  "src/components/home/hero-section.tsx",
  "src/components/home/sections-grid.tsx",
  "src/components/home/why-choose-us.tsx",
  "src/components/home/key-features.tsx",
  "src/components/home/courses-feed.tsx",

  // components/course
  "src/components/course/course-card.tsx",
  "src/components/course/course-grid.tsx",
  "src/components/course/course-filters.tsx",
  "src/components/course/video-player.tsx",
  "src/components/course/pdf-viewer.tsx",
  "src/components/course/favorite-button.tsx",
  "src/components/course/progress-bar.tsx",
  "src/components/course/course-details.tsx",

  // components/section
  "src/components/section/section-badge.tsx",
  "src/components/section/section-card.tsx",
  "src/components/section/roadmap-list.tsx",

  // components/admin
  "src/components/admin/course-form.tsx",
  "src/components/admin/section-form.tsx",
  "src/components/admin/roadmap-form.tsx",
  "src/components/admin/data-table.tsx",

  // components/dashboard
  "src/components/dashboard/dashboard-nav.tsx",
  "src/components/dashboard/recent-courses.tsx",
  "src/components/dashboard/favorites-list.tsx",
  "src/components/dashboard/stats-cards.tsx",

  // components/shared
  "src/components/shared/search-bar.tsx",
  "src/components/shared/infinite-scroller.tsx",
  "src/components/shared/loading-skeleton.tsx",
  "src/components/shared/error-boundary.tsx",
  "src/components/shared/empty-state.tsx",
  "src/components/shared/pagination.tsx",

  // lib
  "src/lib/prisma.ts",
  "src/lib/auth.ts",
  "src/lib/utils.ts",
  "src/lib/constants.ts",
  "src/lib/validations.ts",
  "src/lib/rate-limit.ts",
  "src/lib/analytics.ts",
  "src/lib/api-client.ts",

  // hooks
  "src/hooks/use-auth.ts",
  "src/hooks/use-toast.ts",
  "src/hooks/use-infinite-scroll.ts",
  "src/hooks/use-debounce.ts",
  "src/hooks/use-local-storage.ts",
  "src/hooks/use-analytics.ts",
  "src/hooks/use-theme.ts",

  // actions
  "src/actions/auth.actions.ts",
  "src/actions/course.actions.ts",
  "src/actions/section.actions.ts",
  "src/actions/favorite.actions.ts",
  "src/actions/progress.actions.ts",
  "src/actions/admin.actions.ts",

  // types
  "src/types/index.ts",
  "src/types/auth.types.ts",
  "src/types/course.types.ts",
  "src/types/api.types.ts",

  // middleware
  "src/middleware.ts",

  // providers
  "src/providers/auth-provider.tsx",
  "src/providers/theme-provider.tsx",
  "src/providers/analytics-provider.tsx",

  // tests
  "__tests__/unit/utils.test.ts",
  "__tests__/unit/validations.test.ts",
  "__tests__/unit/actions/auth.actions.test.ts",
  "__tests__/integration/api/auth.test.ts",
];

// helper to make dirs recursively
function ensureFile(path) {
  const full = join(__dirname, "courses-platform", path);
  const dir = dirname(full);
  mkdirSync(dir, { recursive: true });
  writeFileSync(full, ""); // empty file
  console.log("Created:", path);
}

// make all files
files.forEach(ensureFile);

console.log("✅ Project structure generated successfully.");
