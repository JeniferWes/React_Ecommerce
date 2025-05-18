import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const MyHome = () => {
    let [itemList, setItemList] = useState([]);
    let [porder, setPorder] = useState("asc");

    const getItem = async () => {
        try {
            await fetch("http://localhost:1234/products")
                .then(response => response.json())
                .then(itemArray => {
                    if (porder === "asc") {
                        itemArray.sort((a, b) => { return a.Price - b.Price });//asc order by price
                        setItemList(itemArray);
                        setPorder("desc");
                    } else {
                        itemArray.sort((a, b) => { return b.Price - a.Price });//desc order by price
                        setItemList(itemArray);
                        setPorder("asc");
                    }

                })
        }
        catch (error) {
            alert("Error :" + error);
        }
    }
    useEffect(() => {
        getItem();
    }, []);


    const addtocart=(item)=>{
        item["qty"] = 1;
        // console.log(item);
        let url="http://localhost:1234/cart";
        let postData={
            headers:{'content-type':'application/json'},
            method:'post',
            body:JSON.stringify(item)
        }

        fetch(url, postData)
        .then(response=>response.json())
        .then(info=>{
            alert(item.Name   +  "Added in your cart");
        })
    }

    let [keyword, setKeyword] = useState("");

    //For Pagination
    const PER_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(itemList.length / PER_PAGE);


    return (
        <div className="container mt-5 mb-5">
           <div className='row mb-5'>
                <div className='col-xl-4'></div>
                <div className='col-xl-4'>
                    <div className='input-group'>
                        <label className='input-group-text'> <i className='fa fa-search'></i> </label>
                        <input type="text" className='form-control form-control-lg' placeholder='Search...'
                        onChange={obj=>setKeyword(obj.target.value)}
                        />
                    </div>
                </div>
                <div className='col-xl-4'></div>
            </div>
            <div className="row">              
                    {itemList.slice(offset, offset + PER_PAGE).map((item, index) => {
                        if (item.Name.toLowerCase().match(keyword.toLowerCase()) || item.Price.match(keyword))
                        return (
                            <div className="col-xl-3 mb-4" key={index}>
                                <div className="p-3 text-center">
                                    <h4 className="mb-2">{item.Name}</h4>
                                    <img src={item.Image} height="250" width="100%" className="rounded" alt={item.Name} />
                                    <p className="mt-2">{item.Details}</p>
                                    <p>Rs.{item.Price}</p>
                                    <p>
                                        <button className='btn btn-warning btn-sm' onClick={()=>addtocart(item)}> 
                                            <i className='fa fa-shopping-cart'></i> Add To Cart 
                                        </button>
                                    </p>

                                </div>

                            </div>
                        )
                    })
                }
            </div>

            <div className="mb-4 mt-4 text-center">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination  justify-content-center"}
                    pageClassName={"page-item "}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active primary"}
                />
            </div>
        </div>
    )
}

export default MyHome;