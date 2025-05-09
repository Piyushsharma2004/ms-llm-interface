// components/ui/Navbar.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className = '' }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive ? 'text-blue-600 font-semibold' : ''
      } ${className}`}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/msfincap-logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="h-8 w-8"
              />
              <span className="text-gray-900 font-semibold text-lg tracking-tight">
                Loan Risk & Summary
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex i  tems-center space-x-6">
            {/* Add future nav links here if needed */}
            <Link
              href="/file-request"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Test New Data
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
