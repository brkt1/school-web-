import { Gallery } from "@/modules/engagement/gallery/gallery.model";
import { getGalleryServer } from "@/modules/engagement/gallery/gallery.service";
import { News } from "@/modules/engagement/news/news.model";
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
  let initialPosts: News[] = [];
  let initialGallery: Gallery[] = [];

  try {
    const newsData = await getNewsServer({ pagination: { current: 1, pageSize: 6 } });
    initialPosts = newsData?.results || [];
  } catch (error: any) {
    // Suppress common API errors - backend issues, missing endpoints, or CORS
    const shouldSuppress = 
      error?.code === 'ECONNREFUSED' || 
      error?.code === 'ERR_NETWORK' ||
      error?.code === 'ERR_BAD_REQUEST' ||
      error?.response?.status === 404 ||
      error?.message?.includes('ECONNREFUSED') ||
      error?.message?.includes('connect') ||
      error?.message?.includes('404') ||
      error?.message?.includes('CORS');
    
    if (!shouldSuppress) {
      console.warn('Failed to fetch news:', error);
    }
    initialPosts = [];
  }

  try {
    const galleryData = await getGalleryServer({ pagination: { current: 1, pageSize: 6 } });
    initialGallery = galleryData?.results || [];
  } catch (error: any) {
    // Suppress common API errors - backend issues, missing endpoints, or CORS
    const shouldSuppress = 
      error?.code === 'ECONNREFUSED' || 
      error?.code === 'ERR_NETWORK' ||
      error?.code === 'ERR_BAD_REQUEST' ||
      error?.response?.status === 404 ||
      error?.message?.includes('ECONNREFUSED') ||
      error?.message?.includes('connect') ||
      error?.message?.includes('404') ||
      error?.message?.includes('CORS');
    
    if (!shouldSuppress) {
      console.warn('Failed to fetch gallery:', error);
    }
    initialGallery = [];
  }

  return (
    <Layout>
      <Content>
        <AppHeader />
        <Home />
        <LatestNews newsList={initialPosts} galleryList={initialGallery} />
        <Registeration />
        <PartnerCards />
      </Content>
      <AppFooter />
    </Layout>
  );
}
