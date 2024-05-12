"use client";

import { useEffect, useState } from "react";

interface CurrencyProps {
  price: number;
}

export const Currency: React.FC<CurrencyProps> = ({ price = 0 }) => {
  // Boolean state to track if the component has mounted to the DOM
  const [isMounted, setIsMounted] = useState(false);

  // Hooks to set the isMounted state to true after initial render to avoid hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If the component is not yet mounted, don't render anything
  if (!isMounted) {
    return null;
  }

  return <p className="text-2xl font-semibold">${price}</p>;
};
