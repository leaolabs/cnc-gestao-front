import useSWR from "swr";

const BASE_URL: string = "https://apicncbrasil.cn.org.br/api";

async function getToken(): Promise<any> {
  const response = await fetch("http://localhost:3000/api/cnc");
  const data = await response.json();
  return data.token;
}

export function useFetchCncApi<Data = any, Error = any>(url: string) {
  const { data, error } = useSWR<Data, Error>(url, async (url) => {
    let response = await fetch(`${BASE_URL}/${url}`);

    if (response.status === 401) {
      const token = await getToken();
      console.log(token);
      const params: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      response = await fetch(`${BASE_URL}/${url}`, params);
    }

    const data = await response.json();
    return data.data;
  });

  return { data, error };
}
