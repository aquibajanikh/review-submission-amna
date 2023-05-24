import { useState } from 'react';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Footer from './Footer';
import ItemReview from './ItemReview';
import { useLocation, useNavigate } from "react-router-dom";
import AddReviewForm from './Form';

// interface BookProps {
//     image: string;
//     title: string;
// }

const ProductPhoto = styled('img')({
    width: "250px",
    height: "400px",
    objectFit: "cover",
});

export default function BookDisplay() {
    const LeftGrid = styled(Grid)({
        display: 'flex',
        alignItems: 'center',
    });

    const RightGrid = styled(Grid)({
        display: 'flex',
        alignItems: 'center',
    });

    const location = useLocation();
    const navigate = useNavigate();

    // Parse the URL parameters to retrieve the title and image
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get("title") || "";
    const image = searchParams.get("image") || "";
    const description = searchParams.get("description") || "";
    const book_id = searchParams.get("book_id") || "";

    console.log(title);
    console.log(book_id);

    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

    // Handle cases where the title or image is missing
    if (!title || !image || !description) {
        navigate("/"); // Redirect to a default route or display an error message
        return null; // or return a loading state or placeholder component
    }


    const handleOpenReviewForm = () => {
        setIsReviewFormOpen(true);
    };

    const handleCloseReviewForm = () => {
        setIsReviewFormOpen(false);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Container sx={{ py: 2 }}>
                    <Grid container spacing={2}>
                        <LeftGrid item xs={12} md={6}>
                            <ProductPhoto src={image} alt={title} />
                        </LeftGrid>
                        <RightGrid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h4" sx={{ mb: 2 }}>
                                    {title}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    {description}
                                </Typography>
                                <Button color='error' variant="outlined" onClick={handleOpenReviewForm}>
                                    Add Review
                                </Button>
                            </Paper>
                        </RightGrid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <ItemReview />
                        </Grid>
                    </Grid>
                </Container>
                <Footer />
            </Box>

            {/* Render the AddReviewForm component conditionally */}
            {isReviewFormOpen && (
                <AddReviewForm open={isReviewFormOpen} onClose={handleCloseReviewForm} bookId={book_id} />
            )}
        </>
    );
}
