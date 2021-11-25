import axios from 'axios';
import { USER_LIST, COUNTRY_LIST, YOB_LIST } from '../actions/types';

const PORT = 3030;

// To fetch users list
export const fetchUsers = (tab) => dispatch =>{
    axios.get(`http://localhost:${PORT}/users`).then((result) => {
        console.log('Result is--', result);
        //response and error handling
        dispatch({
            type: USER_LIST,
            payload: result.data.slice(0,tab * 9)
        })
    })
}


// To fetch countries list
export const fetchCountries = () => dispatch =>{
    axios.get(`http://localhost:${PORT}/users`).then((result) => {
        console.log('Result is--', result);
        //response and error handling
        dispatch({
            type: COUNTRY_LIST,
            payload: result.data.map((userData) => userData.country)
        })

        dispatch({
            type: YOB_LIST,
            payload: result.data.map((userData) => userData.dob.split(' ')[2])
    })
})
}


// To search users
export const searchUsers = (name, users) => dispatch =>{

    let filteredUsers = users.filter((user) => user.name.includes(name));
    dispatch({
        type: USER_LIST,
        payload: filteredUsers
    })

    
}


// To update directory
export const updateDirectory = (data) => dispatch =>{
    axios.put(`http://localhost:${PORT}/users/${data.id}`, data).then((result) => {
        console.log('Result is--', result);
    })
}


// To Delete users
export const deleteUser = (userId) => dispatch =>{
    let tab =1;
    axios.delete(`http://localhost:${PORT}/users/${userId}`).then((result) => {
        console.log('Result is--', result);
        axios.get(`http://localhost:${PORT}/users`).then((result) => {
        console.log('Result is--', result);
        //response and error handling
        dispatch({
            type: USER_LIST,
            payload: result.data.slice(0,tab * 9)
        })
    })
    })

}


// To fetch users list using filters
export const fetchUserUsingFilter = (filterType, filterData) => dispatch =>{
    axios.get(`http://localhost:${PORT}/users?${filterType}=${filterData}`).then((result) => {
        console.log('Result  of filtered data is--', result);
        dispatch({
            type: USER_LIST,
            payload: result.data.slice(0,1 * 9)
        })
    })
}


// To create a new user in directory
export const createNewUserInDirectory = (payload) => dispatch =>{
    axios.post(`http://localhost:${PORT}/users`, payload).then((result) => {
        console.log('USER CREATED', result);
    })
}