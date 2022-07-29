import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server

    // return axios.create({
    //   baseURL:
    //     "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    //   headers: req.headers,
    // });
        return axios.create({
      baseURL:
        "http://www.tyty.lol/",
      headers: req.headers,
    });
  }
  // We must be on the browser
  return axios.create({
    baseUrl: "/",
  });
};
