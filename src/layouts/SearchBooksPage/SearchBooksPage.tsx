import { useState, useEffect, use } from 'react';
import BookModel from '../../models/BookModel';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { SearchBook } from '../HomePage/components/SearchBook';
import { Pagination } from '../Utils/Pagination';


export const SearchBooksPage = () => {
    const [books, setbooks] = useState<BookModel[]>([]);
    const [isloading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/books";

            const url: string = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`; // Fetch books for the current page

            const response = await fetch(url);

            if(!response.ok){
                throw new Error("Something went wrong!.");
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.books;

            setTotalAmountOfBooks(responseJson.page.totalElements); // Set total amount of books
            setTotalPages(responseJson.page.totalPages); // Set total pages

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
        window.scrollTo(0,0);
    }, [currentPage]);

    if (isloading) {
            return (
                <SpinnerLoading />
            );
        }
    
        if (httpError){
            return (
                <div className="container m-5">
                    <p>{httpError}</p>
                </div>
            )
        }

        const indexOfLastBook: number = currentPage * booksPerPage; // Get index of last book
        const indexOfFirstBook: number = indexOfLastBook - booksPerPage; // Get index of first book
        let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks; // Get last item

        const paginate = (pageNumber: number) => setCurrentPage(pageNumber); // Update current page

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type="search" placeholder='Search' aria-labelledby='Search'/>
                                <button className='btn btn-outline-success'>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-primary dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                    Category
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li><a className='dropdown-item' href="#">All</a></li>
                                    <li><a className='dropdown-item' href="#">Front End</a></li>
                                    <li><a className='dropdown-item' href="#">Back End</a></li>
                                    <li><a className='dropdown-item' href="#">Data</a></li>
                                    <li><a className='dropdown-item' href="#">DevOps</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <h5>Number of results: ({totalAmountOfBooks})</h5>
                    </div>
                    <p>
                        {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
                    </p>
                    {books.map(book => (
                        <SearchBook key={book.id} book={book} />
                    ))}
                    {totalPages > 1 &&
                    <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} /> 
                    }
                </div>
            </div>
        </div>
    )
        
}