// src/hooks/useWindowSize.js

import { useState, useEffect } from 'react';

/**
 * Hook that returns the current window dimensions
 * and provides helper methods for responsive design
 * 
 * @returns {Object} Window size information and responsive helpers
 */
const useWindowSize = () => {
  // Initialize with reasonable defaults for server-side rendering
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  // Define breakpoints (in pixels)
  const breakpoints = {
    xs: 0,    // Extra small devices
    sm: 640,  // Small devices, phones
    md: 768,  // Medium devices, tablets
    lg: 1024, // Large devices, laptops
    xl: 1280, // Extra large devices, large desktops
    xxl: 1536 // Extra extra large devices
  };

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect runs only on mount and unmount

  // Helper methods to check current breakpoint
  const isXs = windowSize.width < breakpoints.sm;
  const isSm = windowSize.width >= breakpoints.sm && windowSize.width < breakpoints.md;
  const isMd = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg;
  const isLg = windowSize.width >= breakpoints.lg && windowSize.width < breakpoints.xl;
  const isXl = windowSize.width >= breakpoints.xl && windowSize.width < breakpoints.xxl;
  const isXxl = windowSize.width >= breakpoints.xxl;

  // Helper methods for breakpoint comparisons
  const isSmUp = windowSize.width >= breakpoints.sm;
  const isMdUp = windowSize.width >= breakpoints.md;
  const isLgUp = windowSize.width >= breakpoints.lg;
  const isXlUp = windowSize.width >= breakpoints.xl;

  const isSmDown = windowSize.width < breakpoints.md;
  const isMdDown = windowSize.width < breakpoints.lg;
  const isLgDown = windowSize.width < breakpoints.xl;
  const isXlDown = windowSize.width < breakpoints.xxl;

  // Helper for determining device type (approximate)
  const isMobile = windowSize.width < breakpoints.md;
  const isTablet = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg;
  const isDesktop = windowSize.width >= breakpoints.lg;

  // Helper for determining orientation
  const isPortrait = windowSize.height > windowSize.width;
  const isLandscape = windowSize.width > windowSize.height;

  // Helper function to return different values based on screen size
  const responsive = (options) => {
    if (isXs && options.xs !== undefined) return options.xs;
    if (isSm && options.sm !== undefined) return options.sm;
    if (isMd && options.md !== undefined) return options.md;
    if (isLg && options.lg !== undefined) return options.lg;
    if (isXl && options.xl !== undefined) return options.xl;
    if (isXxl && options.xxl !== undefined) return options.xxl;
    
    // Fallbacks by finding the first defined value for a larger breakpoint
    if (isXs) {
      return options.sm || options.md || options.lg || options.xl || options.xxl || options.default;
    }
    if (isSm) {
      return options.md || options.lg || options.xl || options.xxl || options.default;
    }
    if (isMd) {
      return options.lg || options.xl || options.xxl || options.default;
    }
    if (isLg) {
      return options.xl || options.xxl || options.default;
    }
    if (isXl) {
      return options.xxl || options.default;
    }
    
    return options.default;
  };

  // Helper to determine CSS grid columns based on screen size
  const gridColumns = (options = {}) => {
    const defaultOptions = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
      xxl: 6,
      ...options
    };
    
    return responsive(defaultOptions);
  };

  // Function to set CSS variables for responsive designs
  const setResponsiveVars = () => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--viewport-width', `${windowSize.width}px`);
      document.documentElement.style.setProperty('--viewport-height', `${windowSize.height}px`);
      
      const currentBreakpoint = 
        isXs ? 'xs' :
        isSm ? 'sm' :
        isMd ? 'md' :
        isLg ? 'lg' :
        isXl ? 'xl' : 'xxl';
        
      document.documentElement.style.setProperty('--breakpoint', currentBreakpoint);
    }
  };

  // Set CSS variables when window size changes
  useEffect(() => {
    setResponsiveVars();
  }, [windowSize.width, windowSize.height]);

  return {
    width: windowSize.width,
    height: windowSize.height,
    breakpoints,
    
    // Exact breakpoint matches
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isXxl,
    
    // Breakpoint ranges
    isSmUp,
    isMdUp, 
    isLgUp,
    isXlUp,
    
    isSmDown,
    isMdDown,
    isLgDown,
    isXlDown,
    
    // Device types
    isMobile,
    isTablet,
    isDesktop,
    
    // Orientation
    isPortrait,
    isLandscape,
    
    // Helper functions
    responsive,
    gridColumns,
    setResponsiveVars
  };
};

export default useWindowSize;