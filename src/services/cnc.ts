import axios from "axios";
import { parseCookies } from "nookies";

type SignInRequestData = {
  email: string;
  password: string;
};

const BASE_URL: string = "https://apicncbrasil.cn.org.br/api";

async function signInRequest(req: SignInRequestData) {
  const params: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "*",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: req.email,
      password: req.password,
    }),
  };
  const response = await fetch(`${BASE_URL}/auth/login`, params);
  const data = await response.json();

  return {
    token: data.access_token,
    expiresIn: data.expires_in,
    user: {
      name: data.user.name,
      email: data.user.email,
    },
  };
}

async function recoverUserInformations() {
  return {
    user: {
      name: "Implementar",
      email: "Implementar@gmail.com",
    },
  };
}

function getAPIClient(ctx?: any) {
  //https://youtu.be/pvrKHpXGO8E?list=PL85ITvJ7FLohhULgUFkYBf2xcXCG6yfVV&t=3706
  const { "cnc-auth-token": token } = parseCookies(ctx);
  const apiCNC = axios.create({
    baseURL: BASE_URL,
  });
  apiCNC.interceptors.request.use((config) => {
    console.log(config);
    return config;
  });

  if (token) {
    apiCNC.defaults.headers["Authorization"] = "Bearer " + token;
  }

  return apiCNC;
}

// apiCNC = Esse deve ser usado para chamadas de API atraves do Browser
// getAPIClient = Esse deve ser usado para chamadas de API atraves do serverSidePros (servidor do nextjs)
const apiCNC = getAPIClient();

export { apiCNC, getAPIClient, recoverUserInformations, signInRequest };
