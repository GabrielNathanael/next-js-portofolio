export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-700 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center">
          <p className="text-neutral-600 dark:text-neutral-300 text-sm">
            © {new Date().getFullYear()} Gabriel Nathanel Purba. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
