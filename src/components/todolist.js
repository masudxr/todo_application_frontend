import { useState } from "react";
import axios from 'axios';

function FetchData() {
    const [data, setData] = useState("");
    const GetData = () =>{
      axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        console.log(res.data);
      setData(res.data.title);
      }).catch(err => {
        console.log(err);
      });
    };
    return(
        <div>
        <button onClick={GetData}>Get Data</button>
        { <p>{data}</p> }
        </div>
     );
}
export default FetchData;


