import { AppFooter } from "@/modules/landing/components/AppFooter/AppFooter";
import { TestimonialReview } from "@/modules/landing/containers/Testimonial/Testimonial";
import Layout, { Content } from "antd/lib/layout/layout";

export default async function TestimonialsPage() {
  return (
    <Layout>
      <Content>
        <TestimonialReview />
      </Content>
      <AppFooter />
    </Layout>
  );
}

