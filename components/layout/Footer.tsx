export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <p className="text-neutral-600 dark:text-neutral-300 text-sm">
            From ideas to code — I build modern, scalable web applications.
          </p>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs">
            © {new Date().getFullYear()} Gabriel Nathanael Purba
          </p>
        </div>
      </div>
    </footer>
  );
}
