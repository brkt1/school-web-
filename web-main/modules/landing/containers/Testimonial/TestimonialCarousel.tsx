// modules/landing/containers/Testimonial/TestimonialCarousel.tsx
'use client';
import { Testimonial } from '@/modules/engagement/testimonial/testimonial.model';
import { Carousel, Image } from 'antd';
import React from 'react';
import { Container } from '../../components/Container/Container';
import './Testimonial.scss';

interface TestimonialCarouselProps {
  reviews: Testimonial[];
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ reviews }) => {
  return (
    <div className="testimonial">
      <Container className="testimonial__container">
        {reviews.length === 0 ? (
          <div className="empty-state">
            <p>No testimonials available.</p>
          </div>
        ) : (
          <Carousel className="testimonial__carousel" dotPosition="bottom" autoplay>
            {reviews.map((review) => (
              <div key={review.id} className="carousel__item">
                <p className="carousel__item-comment">{review.review}</p>
                <p className="carousel__item-commenter">
                  <span className="commenter__name">{review.name}</span>
                  {review.job ? `, ${review.job}` : ''}
                </p>
                {review.profile && (
                  <Image
                    preview={false}
                    className="carousel__item-avatar"
                    src={review.profile}
                    alt={review.name}
                    width={100}
                    height={100}
                  />
                )}
              </div>
            ))}
          </Carousel>
        )}
      </Container>
    </div>
  );
};

export default TestimonialCarousel;
