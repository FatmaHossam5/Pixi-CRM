import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const useBreadcrumbs = (initialBreadcrumbs = []) => {
  const { t, i18n } = useTranslation();
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);

  useEffect(() => {
    // Update breadcrumbs dynamically when language changes
    const translatedBreadcrumbs = initialBreadcrumbs.map((item) => t(item));
    setBreadcrumbs(translatedBreadcrumbs);
  }, [i18n.language, initialBreadcrumbs, t]);

  const updateBreadcrumbs = (newBreadcrumbs) => {
    const translatedBreadcrumbs = newBreadcrumbs.map((item) => t(item));
    setBreadcrumbs(translatedBreadcrumbs);
  };

  return [breadcrumbs, updateBreadcrumbs];
};

export default useBreadcrumbs;
