'use client';
import { Gallery } from '@/modules/engagement/gallery/gallery.model';
import { News } from '@/modules/engagement/news/news.model';
import { toDateAndTime } from '@/utils/timeUtils';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Container } from '../../components/Container/Container';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { Post } from './Post/Post';

interface LatestNewsProps {
  newsList: News[];
  galleryList: Gallery[];
}

export const LatestNews = ({ newsList, galleryList }: LatestNewsProps) => {
  const allItems = [...galleryList, ...newsList];

  return (
    <section id="news" className="news">
      <Container>
        <SectionHeading
          heading="Latest News & Updates"
          subHeading="This is where you'll find the latest news, updates, and important announcements. Stay informed about recent changes, upcoming events, and key information. Check back regularly to make sure you don't miss anything important."
        />
        {allItems.length === 0 ? (
          <div className="news__empty">
            <p className="news__empty-text">No news available at the moment. Check back soon!</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            loop={allItems.length > 3}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ 
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              480: { slidesPerView: 1.2, spaceBetween: 16 },
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
              1280: { slidesPerView: 3, spaceBetween: 40 },
            }}
            className="news__swiper"
          >
            {galleryList.map((project) => (
              <SwiperSlide key={`gallery-${project.id}`}>
                <Post
                  title={project.title}
                  img={project.image}
                  alt={project.title}
                  publishedTime={toDateAndTime(project.create_date)}
                  url={project?.url}
                  target="_blank"
                />
              </SwiperSlide>
            ))}
            {newsList.map((post) => (
              <SwiperSlide key={`news-${post.id}`}>
                <Post
                  title={post.title}
                  description={post.short_description}
                  publishedTime={toDateAndTime(post.create_date)}
                  img={post.image}
                  alt={post.title}
                  url={`/news/${post.id}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
    </section>
  );
};
