'use client';
import React from 'react';
import { Container } from '../../components/Container/Container';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { Post } from './Post/Post';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { toDateAndTime } from '@/utils/timeUtils';
import { News } from '@/modules/engagement/news/news.model';
import { Gallery } from '@/modules/engagement/gallery/gallery.model';

interface LatestNewsProps {
  newsList: News[];
  galleryList: Gallery[];
}

export const LatestNews = ({ newsList, galleryList }: LatestNewsProps) => {
  return (
    <section id="news" className="news py-10">
      <Container>
        <SectionHeading
          heading="News"
          subHeading="This is where you’ll find the latest news, updates, and important announcements. Stay informed about recent changes, upcoming events, and key information. Check back regularly to make sure you don’t miss anything important."
        />
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-10"
        >
          {galleryList.map((project) => (
            <SwiperSlide key={project.id}>
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
            <SwiperSlide key={post.id}>
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
      </Container>
    </section>
  );
};
