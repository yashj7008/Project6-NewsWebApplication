import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FetchData = ({ cat }) => {                     
    const [Data, setData] = useState([]); 

    const fetchData = async () => {
        try {
            const url = cat
                ? `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=4630de61fa9c4f9da3fc703d1f387819`
                : "https://newsapi.org/v2/top-headlines?country=in&apiKey=4630de61fa9c4f9da3fc703d1f387819";
            const response = await axios.get(url);
            setData(response.data.articles);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };
    
    useEffect(() => {       // Not getting this point 
        fetchData();
    }, [cat]);
    
    return (
        <div className="container my-4" >
            <h3>
                <u>Top Headlines</u>
            </h3>
            <div className="container d-flex justify-content-center align-items-center flex-column my-3 " style={{minHeight: "100vh"}}>
                {Data ? Data.map((item, index) => (
                    <div className="container my-3 p-3" key={index} style={{boxShadow : "2px 2px 6px  silver" , borderRadius : "10px"}} >
                        <h5 className="my-1">{item.title}</h5>
                         <img src={item.urlToImage} alt="image not found" className="img-fluid" style={{width : "auto",height:"300px", objectFit : "cover"}}/>
                        <p>{item.content}</p>
                        <Link to={item.url} target="blank">View More</Link>

                    </div>
                )) : "Loading .... "}
            </div>
        </div>
    );
};

export default FetchData;
