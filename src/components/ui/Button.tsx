import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  href: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export const Button = ({ href, variant = 'secondary', children, className = '', external = false }: ButtonProps) => {
  const baseStyles = "group relative flex items-center justify-center w-full max-w-sm mx-auto px-6 py-4 rounded-2xl font-medium transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.97]";
  
  const variants = {
    primary: "bg-white text-black hover:bg-white/95 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
    secondary: "bg-white/5 text-white/90 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:text-white"
  };

  const content = (
    <span className="relative z-10 flex items-center gap-3">
      {children}
    </span>
  );

  if (external) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {content}
    </Link>
  );
};
