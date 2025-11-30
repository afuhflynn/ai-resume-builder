"use client";
import { useEffect, useState } from "react";

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "true") {
      setHasConsented(true);
    } else {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Store the consent in local storage
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
    setHasConsented(true);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-4 flex items-center justify-between z-50">
      <p>
        This website uses cookies to ensure you get the best experience.
        <a
          href="/privacy"
          className="ml-1 text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleAccept}
      >
        Accept
      </button>
    </div>
  );
};

export { CookieConsentBanner };
