import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Rating,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";

interface AddReviewFormProps {
  open: boolean;
  onClose: () => void;
  bookId: string; // Add bookId prop
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ open, onClose, bookId }) => {
  const [username, setUsername] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post("http://localhost:8020/addReview", { username, reviewContent, rating, bookId })
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.log("Error submitting review:", error);
      });
  };

  const isFormValid = username.trim() !== "" && reviewContent.trim() !== "" && rating !== 0;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Review</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Your Name"
                variant="outlined"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  console.log(event.target.value);
                }}
                id="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Review Description"
                variant="outlined"
                multiline
                rows={4}
                value={reviewContent}
                onChange={(event) => {
                  setReviewContent(event.target.value);
                  console.log(event.target.value);
                }}
                id="review"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Rate the Book:</Typography>
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue as number);
                  console.log(newValue); // Add this line
                }}
                max={5}
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button type="submit" color="primary" disabled={!isFormValid}>
              Submit
            </Button>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewForm;
