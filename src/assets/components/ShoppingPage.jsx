import React, { useEffect, useState } from 'react'
import './ShoppingPage.css'

const ShoppingPage = () => {
    const [data,setData] = useState([]);
    const [filterData, setFilteredData] = useState([]);
    
    const filterResult = (catItem) => {
        if (catItem === "All") {
          setFilteredData(data)
        } else {
          const filteredProducts = data.filter((curData) => {
            return curData.category === catItem;
          });
          setFilteredData(filteredProducts);
    }}
    useEffect(() => {
        const fetchData = async ()=> {
            try{
                const response = await fetch("https://fakestoreapi.com/products")
                const jsonData = await response.json()
                setData(jsonData)
                setFilteredData(jsonData)
            } catch(err){
                console.log("fetching err", err)
            }
        }
        fetchData()
    },[])
    return (
        <div>
            <h1 className='text-center text-dark mt-5'> Shopper's shop </h1>
            <div className="container-fluid mx-2">
                <div className="row mt-5 mx-2">
                    <div className="col-md-3">
                        <button className="btn btn-warning w-100 mb-4" onClick={() => filterResult("men's clothing") }>Men</button>
                        <button className="btn btn-warning w-100 mb-4" onClick={() => filterResult("women's clothing")}>Women</button>                        
                        <button className="btn btn-warning w-100 mb-4" onClick={() => filterResult("electronics")}>Electronics</button>
                        <button className="btn btn-warning w-100 mb-4" onClick={() => filterResult("jewelery")}>Jewellery</button>
                        <button className="btn btn-warning w-100 mb-4" onClick={() => filterResult("All")}>All</button>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                        {filterData.map((product) => (
                            <div key={product.id} className="col-md-4 mb-3">                            
                                <div className="card h-100" >                                    
                                    <img src={(product.image)} className="mx-auto w-50 h-75" alt="" />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">Price: {product.price}</p>
                                        <a href="#" className="btn btn-dark">Buy Now</a>
                                    </div>
                                </div>
                            </div>))}                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingPage
