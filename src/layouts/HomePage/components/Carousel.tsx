import { ReturnBook } from "./ReturnBook";
import { useEffect, useState } from "react";
import  BookModel  from "../../../models/BookModel";


export const Carousel = () => {

    const [books, setbooks] = useState<BookModel[]>([]);
    const [isloading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/books";

            const url: string = `${baseUrl}?page=0&size=9`;

            const response = await fetch(url);

            if(!response.ok){
                throw new Error("Something went wrong!.");
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.books;

            const loadedBooks: BookModel[] = [];

            for (const key in responseData) {
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    img: responseData[key].img
                });
            }

            setbooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isloading) {
        return (
            <div className="container m-5">
                <p>Loading...</p>
            </div>
        );
    }

    if (httpError){
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <div className="homepage-carousel-title text-center mb-4">
                <h3 className="display-6 library-carousel-title">Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id="carouselExampleControls" className="carousel carousel-dark slide mt-4 d-none d-lg-block" data-bs-interval='false'>

                { /* DESKTOP */}
                <div className="carousel-inner library-carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-stretch g-3">
                            {
                                books.slice(0, 3).map(book => (
                                    <ReturnBook book={book} key ={book.id} />
                                ))
                            }
                        </div>
                    </div> 
                    <div className="carousel-item ">
                        <div className="row d-flex justify-content-center align-items-stretch g-3">
                            {
                                books.slice(3, 6).map(book => (
                                    <ReturnBook book={book} key ={book.id} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="carousel-item ">
                        <div className="row d-flex justify-content-center align-items-stretch g-3">
                            {
                                books.slice(6, 9).map(book => (
                                    <ReturnBook book={book} key ={book.id} />
                                ))
                            }
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            
            { /* MOBILE */}
            <div className="d-lg-none mt-4">
                <div className="row d-flex justify-content-center">
                    {books.length > 0 && <ReturnBook book={books[0]} />}
                </div>
            </div>
            <div className="homepage-carousel-title mt-4 text-center">
                <a className="btn view-more-btn" href="#">View More</a>
            </div>
        </div>
    );
};