import React, {useState, useEffect} from "react";

function FerchDoneData() {
    const mystyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial",
        margin: "10px"
      };
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        let mounted = true;
        fetch("http://localhost:3000/todo/done")
        .then((res) => res.json())
        .then((data) => {
            console.log({data});

            if (!mounted) {
                return;
            }
            setUsers(data);
        });

        return () => {
            mounted = false;
        };
    }, [])

    return(
        <div>
            <ul style={mystyle}>
                {users.map(post =>(<li key={post.id}>{post.title}</li>))}
            </ul>
        </div>
    )
}

export default FerchDoneData;