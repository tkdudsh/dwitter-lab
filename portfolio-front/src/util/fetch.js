/**
 * 네트웍을 이용하여 서버에서 JSON 데이터 가져오기
 */
export const getFetchData = async(path) => {
    const baseUrl = `http://localhost:9000`;
    const url = `${baseUrl}${path}`;
    const response = await fetch(url);
    return await response.json();
}