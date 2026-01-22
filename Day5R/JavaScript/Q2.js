function flattenObject(obj, parentKey = "", result = {}) {
  for (let key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null
    ) {
      if (Array.isArray(obj[key])) {
        obj[key].forEach((val, index) => {
          flattenObject(val, `${newKey}.${index}`, result);
        });
      } else {
        flattenObject(obj[key], newKey, result);
      }
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

const obj = {
  name: "John",
  address: {
    city: "NYC",
    coordinates: {
      lat: 40.7128,
      lng: -74.006
    }
  },
  hobbies: ["reading", "gaming"]
};

console.log(flattenObject(obj));
