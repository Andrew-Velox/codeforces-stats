import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import qs from "fast-querystring";

const defaultOption = {
  username: "yalniz",
  theme: "default",
  template: "card",
};

const useOption = () => {
  const [options, setOptions] = useLocalStorageState("options_v3", {
    defaultValue: defaultOption,
  });
  const [imageUrl, setImageUrl] = useState(`/api/${options.template || "card"}?${qs.stringify({ username: options.username, theme: options.theme })}`);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateImage = (newOptions) => {
    const endpoint = newOptions.template || "card";
    const { template, ...queryParams } = newOptions;
    const newImageUrl = `/api/${endpoint}?${qs.stringify(queryParams)}`;
    if (newImageUrl != imageUrl || error) setLoading(true);
    setError(false);
    setImageUrl(newImageUrl);
  };

  const checkHandleNotFound = () => {
    return new Promise((resolve) => {
      fetch(
        `https://codeforces.com/api/user.info?handles=${options.username}`
      ).then((res) => {
        if (res.status === 400) {
          resolve();
        }
      });
    });
  };

  return {
    options,
    setOptions,
    imageUrl,
    updateImage,
    error,
    setError,
    loading,
    setLoading,
    checkHandleNotFound,
  };
};

export default useOption;
