import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import CollectionsOverview from '../../components/collections-overview/collection-overview.component';
import CollectionPage from "../collection/collection.component";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.action";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
    state = {
        loading: true,
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = collection(firestore, 'collections');

        getDocs(collectionRef).then((snapshot) => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });
    }

    componentWillUnmount() {
        if (this.unsubscribeFromSnapshot) {
            this.unsubscribeFromSnapshot();
        }
    }

    render() {
        const { loading } = this.state;

        return (
            <div className="shop-page">
                <Routes>
                    <Route 
                        path="/" 
                        element={<CollectionsOverviewWithSpinner isLoading={loading} />} 
                    />
                    <Route 
                        path=":collectionId" 
                        element={<CollectionPageWithSpinner isLoading={loading} />} 
                    />
                </Routes>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
