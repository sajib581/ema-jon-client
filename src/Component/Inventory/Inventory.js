import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Inventory = () => {
    const [info, setInfo] = useState({})
    const [file, setFile] = useState(null)
    const history = useHistory()
    const handelBlur = (e) => {
        const newUserInfo = { ...info }
        newUserInfo[e.target.name] = e.target.value
        setInfo(newUserInfo)
    }

    const fileChangeHandeller = (e) => {
        const newFile = e.target.files[0]
        setFile(newFile)
    }
    const submitHandeler = (e) => {
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        const key = datetime
        const formData = new FormData()

        formData.append('file', file)
        formData.append('name', info.name)
        formData.append('seller', info.seller)
        formData.append('price', info.price)
        formData.append('stock', info.stock)
        formData.append('key', key)

        fetch('http://localhost:4000/addAProduct', {
            method: 'POST',
            body: formData
        }) 
            .then(response => response.json())
            .then(data => {
                if(data){
                    e.target.reset();
                    alert("Product added Sucessfully")
                    history.push('/')
                }
            })
            .catch(error => {
                console.error(error)
            })
        e.preventDefault()
    }

    return (
        <div>
            <div className="container-fluid" style={{ backgroundColor: "#F4FDFB", minHeight: "100vh" }} >
                <div className="p-4 pr-5" >
                    <h5 className="mb-4">Add A Product</h5>
                    <form onSubmit={submitHandeler} >
                        <div className="form-group">
                            <label >Product Name</label>
                            <input onBlur={handelBlur} type="text" name="name" className="form-control" id="name" placeholder="Name" />
                        </div>

                        <div className="form-group">
                            <label >Seller Name</label>
                            <input onBlur={handelBlur} type="text" name="seller" className="form-control" id="name" placeholder="Seller Name" />
                        </div>

                        <div className="form-group">
                            <label >Price</label>
                            <input onBlur={handelBlur} type="number" name="price" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Price" />
                        </div>

                        {/* <div className="form-group">
                            <label >Key</label>
                            <input onBlur={handelBlur} type="number" name="key" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter a 8 digit key" />
                        </div> */}

                        <div className="form-group">
                            <label >Quantity</label>
                            <input onBlur={handelBlur} type="number" name="stock" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Quantity" />
                        </div>

                        <div className="form-group">
                            <label >Add an Image</label>
                            <input type="file" onChange={fileChangeHandeller} style={{ borderBottom: 'none' }} className="form-control-file" id="exampleFormControlFile1" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Inventory;