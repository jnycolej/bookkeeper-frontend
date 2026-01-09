import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getBookCounts, getBooks } from "../services/bookService";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FeatureBanner = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [bookImage, setBookImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const token = await getAccessTokenSilently();
      const data = await getBooks(token);

      const withCovers = data.map((book) => {
        const coverUrl = book.asin
          ? `https://images.amazon.com/images/P/${book.asin}.jpg`
          : `https://covers.openlibrary.org/b/isbn/${
              book.isbn13 || book.isbn10
            }-M.jpg`;
        return { ...book, coverUrl };
      });
      setBooks(withCovers);
    };
    fetchBooks();
  }, [getAccessTokenSilently]);

  // derive featured subset whenever books load
  useEffect(() => {
    if (!books.length) return;
    const featured = books.filter((b) => b.status === "currentlyReading");
    setFeaturedBooks(featured);
  }, [books]);

  // console.log("API base:", api?.defaults?.baseURL); // if you use axios instance
  // console.log("books length:", data.length);
  // console.log("status counts:", data.reduce((a,b)=> (a[b.status]=(a[b.status]||0)+1, a), {}));

  return (
    <div>
      <h1 className="text-3xl">Currently Reading</h1>
      <Carousel className="mx-auto w-full max-w-3xl">
        <CarouselContent>
          {featuredBooks.map((book) => (
            <CarouselItem key={book._id}>
              <div className="p-1">
                <Card className="cursor-pointer">
                  <CardContent className="flex items-center justify-center p-6">
                    <button
                      type="button"
                      onClick={() => navigate(`/books/${book._id}`)}
                      className="w-full"
                    >
                      <img
                        src={book.coverUrl}
                        className="mx-auto max-h-[420px] w-auto object-contain"
                        alt={book.title}
                        loading="lazy"
                      />
                    </button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FeatureBanner;
{
  /* <div className="carousel-indicators">
            {featuredBooks.map((_, idx) => (
              <button
                key={idx}
                type="button"
                data-bs-target="#carouselIndicators"
                data-bs-slide-to={idx}
                className={idx === 0 ? "active" : undefined}
                aria-current={idx === 0 ? "true" : undefined}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="carousel-inner">
            {featuredBooks.map((book, idx) => (
              <div
                key={book._id}
                className={`carousel-item${idx === 0 ? " active" : ""}`}
              >
                <a onClick={() => navigate(`/books/${book._id}`)}>
                  <img
                    src={book.coverUrl}
                    className="d-block mx-auto"
                    alt={book.title}
                  />
                </a>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button> */
}
