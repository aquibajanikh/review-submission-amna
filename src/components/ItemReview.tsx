import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, IconButton, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ReviewItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#4caf50',
        cursor: 'pointer',
    },
}));

const ReviewList = styled(Box)({
    display: 'flex',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    '& > *': {
        flex: '0 0 auto',
        minWidth: '25%',
        marginRight: '1rem',
    },
});

interface Review {
    review_id: number;
    book_id: number;
    username: string;
    user_review: string;
    review_rate: number;

}

const ItemReview = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        console.log("reched");
        // Fetch reviews from the backend
        axios.get<Review[]>("http://localhost:8020/reviews")
            .then(response => {
                setReviews(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleScroll = (scrollOffset: number) => {
        const container = document.getElementById('reviewListContainer');
        if (container) {
            const newScrollLeft = container.scrollLeft + scrollOffset;
            container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        }
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Product Reviews
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
                <IconButton onClick={() => handleScroll(-200)}>
                    <ArrowBackIcon />
                </IconButton>
                <ReviewList id="reviewListContainer">
                    {reviews.map((review) => (
                        <ReviewItem key={review.review_id}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                {review.username}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                {review.user_review}
                            </Typography>
                            <Rating value={review.review_rate} precision={0.5} readOnly />
                        </ReviewItem>
                    ))}
                </ReviewList>
                <IconButton onClick={() => handleScroll(200)}>
                    <ArrowForwardIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ItemReview;
