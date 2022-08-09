import React from 'react'
import {Route} from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../../pages/collection/collection.component'

const ShopPage = ({match})=> ( // we have access to match object because in App.js our shop page
    // is in nested in route and route automatically passes these 3 objects into our component as props
    // match, history and location
    <div className='shop-page'>
        <Route exact path={`${match.path}`}  component={CollectionsOverview}></Route>
        <Route exact path={`${match.path}/:collectionId`} component={CollectionPage}></Route>
    </div>
);
    


export default ShopPage;