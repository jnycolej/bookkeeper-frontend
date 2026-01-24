// Page to view/edit details of a specific book

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"

import axios from "axios";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import api from "../services/api";
import NavBar from "../components/NavBar";
import { formatDate } from "@/utils/date";
import { deleteBook } from "../services/bookService";

const BookDetails = () => {
  const { id } = useParams();

  const { getAccessTokenSilently } = useAuth0();

  const [book, setBook] = useState(null);
  const [bookImage, setBookImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigate();

  const handleDelete = () => {};

  useEffect(() => {
    //Fetch book details from the backend API
    setLoading(true);
    const fetchBookDetails = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await api.get(`/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        setBook(data);
        if (!data.asin) {
          setBookImage(
            `https://covers.openlibrary.org/b/isbn/${
              data.isbn13 || data.isbn10
            }-M.jpg`,
          );
        } else {
          setBookImage(`https://images.amazon.com/images/P/${data.asin}.jpg`);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch book details");
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id, getAccessTokenSilently]);

  if (loading) {
    return <div className="text-center text-danger mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>;
  }

  if (!book) {
    return <div className="text-centeer text-danger mt-5">Book not found</div>;
  }

  return (
    <div className="h-screen bookKeeper-library-background text-stone-100">
      <NavBar />
      <div className="flex mt-10  place-content-center gap-2">
        <div className="flex-none p-2 mr-5 shadow-lg/20 shadow-stone-950">
              <img
                src={bookImage}
                alt="Book Cover"
                
              ></img>
        </div>
        <div className="flex-intial p-2 rounded bg-red-900/60">
          <p className="text-3xl">
            {book.title} - <span className="font-light text-xl">{book.series}{" "}
            {book.seriesNum ? `# ${book.seriesNum}` : ""}</span>
          </p>

          <div className="p-2">
            <div className="">
              <p className="font-bold">
                {Array.isArray(book.author)
                  ? book.author.join(" | ")
                  : book.author}
              </p>
              <hr />
              <div>
                <p className="text-base/10 font-medium capitalize"><span className="text-lg">Genres</span> : {Array.isArray(book.genres)
                    ? book.genres.join(" | ")
                    : book.genre}
                </p>
              </div>
              <div><p className="text-base/10 font-medium"><span className="text-lg">Publication Year</span> : {book.publicationYear}</p></div>
              <div><p className="text-base/10 font-medium"><span className="text-lg">Page Count</span> : {book.pageCount}</p></div>
              <div>
                <p className="text-base/10 font-medium capitalize"><span className="text-lg">Status</span> : {book.status === "currentlyReading"
                    ? "Currently Reading"
                    : opt.charAt(0).toUpperCase() + opt.slice(1)}</p>
              </div>
              <div>
                <p className="text-base/10 font-medium"><span className="text-lg">Date Finished</span> : {formatDate(book.dateFinished)}</p>
              </div>
              <div>
                <p className="text-base/10 font-medium"><span className="text-lg">Format</span> : {book.format}</p>
              </div>
              <div>
                <p className="text-base/10 font-medium"><span className="text-lg">Page Count</span> : {book.pageCount}</p>
              </div>
              <div>
                <p className="text-base/10 font-medium"><span className="text-lg">Kindle Unlimited</span> : {book.kindleUnlimited ? "Yes" : "No"}</p>
              </div>
              <div className="text-base/10 font-medium"><p><span className="text-lg">Libby</span> : {book.libby ? "Yes" : "No"}</p></div>
              <div className="flex p-2 gap-4">
                <Button
                  className="text-xl"
                  onClick={() => navigation(`/books/${book._id}/edit`)}
                >
                  Edit Book
                </Button>
                <Button className="text-xl" onClick={() => navigation("/home")}>
                  Return
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default BookDetails;
export default withAuthenticationRequired(BookDetails, {
  onRedirecting: () => <div>Loading...</div>,
});
