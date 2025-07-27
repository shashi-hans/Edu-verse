const baseURL = (window.location.hostname === "localhost") ?
          "http://localhost:4000" : "https://edu-verse-4nzz.onrender.com";
export const visitURL = `${baseURL}/api/visitor/visit`;
export const countURL = `${baseURL}/api/visitor/count`;