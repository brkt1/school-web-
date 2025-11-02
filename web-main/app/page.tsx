import { getGalleryServer } from "@/modules/engagement/gallery/gallery.service";
import { getNewsServer } from "@/modules/engagement/news/news.service";
import { AppFooter } from "@/modules/landing/components/AppFooter/AppFooter";
import { AppHeader } from "@/modules/landing/components/AppHeader/AppHeader";
import Home from "@/modules/landing/containers/Home/Home";
import { LatestNews } from "@/modules/landing/containers/LatestNews/LatestNews";
import { PartnerCards } from "@/modules/landing/containers/PartnerCards/PartnerCards";
import Registeration from "@/modules/landing/containers/Registeration/Registeration";
import Layout, { Content } from "antd/lib/layout/layout";


export default async function Landing() {
  // Gracefully handle API errors if backend is not available
  let initialPosts = [];
  let initialGallery = [];

  try {
    const newsData = await getNewsServer({ pagination: { current: 1, pageSize: 6 } });
    initialPosts = newsData?.results || [];
  } catch (error) {
    console.warn('Failed to fetch news:', error);
    initialPosts = [];
  }

  try {
    const galleryData = await getGalleryServer({ pagination: { current: 1, pageSize: 6 } });
    initialGallery = galleryData?.results || [];
  } catch (error) {
    console.warn('Failed to fetch gallery:', error);
    initialGallery = [];
  }

  return (
    <Layout>
      <Content>
        <AppHeader />
        <Home initialPosts={initialPosts} />
        <LatestNews newsList={initialPosts} galleryList={initialGallery} />
        <Registeration />
        <PartnerCards />
      </Content>
      <AppFooter />
    </Layout>
  );
}
