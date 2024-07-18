const useTitle = () => {
  const generateTitle = (title) => {
    document.title = title;
  };

  return { generateTitle };
};

export default useTitle;
