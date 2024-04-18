import { useAuth } from "../users/authenticateUser";
import * as client from "./client";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import UserDeatils from "./userDetailsPage";
function Reviews() {
    const { currentUser } = useAuth();

    const [userReviews, setUserReviews] = useState([]);
    useEffect(() => {

        const fetchUserReviews = async () => {
          try {
            const reviews = await client.getUserReviews(currentUser._id);
            console.log(reviews);
            console.log("review user _id", currentUser._id)
            setUserReviews(reviews);
          } catch (error) {
            console.error("Error fetching user reviews", error);
          }
        };
    
        if (currentUser) {
          fetchUserReviews();
        }
    }, [currentUser]);

    useEffect(() => {
        console.log("userReviews:", userReviews);
    }, [ userReviews]);
    return(
        <div>
            <UserDeatils/>
            <div style={{marginTop: 10, marginLeft: 10}}>
            {userReviews.map((review) => (
                    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", width: "500px" }}>

                        <Link>
                        <p>Rating: {review.rating}</p>
                        <p>Comment: {review.comment}</p> </Link>
                        <p>{review.blogLink}</p>
                        </div>
                    ))}
            </div>
                
            </div>
    );
}

export default Reviews;