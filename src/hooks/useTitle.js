import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title}-Like Media`;
  }, [title]);
};
export default useTitle;
