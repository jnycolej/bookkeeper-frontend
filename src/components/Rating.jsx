import React, { useState } from "react";

export function Rating({ ratingNum }) {
  const rating = Math.round(ratingNum * 2) / 2; // normalize to nearest 0.5
  console.log("Rating passed:", ratingNum);
  return (
    <div className="rating rating-sm rating-half">
      {Array.from({ length: 10 }).map((_, i) => {
        const value = (i + 1) * 0.5;
        return (
          <div
            key={i}
            className={`mask mask-star-2 ${
              i % 2 === 0 ? "mask-half-1" : "mask-half-2"
            } bg-stone-50`}
            aria-label={`${value} star`}
            aria-current={value === rating ? "true" : undefined}
          />
        );
      })}
    </div>
  );
}


export function EditableRating() {
  return (
    <div className="rating rating-lg rating-half">
      <input type="radio" name="rating-11" className="rating-hidden" />
      <input
        type="radio"
        name="rating-11"
        className="mask mask-star-2 mask-half-1 bg-green-500"
        aria-label="0.5 star"
      />
      <input
        type="radio"
        name="rating-11"
        className="mask mask-star-2 mask-half-2 bg-green-500"
        aria-label="1 star"
      />
      <input
        type="radio"
        name="rating-11"
        className="mask mask-star-2 mask-half-1 bg-green-500"
        aria-label="1.5 star"
        defaultChecked
      />
      <input
        type="radio"
        name="rating-11"
        className="mask mask-star-2 mask-half-2 bg-green-500"
        aria-label="2 star"
      />
      <input
        type="radio"
        name="rating-11"
        className="mask mask-star-2 mask-half-1 bg-green-500"
        aria-label="2.5 star"
      />
      <input
        type="radio"
        name="rating-11"
        className="mask mask-star-2 mask-half-2 bg-green-500"
        aria-label="3 star"
      />
      <input
        type="radio"
        name="rating-11"
        className="mask mask-star-2 mask-half-1 bg-green-500"
        aria-label="3.5 star"
      />
      <input
        type="radio"
        name="rating-11"
        className="mask mask-star-2 mask-half-2 bg-green-500"
        aria-label="4 star"
      />
      <input
        type="radio"
        name="rating-11"
        className="mask mask-star-2 mask-half-1 bg-green-500"
        aria-label="4.5 star"
      />
      <input
        type="radio"
        name="rating-11"
        className="mask mask-star-2 mask-half-2 bg-green-500"
        aria-label="5 star"
      />
    </div>
  );
}
