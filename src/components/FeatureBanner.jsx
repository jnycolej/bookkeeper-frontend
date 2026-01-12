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

  return (
    <div>
      <h1 className="text-3xl text-center">Currently Reading</h1>
      <Carousel className="mx-auto w-80 max-w-3xl">
        <CarouselContent className="test">
          {featuredBooks.map((book) => (
            <CarouselItem className="" key={book._id}>
              <div className="p-1">
                <Card className="bg-transparent border-transparent shadow-none cursor-pointer">
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