import useSWR from "swr";

const BASE_URL: string = "https://apicncbrasil.cn.org.br/api";
const LOCAL_URL: string = "http://localhost:3000"

async function getToken(): Promise<any> {
  const response = await fetch(`${LOCAL_URL}/api/cnc`);
  const data = await response.json();
  return data.token;
}

export function useFetchCncApi<Data = any, Error = any>(url: string) {
  const { data, error } = useSWR<Data, Error>(url, async (url) => {
    let response = await fetch(`${BASE_URL}/${url}`);

    if (response.status === 401) {
      const token = await getToken();
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
