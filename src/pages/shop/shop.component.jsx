import React from "react";
import { Routes, Route } from "react-router-dom";

import CollectionsOverview from '../../components/collections-overview/collection-overview.component';
import CollectionPage from "../collection/collection.component";

const ShopPage = () => (
    <div className="shop-page">
        <Routes>
            <Route path="/" element={<CollectionsOverview />} />
            <Route path=":collectionId" element={<CollectionPage />} />
        </Routes>
    </div>
);

export default ShopPage;
