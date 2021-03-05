import React from 'react'
import {useParams} from 'react-router-dom';
import BuyerSidebar from '../user/navigation/BuyerSidebar';
import Utopnav from '../user/navigation/Utopnav';
function Category() {
    const {category} = useParams();
    return (
        <div>
        <Utopnav/>
        <BuyerSidebar/>
            <div className="categoryside">
                <p style={{marginTop:"100px"}}>{category}</p>   
            </div>     
        </div>
    )
}

export default Category
