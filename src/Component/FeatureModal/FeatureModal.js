import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons'

const FeatureModal = ({ modalIsOpen, setIsOpen, openModal, closeModal, features, setFeatures }) => {

    const customStyles = {
        overlay: {
            background: "rgba(130,125,125,0.75)"
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            height: "60vh",
            width: "700px",
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };
    const { register, handleSubmit, watch, errors } = useForm();

    const submitHandeler = (data, e) => {
        e.target.reset();
        const newFeatures = [...features, data];
        setFeatures(newFeatures)
    }
    let buttonPosition = features.length > 4 ? "static" : "fixed";

    const deleteHandeler = (description, value) => {
        const newFeatures = features.filter(fiture => {  
            return (!(description === fiture.description && value === fiture.value))
        })
        setFeatures(newFeatures)
    }
    return (
        <div className="px-5 mx-5">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal" >
                <form onSubmit={handleSubmit(submitHandeler)} className="form-group d-flex mt-3 row mx-3" >
                    <input ref={register({ required: true })} name="description" placeholder="Description" id="description" className="form-control col-6 rounded-0" />

                    <input ref={register({ required: true })} placeholder="Value" id="value" name="value" className="form-control col-5 rounded-0" />
                    <button style={{ height: "38px" }} type="submit" className="btn-brand col-1 text-white"><FontAwesomeIcon style={{ height: '100%' }} icon={faPlus} /></button>
                </form>

                <div>
                    {
                        <table className="table table-borderless">
                            <tbody>
                                {
                                    features.map((feature, index) =>
                                        <tr key={index}>
                                            <th >{index + 1}</th>
                                            <td>{feature.description}</td>
                                            <td>{feature.value}</td>
                                            <td><FontAwesomeIcon style={{cursor: "pointer" }} icon={faTrash} onClick={()=>deleteHandeler(feature.description, feature.value)} /> </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    }
                </div>
                <button onClick={() => setIsOpen(false)} style={{ position: buttonPosition, left: '20px', bottom: '20px' }} className="btn btn-brand">Add Features</button>
            </Modal>

        </div>
    );
};

export default FeatureModal;