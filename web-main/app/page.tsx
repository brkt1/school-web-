import Layout, { Content } from "antd/lib/layout/layout";
import { AppHeader } from "@/modules/landing/components/AppHeader/AppHeader";
import { About } from "@/modules/landing/containers/About/About";
import { Pricing } from "@/modules/landing/containers/Pricing/Pricing";
import { TestimonialReview } from "@/modules/landing/containers/Testimonial/Testimonial";
import { Blogs } from "@/modules/landing/containers/Blog/Blog";
import { PartnerCards } from "@/modules/landing/containers/PartnerCards/PartnerCards";
import { Contact } from "@/modules/landing/containers/Contact/Contact";
import { AppFooter } from "@/modules/landing/components/AppFooter/AppFooter";
import { LatestNews } from "@/modules/landing/containers/LatestNews/LatestNews";
import { getGalleryServer } from "@/modules/engagement/gallery/gallery.service";
import { getNewsServer } from "@/modules/engagement/news/news.service";
import Registeration from "@/modules/landing/containers/Registeration/Registeration";
import Home from "@/modules/landing/containers/Home/Home";
import { getFeePackagesServer } from "@/modules/finance/fee_package/fee_package.service";


export default async function Landing() {
  const newsData = await getNewsServer({ pagination: { current: 1, pageSize: 6 } });
  const galleryData = await getGalleryServer({ pagination: { current: 1, pageSize: 6 } });
  const feePackagesData = await getFeePackagesServer({ pagination: { current: 1, pageSize: 10 } });

  const initialPosts = newsData?.results || [];
  const initialGallery = galleryData?.results || [];
  const feePackages = feePackagesData?.results || [];


  return (
    <Layout>
      <Content>
        <AppHeader />
        <Home initialPosts={initialPosts} />
        <LatestNews newsList={initialPosts} galleryList={initialGallery} />
        <About />
        <Registeration />
        <Pricing feePackages={feePackages} />
        <TestimonialReview />
        <Blogs />
        <PartnerCards />
        <Contact />
      </Content>
      <AppFooter />
    </Layout>
  );
}
