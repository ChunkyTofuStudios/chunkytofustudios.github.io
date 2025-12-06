import { Link } from "react-router-dom";
import { ComponentPropsWithoutRef, forwardRef, MouseEvent } from "react";

export interface LinkButtonProps extends Omit<ComponentPropsWithoutRef<typeof Link>, 'to'> {
  to: string;
  onNavigate?: () => void;
}

/**
 * A Link component that behaves like a button but supports Command/Ctrl+Click
 * to open in new tabs while still using React Router for regular navigation.
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ to, onClick, onNavigate, children, ...props }, ref) => {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      // Allow default browser behavior for modified clicks
      // (Command+Click on Mac, Ctrl+Click on Windows/Linux, Middle click, etc.)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
        // Let the browser handle it naturally
        return;
      }

      // For regular clicks, use React Router navigation
      if (onClick) {
        onClick(e);
      }

      if (onNavigate) {
        onNavigate();
      }
    };

    return (
      <Link 
        ref={ref}
        to={to} 
        onClick={handleClick}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

LinkButton.displayName = "LinkButton";

