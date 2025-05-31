const convertStringToBoolean = (value: string | undefined) => {
  if (typeof value !== "string") return false;
  return value === "true";
};

export { convertStringToBoolean };
