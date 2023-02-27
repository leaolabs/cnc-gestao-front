import useSWR from "swr";

const BASE_URL: string = "https://apicncbrasil.cn.org.br/api";

async function getToken(): Promise<any> {
  const params: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "carvalho.fabiano@gmail.com", //`${process.env.CNC_USER_EMAIL}`,
      password: "euo0207", //`${process.env.CNC_USER_PASSWORD}`,
    }),
  };
  const response = await fetch(`${BASE_URL}/auth/login`, params);
  const data = await response.json();
  return data;
}

export function useFetchCncApi<Data = any, Error = any>(url: string) {
  const { data, error } = useSWR<Data, Error>(url, async (url) => {
    let response = await fetch(`${BASE_URL}/${url}`);

    console.log(process.env.LEONARDO_TESTE);

    if (response.status === 401) {
      console.log("entrei no response qui");
      const token = await getToken();
      console.log(token.access_token);
      const params: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      };
      response = await fetch(`${BASE_URL}/${url}`, params);
    }

    const data = await response.json();
    return data.data;
  });

  return { data, error };
}
