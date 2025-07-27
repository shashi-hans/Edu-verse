const baseURL = (window.location.hostname === "localhost") ?
          "http://localhost:4000" : " ";
export const visitURL = `${baseURL}/api/visitor/visit`;
export const countURL = `${baseURL}/api/visitor/count`;