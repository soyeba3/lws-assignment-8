import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import {
  useAddBookMutation,
  useEditBookMutation,
} from "../features/api/apiSlice";

const Form = ({ book = {} }) => {
  const { id } = book;
  const [addBook, { isLoading }] = useAddBookMutation();
  const [editBook] = useEditBookMutation(id);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (book?.id) {
      setIsEditing(true);
      setName(book?.name);
      setAuthor(book?.author);
      setThumbnail(book?.thumbnail);
      setPrice(book?.price);
      setRating(book?.rating);
      setFeatured(book?.featured);
    }
  }, [id]);

  const resetForm = () => {
    setName("");
    setAuthor("");
    setThumbnail("");
    setPrice("");
    setRating("");
    setFeatured(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditing) {
      addBook({ name, author, thumbnail, price, rating, featured });
    } else {
      editBook({ name, author, thumbnail, price, rating, featured, id });
    }

    resetForm();
    navigate("/");
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="lws-bookName">Book Name</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-bookName"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lws-author">Author</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lws-thumbnail">Image Url</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-thumbnail"
          name="thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-8 pb-4">
        <div className="space-y-2">
          <label htmlFor="lws-price">Price</label>
          <input
            required
            className="text-input"
            type="number"
            id="lws-price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lws-rating">Rating</label>
          <input
            required
            className="text-input"
            type="number"
            id="lws-rating"
            min="1"
            max="5"
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="lws-featured"
          type="checkbox"
          className="w-4 h-4"
          name="featured"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        <label htmlFor="lws-featured" className="ml-2 text-sm">
          {" "}
          This is a featured book{" "}
        </label>
      </div>

      <button type="submit" className="submit" id="lws-submit">
        {!isEditing ? "Add Book" : "Update Book"}
      </button>
      {isLoading && <Spinner />}
    </form>
  );
};

export default Form;
