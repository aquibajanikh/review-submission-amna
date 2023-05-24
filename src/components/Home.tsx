import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Book from "./Book";


interface Books {

    book_ID: number;
    book_name: string;
    book_Image: string;
    book_description: string;

}

export default function Home() {

    const [books, setBooks] = useState<Books[]>([]);

    useEffect(() => {
        console.log("reched");
        // Fetch reviews from the backend
        axios.get<Books[]>("http://localhost:8020/books")
            .then(response => {
                setBooks(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    console.log(books);
    return (


        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
            {books && books.map((book, key) => (
                <Grid item xs={4} key={key}>
                    <div style={{ textAlign: "center" }}>
                        <Book image={book.book_Image} title={book.book_name} description={book.book_description} book_id={book.book_ID} />
                    </div>
                </Grid>
            ))}
        </Grid>
    );
}
