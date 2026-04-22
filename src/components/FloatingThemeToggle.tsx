import { ThemeToggle } from './ThemeToggle';

/** Floating theme toggle visible on every page */
export function FloatingThemeToggle() {
  return (
    <div className="fixed top-4 right-4 z-[100]">
      <div className="rounded-full bg-background/80 backdrop-blur-md border border-border shadow-md">
        <ThemeToggle />
      </div>
    </div>
  );
}
