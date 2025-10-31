// modules/landing/containers/Testimonial/TestimonialCarousel.tsx
'use client';
import React from 'react';
import { Carousel, Image } from 'antd';
import { Container } from '../../components/Container/Container';
import { Testimonial } from '@/modules/engagement/testimonial/testimonial.model';
import './Testimonial.scss';

interface TestimonialCarouselProps {
  reviews: Testimonial[];
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ reviews }) => {
  return (
    <section className="testimonial py-10">
      <Container className="testimonial__container mt-10">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No testimonials available.</p>
        ) : (
          <Carousel className="testimonial__carousel" dotPosition="bottom" autoplay>
            {reviews.map((review) => (
              <div key={review.id} className="carousel__item text-center px-6">
                <p className="carousel__item-comment mb-4">{review.review}</p>
                <p className="carousel__item-commenter mb-2">
                  <span className="commenter__name font-semibold">{review.name}</span>
                  {review.job ? `, ${review.job}` : ''}
                </p>
                {review.profile && (
                  <Image
                    preview={false}
                    className="carousel__item-avatar rounded-full mx-auto"
                    src={review.profile}
                    alt={review.name}
                    width={80}
                    height={80}
                  />
                )}
              </div>
            ))}
          </Carousel>
        )}
      </Container>
    </section>
  );
};

export default TestimonialCarousel;
