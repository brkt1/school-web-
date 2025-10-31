// modules/landing/containers/Testimonial/TestimonialReview.tsx
import React from 'react';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import TestimonialCarousel from './TestimonialCarousel';
import { TableParams } from '@/utils/table/table.model';
import { getTestimonialsServer } from '@/modules/engagement/testimonial/testimonial.service';

export const TestimonialReview = async () => {
  const data = await getTestimonialsServer({ pagination: { current: 1, pageSize: 10 } });
  const reviews = data.results || [];

  return (
    <>
      <SectionHeading
        heading="Testimonials"
        subHeading="Hear from our users and partners about their experiences. Discover how our platform has made a difference through real stories and honest feedback."
      />
      {/* Pass server-fetched reviews to client carousel */}
      <TestimonialCarousel reviews={reviews} />
    </>
  );
};

export default TestimonialReview;
