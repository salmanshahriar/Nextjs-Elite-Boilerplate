"use client";

import { useEffect } from "react";

interface HeadManagerProps {
  title?: string;
  description?: string;
}

export const HeadManager = ({ title, description }: HeadManagerProps) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');

      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }

      metaDescription.setAttribute("content", description);
    }
  }, [description]);

  return null;
};
