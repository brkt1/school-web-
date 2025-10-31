'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { toDateAndTime } from '@/utils/timeUtils';
import { News } from '@/modules/engagement/news/news.model';
import { HorizontalPost } from '../LatestNews/HorizonalPost/HorizontalPost';

interface NewsCarouselProps {
  posts: News[];
}

export const NewsCarousel = ({ posts }: NewsCarouselProps) => {
  return (
    <Swiper
      className='!hidden md:!block'
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      loop
      navigation={{ nextEl: null, prevEl: null }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
    >
      {posts.map((post) => (
        <SwiperSlide key={post.id}>
          <HorizontalPost
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
  );
};
