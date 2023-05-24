import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface BookProps {
    image: string;
    title: string;
    description: string;
    book_id: number;
}

const useStyles = makeStyles({
    book: {
        position: "relative",
        display: "inline-block",
        margin: "10px",
        "&:hover $title ": {
            opacity: 1,
        },
        "&:hover $image": {
            filter: "blur(2px)",
        },
    },
    image: {
        display: "block",
        width: "250px",
        height: "400px",
        objectFit: "cover",
    },
    title: {
        position: "absolute",
        bottom: "0px",
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        color: "#fff",
        opacity: 0,
        padding: "10px",
        transition: "opacity 0.3s ease-in-out",
    },
});

export default function Book({ image, title, description, book_id }: BookProps) {
    const classes = useStyles();




    return (
        <div className={classes.book}>
            <img className={classes.image} src={image} alt={title} />
            <Link
                to={`/BookDisplay?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}&book_id=${encodeURIComponent(book_id)}`}
            >
                <div className={classes.title}>
                    <Typography variant="h6">{title}</Typography>
                </div>
            </Link>
        </div>
    );
}
