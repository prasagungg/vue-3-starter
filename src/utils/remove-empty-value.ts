export const removeEmptyValues = (object: Record<string, unknown>) => {
  for (const [k, v] of Object.entries(object)) {
    if (v === null || v === undefined || v === '' || v === "''") {
      delete object[`${k}`];
    }
  }
  return object;
};
