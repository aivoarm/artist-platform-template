import Link from 'next/link';

const navItems = [
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Videos', path: '/videos' }, // New
  { name: 'Radio', path: '/radio' },   // New
  { name: 'Contact', path: '/contact' },
];

export function Header() {
  return (
    <header className="fixed w-full top-0 z-10 bg-white/70 dark:bg-black/70 backdrop-blur-md transition-colors duration-500 border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-2xl px-4">
        <nav className="flex items-center justify-between py-4">
          
          {/* Logo/Home Link */}
          <Link href="/" className="text-lg font-bold tracking-tighter text-neutral-900 dark:text-neutral-100 hover:text-blue-500 transition-colors">
            Arman Ayva
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.path} 
                className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}