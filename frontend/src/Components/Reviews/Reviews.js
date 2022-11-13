import * as React from 'react';
import MainMenu from '../../Shared/MainMenu';
import { baseUrl } from '../../Shared/baseUrl';
import axios from 'axios';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';
import ReviewCard from './ReviewCard';

function Reviews(props) {

    const [reviews,setReviews] = React.useState([])  
    
    const token = useSelector(state=>state.token.token);
    const user = useSelector(state=>state.user);

    React.useEffect(()=>{
        setAuthHeader(token)
        getReviews()
    },[token])

    async function getReviews() {
        try {
            // get list of reviews 
            let response = await axios.get(baseUrl + "/reviews");
            // and save to state
            setReviews(response.data);
        } catch (ex) {
            alert(ex);
        }
    }

    const reviewElements = reviews.map(review=>{
        return (<ReviewCard
            key={review.reviewId}
            userId={review.userId}
            beerId={review.beerId}
            description={review.description}
            rating={review.rating} />)
    })

    return (
        <div>
            <MainMenu/>
            <h3>Beer Reviews</h3>
            <div className='reviews row'>
            {reviewElements}
            </div>
        </div>
    )
}

export default Reviews;