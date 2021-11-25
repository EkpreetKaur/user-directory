import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import './paginator.css';


function Paginator({errors, auth, history, totalUsers, onPaginatorTabClick}) {

    const onPaginatorClick = (page) => {
        onPaginatorTabClick(page);
    }


    return(
        <div className='paginator-main'>
            {
                [1,2,3,4,5].map((page) => {
                    return (
                        <div className='page-tab' onClick={() => {onPaginatorTabClick(page)}}>
                            {page}
                        </div>
                    )
                })
            }
           
        </div>
    )

}


const mapStateToProps = (state) => ({
    //props made from redux store 
    
});


export default withRouter(connect(mapStateToProps, {
    //All functions defined in action will come here
    
})(Paginator));