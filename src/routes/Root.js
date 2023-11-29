import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";


export function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // When the component mounts, check if user is already logged in from localStorage
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <p>React Query</p>
      </div>
      
  );
}