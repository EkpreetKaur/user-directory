import React, {Fragment, useEffect, useImperativeHandle, useState} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import { deleteUser } from '../../actions/userActions';
import './usercard.css';


function UserCard({userReducers, user, saveUserData, deleteUser}) {
    const [isEdit, setEditState] = useState(false);
    const [isDelete, setDeleteFlag] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [country, setCountry] = useState('');
    const [userId, setUserId] = useState('');


    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setDob(user.dob);
        setCountry(user.country);
        setUserId(user.id);
    },[user])



    const onEditClick = () => {
        setEditState(true);
    }

    const handleChange = (event) => {
        const { target } = event;
        const { name } = target;

        if(name === 'username'){
            setName(event.target.value);

        }else if(name === 'email') {
            setEmail(event.target.value);


        }else if(name === 'dob'){
            setDob(event.target.value);


        }else if(name === 'country'){
            setCountry(event.target.value);
        }
    }

    const onSaveDetails = () => {
        let userData = {
            name: name,
            email: email,
            dob: dob,
            country:country,
            id: userId
        }

        saveUserData(userData);
        setEditState(false);
    }


    const onDeleteClick = () => {
        setDeleteFlag(true);
    }

    const onApproveDelete = () => {
        deleteUser(userId);
        setDeleteFlag(false);
    }

    const onCancelDelete = () => {
        setDeleteFlag(false);
    }


    return (
       <div className='main-user-card'>
           {
               isDelete?
               <div className='delete-header'>
                  <span>Do you really want to delete this user?</span>
                  <div className='action-buttons'>
                        <button type="button"  className='delete-button-yes' onClick={() => {onApproveDelete()}}>Yes</button>
                        <button type="button"  className='delete-button-no' onClick={() => {onCancelDelete()}}>No</button>
                  </div>
                  

                </div> : ''
           }
           
           <div className="main-card-edit-and-delete">
                <img src={process.env.PUBLIC_URL+'./edit.png'} length="20px" height="20px" className='cursor-class'  onClick={() => {onEditClick()}}/>
                <img src={process.env.PUBLIC_URL+'./delete.png'} length="20px" height="20px" className='cursor-class' onClick={() => {onDeleteClick()}}/>
           </div>
           <div className="main-card">
                <img className='main-card-avatar' src={process.env.PUBLIC_URL+'./avatar.png'}></img>
                <div className='main-card-detail'>
                    {
                        isEdit?
                        <Fragment>
                            <input name="username" type="text" placeholder="" value={name} onChange={(event) => {handleChange(event)}}/>
                            <input name="email" type="text" placeholder="" value={email} onChange={(event) => {handleChange(event)}}/>
                            <input name="dob" type="text" placeholder="" value={dob} onChange={(event) => {handleChange(event)}}/>
                            <input name="country" type="text" placeholder="" value={country} onChange={(event) => {handleChange(event)}}/>
                            <button type="button"  className='save-button' onClick={() => {onSaveDetails()}}>Save details</button>




                        </Fragment>
                        :
                        <Fragment>
                            <span>{`Name: ${name}`}</span>
                            <span>{`Email: ${email}`}</span>
                            <span>{`Date of birth: ${dob}`}</span>
                            <span>{`Country: ${country}`}</span>
                        </Fragment>

                    }
                    
                </div>

           </div>
           
           

       </div>
    )

}


const mapStateToProps = (state) => ({
    //props made from redux store 
    auth: state.auth,
    errors: state.errors,
});


export default withRouter(connect(mapStateToProps, {
    //All functions defined in action will come here
    
})(UserCard));