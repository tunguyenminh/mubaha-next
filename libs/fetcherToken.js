const fetcherToken = (url,token) => fetch(url,{
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  }
}).then((res) => res.json())
export default fetcherToken