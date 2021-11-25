import React, {Fragment, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import './searchAndFilter.css';



function SearchAndFilter({history, searchName, filterUsers, userReducer, fetchUserAsPerFilter, createNewUser, hideCreateButton}) {
    const [currentFilter, setCurrentFilter] = useState('');
    const [countries, setCountries] = useState([]);
    const [yob, setYob] = useState([]);




    useEffect(() => {
        if(userReducer.countries.length > 0) {
            setCountries(userReducer.countries);
        }

    },[userReducer.countries])


    useEffect(() => {
        if(userReducer.yearOfBirthList.length > 0) {
            setYob(userReducer.yearOfBirthList);
        }

    },[userReducer.yearOfBirthList])



    const search = (event) => {
        searchName(event.target.value);
    }

    const onSelectFilter = (event) => {
        if(event.target.value === 'yearofbirth'){
                setCurrentFilter(event.target.value);
        }else if(event.target.value === 'country') {
                setCurrentFilter(event.target.value);


        }
        // filterUsers(event.target.value);
    }

    const onSelectFilterOption= (event) => {
        if(event.target.name === 'countryFilter'){
            fetchUserAsPerFilter('country', event.target.value);
        }else if(event.target.name === 'yearofbirthFilter'){
            fetchUserAsPerFilter('dob_like', event.target.value);

        }

    };


    const createUser = () => {
        createNewUser()
    }

    return(
        <div className='search-filter-main'>
            <select name="userfilter" id="userfilter" onClick={(event) => {onSelectFilter(event)}}>
                <option value="Select">Select</option>
                <option value="country">Country</option>
                <option value="yearofbirth">Date of birth</option>
            </select>
            {
                currentFilter === 'country'?
                <select name="countryFilter" id="countryFilter" onClick={(event) => {onSelectFilterOption(event)}}>
                    {
                         countries && countries.map((country, index) => {
                             return (
                                <option key={index} value={country}>{country}</option>
                             )
                            
        
                        })
                    }
                </select> : 
                currentFilter === 'yearofbirth'?
                <select name="yearofbirthFilter" id="yearofbirthFilter" onClick={(event) => {onSelectFilterOption(event)}}>
                {
                     yob && yob.map((yearData, index) => {
                         return (
                            <option key={index} value={yearData}>{yearData}</option>
                         )
                        
    
                    })
                }
                </select> :
                
                ''
               
            }
            
            <input type='text' autoComplete placeholder="Type user's name and press enter" onKeyUp={(event) => {search(event)}}/>
            {
                hideCreateButton?
                '' : 
                <button type="button"  className='delete-button-no' onClick={() => {createUser()}}>Create User</button>


            }

        </div>
    )

}


const mapStateToProps = (state) => ({
    //props made from redux store 
    userReducer: state.userReducer,
});


export default withRouter(connect(mapStateToProps, {
    //All functions defined in action will come here
    
})(SearchAndFilter));