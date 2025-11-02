// modules/landing/containers/Testimonial/TestimonialReview.tsx
import { getTestimonialsServer } from '@/modules/engagement/testimonial/testimonial.service';
import { Container } from '../../components/Container/Container';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import TestimonialCarousel from './TestimonialCarousel';

export const TestimonialReview = async () => {
  let reviews = [];

  try {
    const data = await getTestimonialsServer({ pagination: { current: 1, pageSize: 10 } });
    reviews = data?.results || [];
  } catch (error) {
    console.warn('Failed to fetch testimonials:', error);
    reviews = [];
  }

  return (
    <section id="testimonials">
      <Container>
        <SectionHeading
          heading="Testimonials"
          subHeading="Hear from our users and partners about their experiences. Discover how our platform has made a difference through real stories and honest feedback."
        />
      </Container>
      {/* Pass server-fetched reviews to client carousel */}
      <TestimonialCarousel reviews={reviews} />
    </section>
  );
};

export default TestimonialReview;
