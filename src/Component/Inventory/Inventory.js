import React, { useState } from 'react';
import { useHistory } from 'react-router';
import FeatureModal from '../FeatureModal/FeatureModal';
import Modal from 'react-modal';
import { uid } from 'uid'; // crypto-js can be used for node.js

Modal.setAppElement('#root')

const Inventory = () => {
    const [info, setInfo] = useState({})
    const [file, setFile] = useState(0)
    const [features, setFeatures] = useState([])

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
        const key = uid();
        const star = 3;
        const formData = new FormData()

        formData.append('file', file)
        formData.append('name', info.name)
        formData.append('seller', info.seller)
        formData.append('price', info.price)
        formData.append('stock', info.stock)
        formData.append('key', key)
        formData.append('star', star)
        formData.append('features', JSON.stringify(features))

        fetch('https://lit-temple-12670.herokuapp.com/addAProduct', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
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

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {        
        setIsOpen(false);
        setFeatures([])
    }

    return (
        <div>
            <div className="container-fluid" style={{ backgroundColor: "#F4FDFB", minHeight: "100vh" }} >
                <div className="p-4 pr-5" >
                    <h5 className="mb-4">Add A Product</h5>
                    <form onSubmit={submitHandeler} >
                        <div className="row">
                            <div className="form-group col-6">
                                <label >Product Name</label>
                                <input onBlur={handelBlur} type="text" name="name" className="form-control" id="name" placeholder="Name" />
                            </div>

                            <div className="form-group col-6">
                                <label >Seller Name</label>
                                <input onBlur={handelBlur} type="text" name="seller" className="form-control" id="name" placeholder="Seller Name" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-6">
                                <label >Price</label>
                                <input onBlur={handelBlur} type="number" name="price" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Price" />
                            </div>

                            <div className="form-group col-6">
                                <label >Quantity</label>
                                <input onBlur={handelBlur} type="number" name="stock" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Quantity" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-6">
                                <label >Add an Image</label>
                                <input type="file" onChange={fileChangeHandeller} style={{ borderBottom: 'none' }} className="form-control-file" id="exampleFormControlFile1" />
                            </div>
                            <div className="form-group col-6"> <br />
                                <button onClick={openModal} type="button" className="btn btn-secondary">Add Some Features {features.length>0 && ` (${features.length})`}</button>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            <FeatureModal
                modalIsOpen={modalIsOpen}
                setIsOpen={setIsOpen}
                openModal={openModal}
                closeModal={closeModal}
                features={features}
                setFeatures={setFeatures}
            ></FeatureModal>
        </div>
    );
};

export default Inventory;