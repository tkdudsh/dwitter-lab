


export const getFetchData=async (path)=>{
    const baseUrl="http://localhost:9000";
    const url=`${baseUrl}${path}`;
    const response= await fetch(url);
    return await response.json();

}

export const postFetchData=()=>{

    

}