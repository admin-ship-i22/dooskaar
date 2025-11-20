import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "rounded-full cursor-pointer text-[13px] px-5 py-2 inline-flex items-center justify-center gap-2 transition-all duration-200 font-semibold whitespace-nowrap";
  
  const variants = {
    primary: "bg-gradient-to-br from-[#f5d36b] to-[#d4af37] text-[#241b08] shadow-lg hover:-translate-y-0.5 hover:shadow-xl",
    outline: "border border-gold/50 text-gold-soft bg-black/20 hover:bg-gold/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};