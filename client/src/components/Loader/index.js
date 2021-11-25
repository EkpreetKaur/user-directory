import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import './loader.css';

function Loader({errors, auth, history}) {

    return(
        <div className='loader'>
            
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
    
})(Loader));