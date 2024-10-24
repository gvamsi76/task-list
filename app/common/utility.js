


export const ReadLocalStorage = (key) => {
  try {
    let data = localStorage.getItem(key);
    if (data && IsJSON(data)) {
      data = JSON.parse(data);
    }
    return data;
  } catch (error) {
    console.log(error, "");
    return "";
  }
};
export const RemoveFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
export const SetLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
  return true;
};
