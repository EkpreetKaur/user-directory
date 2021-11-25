import React, {Fragment, isValidElement, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import SearchAndFilter from '../../components/SearchAndFilter';
import UserCard from '../../components/UserCard';
import './mainPage.css';
import { fetchUsers, searchUsers, updateDirectory, deleteUser, fetchCountries , fetchUserUsingFilter, createNewUserInDirectory} from '../../actions/userActions';
import Paginator from '../../components/Paginator';
import Loader from '../../components/Loader';
import { isNotEmpty, isValidEmail } from '../../utils/validation';

function MainPage({fetchUsers, userReducer, searchUsers, updateDirectory, deleteUser, fetchCountries, fetchUserUsingFilter, createNewUserInDirectory}) {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const [createUserFlag, setCreateUserFlag] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [country, setCountry] = useState('');
    const [userId, setUserId] = useState('');
    const [hideCreateButton, setHideCreateButton] = useState(false);
    const [errorMessage, setError] = useState('');



    useEffect(() => {
        fetchUsers(currentPage);
        fetchCountries();
    }, [])

    useEffect(() => {
        if(userReducer.users.length >= 0) {
            setUsers(userReducer.users);
            setLoader(false);
        }

    },[userReducer.users])



    const onPaginatorTabClick = (tab) => {
            setCurrentPage(tab);
            fetchUsers(tab);
            setLoader(true);

    }

    const searchName = (name) => {
        if(name != ''){
            searchUsers(name, users);
        }else{
            fetchUsers(currentPage);
        }
        setLoader(true);
    }

    const saveUserData = (data) => {
        updateDirectory(data);
    }

    const fetchUserAsPerFilter = (filterType, filterData) => {
            fetchUserUsingFilter(filterType, filterData)
    }

    const createNewUser = () => {
        setCreateUserFlag(true);
        setHideCreateButton(true);
    }

    const onCreateNewUser = () => {
        setHideCreateButton(false);
        setCreateUserFlag(false);

        let payload = {
            name: name,
            email: email,
            dob: '12th March 1990', // keeping it fixed for now for the sake of completing the functionality
            country: country
        }
        if(isValidEmail(email) && isNotEmpty(country) && isNotEmpty(email) && isNotEmpty(name)){
            createNewUserInDirectory(payload)
        }else{
            setError('Fields are not in the required format');
        }

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


    const onCancelCreate = () => {
        setCreateUserFlag(false);
        setHideCreateButton(false);
    }

    return(
        <div className='main-page'>
            <div className='main-page-header'>
                <h3>USER DIRECTORY</h3>
            </div>
           
            
            <div className='user-list-area'>
                <SearchAndFilter searchName={searchName} fetchUserAsPerFilter={fetchUserAsPerFilter} createNewUser={createNewUser} hideCreateButton={hideCreateButton}/>
                {
                createUserFlag?
                <div className='new-user-main'>
                            <h5>CREATE NEW USER </h5>
                            {
                                errorMessage != '' ?
                                <span className='red-font'>{errorMessage}</span> : ''
                            }
                            <input name="username" type="text" placeholder="name" value={name} onChange={(event) => {handleChange(event)}}/>
                            <input name="email" placeholder="email" value={email} onChange={(event) => {handleChange(event)}}/>
                            {/* <input name="dob" type="text" placeholder="dob in format" value={dob} onChange={(event) => {handleChange(event)}}/> */}
                            <input name="country" type="text" placeholder="country name" value={country} onChange={(event) => {handleChange(event)}}/>
                            <div className='action-buttons'>
                                <button type="button"  className='save-button' onClick={() => {onCreateNewUser()}}>Save details</button>
                                <button type="button"  className='delete-button-no' onClick={() => {onCancelCreate()}}>Cancel</button>
                            </div>

                </div> : ''

            }
                <div className='main-page-user-list'>

                    {
                        loader?
                        <Loader/>
                        :
                        users.length === 0?
                        <div>No data found</div>
                        :
                            users && users.map((user) => {
                                return (
                                    <UserCard user={user} key={user.id} saveUserData={saveUserData} deleteUser={deleteUser} />
                                )
                            })

                    }
                </div>
                

            </div>
            <div>
                <Paginator onPaginatorTabClick = {onPaginatorTabClick}/>
            </div>
        </div>
    )

}


const mapStateToProps = (state) => ({
    //props made from redux store 
    userReducer: state.userReducer,
});


export default withRouter(connect(mapStateToProps, {
    //All functions defined in action will come here
    fetchUsers, searchUsers, updateDirectory, deleteUser, fetchCountries, fetchUserUsingFilter, createNewUserInDirectory
    
})(MainPage));