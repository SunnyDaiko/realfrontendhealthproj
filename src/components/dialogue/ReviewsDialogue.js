import React, { useState, useRef } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import mods from './ReviewsDialogue.module.css';

/**
 * Generates fake reviews and displays them in a dialog.
  * @type {Array<object>} - Array of fake reviews.
 */
const FakeReviewGenerator = () => {
  const sortSelectRef = useRef(null);
  const fakeReviews = [
    {
      id: 1,
      rating: 4.5,
      title: 'Loved it',
      username: 'John Patrick',
      description: 'Great product! Highly recommended.',
      dateCreated: new Date('2023-06-01')
    },
    {
      id: 2,
      rating: 3,
      title: 'Good product',
      username: 'Janet Morris',
      description: 'Good value for the price.',
      dateCreated: new Date('2023-05-28')
    },
    {
      id: 3,
      rating: 2.5,
      title: 'Average',
      username: 'David Johnson',
      description: 'Average quality, but does the job.',
      dateCreated: new Date('2023-06-10')
    },
    {
      id: 4,
      rating: 4,
      title: 'Satisfied',
      username: 'Emily Davis',
      description: 'Happy with the purchase.',
      dateCreated: new Date('2023-06-03')
    },
    {
      id: 5,
      rating: 1.5,
      title: 'Not recommended',
      username: 'Michael Wilson',
      description: 'Not satisfied with the product.',
      dateCreated: new Date('2023-05-30')
    },
    {
      id: 6,
      rating: 5,
      title: 'Excellent',
      username: 'Olivia Martinez',
      description: 'The best product I have ever bought!',
      dateCreated: new Date('2023-06-09')
    },
    {
      id: 7,
      rating: 3.5,
      title: 'Decent',
      username: 'Kōki Kurata',
      description: 'Does the job but has some flaws.',
      dateCreated: new Date('2023-06-07')
    },
    {
      id: 8,
      rating: 2,
      title: 'Not worth it',
      username: 'Mukul Korrapati',
      description: 'Disappointed with the quality.',
      dateCreated: new Date('2023-06-02')
    },
    {
      id: 9,
      rating: 4.5,
      title: 'Great value',
      username: 'Haruki Kanemaru',
      description: 'Impressed with the design.',
      dateCreated: new Date('2023-06-08')
    },
    {
      id: 10,
      rating: 4,
      title: 'Impressive quality',
      username: 'Yvan Milani',
      description: 'The product exceeded my expectations. Great material, a litle pricey, but I am satisfied.',
      dateCreated: new Date('2023-06-12')
    },
    {
      id: 12,
      rating: 2.5,
      title: 'Not worth the money',
      username: 'Aidan Swanson',
      description: 'Disappointed with the product\'s feeling on my skin.',
      dateCreated: new Date('2023-06-05')
    },
    {
      id: 13,
      rating: 4,
      title: 'Perfect fit!',
      username: 'Fatime Shqipe',
      description: 'The clothing item fits perfectly and is comfortable to wear.',
      dateCreated: new Date('2023-06-12')
    },
    {
      id: 14,
      rating: 2.5,
      title: 'Not as expected',
      username: 'Janeth Kwabena',
      description: 'The color of the clothing item is different from the picture.',
      dateCreated: new Date('2023-06-05')
    },
    {
      id: 15,
      rating: 3.5,
      title: 'Average product',
      username: 'Benjamin Clark',
      description: 'It\'s okay, nothing exceptional.',
      dateCreated: new Date('2023-06-05')
    },
    {
      id: 16,
      rating: 4.5,
      title: 'Satisfied',
      username: 'Rene Amoura Godfrey',
      dateCreated: new Date('2023-06-05')
    },
    {
      id: 17,
      rating: 0.5,
      username: 'Oliver Foster',
      dateCreated: new Date('2023-06-01')
    },
    {
      id: 18,
      rating: 1,
      username: 'Samuel Underwood',
      dateCreated: new Date('2023-06-09')
    },
    {
      id: 19,
      rating: 0.5,
      username: 'Ahmed Muhammad',
      dateCreated: new Date('2023-06-17')
    },
    {
      id: 20,
      rating: 3.5,
      title: 'Decent product',
      username: 'Qiu Leong',
      description: 'The item is decent, but nothing extraordinary.',
      dateCreated: new Date('2023-06-02')
    },
    {
      id: 21,
      rating: 4.5,
      title: 'Great design',
      username: 'Calleigh Bardsley',
      description: 'The item has a unique and trendy design. Received many compliments.',
      dateCreated: new Date('2023-06-09')
    }
  ];

  /**
   * State for the sort order of the reviews by date.
   * @type {[string, function]}
   */
  const [sortOrder, setSortOrder] = useState('newest');

  /**
   * Handles the change in sort order.
   * @param {Event} event - The change event.
   */
  const handleSortChange = () => {
    const selectedValue = sortSelectRef.current.value;
    setSortOrder(selectedValue);
  };

  /**
   * Generates star icons based on the rating.
   * @param {number} rating - The rating value.
   * @returns {Array<ReactElement>} - Array of star icons.
   */
  const generateStars = (rating) => {
    const starIcons = [];

    for (let i = 1; i <= 5; i += 1) {
      const isFilled = i <= rating;
      const key = `star-${i}`;
      const StarIconComponent = isFilled ? StarIcon : StarOutlineIcon;
      starIcons.push(<StarIconComponent key={key} />);
    }

    return starIcons;
  };

  /**
   * Sorts the reviews based on the current sort order.
   * @param {Array<object>} reviews - The array of reviews to be sorted.
   * @returns {Array<object>|string} - Sorted array of reviews or the current sort order.
   */
  const sortReviews = (reviews) => {
    if (sortOrder === 'oldest') {
      return reviews.sort((a, b) => a.dateCreated - b.dateCreated);
    } if (sortOrder === 'newest') {
      return reviews.sort((a, b) => b.dateCreated - a.dateCreated);
    }

    return sortOrder;
  };

  /**
   * Generates the fake reviews with sorting and formatting.
   * @returns {Array<ReactElement>} - Array of review components.
   */
  const generateFakeReviews = () => {
    const sortedReviews = sortReviews(fakeReviews);
    const numReviews = 20;
    const reviews = [];
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    for (let i = 0; i < numReviews; i += 1) {
      const review = sortedReviews[i];
      const starRating = generateStars(review.rating);

      reviews.push(
        <div key={review.id}>
          <hr />
          <div>
            {' '}
            {review.username}
            {' '}
            {'on'}
            {' '}
            {review.dateCreated.toLocaleDateString(undefined, options)}
          </div>
          <div>
            {' '}
            <p className={mods.star}>{starRating}</p>
            <div>
              {' '}
              <p className={mods.revTitle}>{review.title}</p>
            </div>
          </div>
          <div>
            {' '}
            {review.description}
          </div>
          <div className={mods.info}>
            {' '}
          </div>
        </div>
      );
    }

    return reviews;
  };

  return (
    <div>
      <div className={mods.dropdown}>
        <select id="sort-select" ref={sortSelectRef} value={sortOrder} onChange={handleSortChange}>
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
      </div>
      {generateFakeReviews()}
    </div>
  );
};

/**
 * Dialog component for displaying reviews.
 * @param {object} props - The component props.
 * @param {boolean} props.open - Whether the dialog is open.
 * @param {function} props.onClose - The function to handle dialog close.
 * @param {object} props.product - The product object.
 * @returns {ReactElement} - The ReviewsDialogue component.
 */
const ReviewsDialogue = ({ open, onClose, product }) => (
  <Dialog className={mods.form} open={open} onClose={onClose} aria-labelledby="reviews-dialog-title">
    <DialogTitle className={mods.dTitle} id="reviews-dialog-title">
      {' '}
      Reviews for
      {' '}
      {product.name}
    </DialogTitle>
    <DialogContent className={mods.dialogContent}>
      <DialogContentText />
      <FakeReviewGenerator />
    </DialogContent>
    <DialogActions>
      <Button className={mods.close} onClick={onClose}>
        X
      </Button>
    </DialogActions>
  </Dialog>
);

export default ReviewsDialogue;
