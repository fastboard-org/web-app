export const isPreviewPage = () => {
  return window?.location?.pathname?.includes("preview");
};

export const isPublishPage = () => {
  return window?.location?.pathname?.includes("publishment");
};
