'use client';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import addis_ababa_university from '../../../../assets/partners/addis_ababa_university.jpg';
import cpu_college from '../../../../assets/partners/cpu_college.jpg';
import national_college from '../../../../assets/partners/national_college.jpg';
import rift_valley_university from '../../../../assets/partners/rift_valley_university.jpg';
import { Container } from '../../components/Container/Container';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import "./PartnerCards.scss";

const partners = [
  { name: 'Addis Ababa University', logo: addis_ababa_university, description: 'Prestigious public research university', url: '#' },
  { name: 'CPU College', logo: cpu_college, description: 'Quality education provider', url: '#' },
  { name: 'Rift Valley University', logo: rift_valley_university, description: 'Excellence in higher education', url: '#' },
  { name: 'National College', logo: national_college, description: 'Empowering future leaders', url: '#' },
];

export const PartnerCards = () => {
  return (
    <section id="service-locations" className="partner-cards">
      <Container>
        <SectionHeading
          heading="Service Locations"
          subHeading="We proudly serve educational institutions across Ethiopia, bringing our communication skills training to students, faculty, and professionals nationwide."
        />
        
        <div className="partner-cards__content">
          {partners.length === 0 ? (
            <div className="partner-cards__empty">
              <p className="partner-cards__empty-text">No service locations available at the moment.</p>
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={partners.length > 4}
              navigation
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ 
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              breakpoints={{
                480: { slidesPerView: 1.2, spaceBetween: 16 },
                640: { slidesPerView: 1.5, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 32 },
              }}
              className="partner-cards__swiper"
            >
              {partners.map((partner, index) => (
                <SwiperSlide key={partner.name}>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-card__link"
                  >
                    <div className="partner-card" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="partner-card__image-wrapper">
                        <Image
                          alt={partner.name}
                          src={partner.logo}
                          className="partner-card__image"
                          fill
                          sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 350px"
                        />
                        <div className="partner-card__overlay"></div>
                        <div className="partner-card__shine"></div>
                      </div>
                      <div className="partner-card__content">
                        <h3 className="partner-card__title">{partner.name}</h3>
                        {partner.description && (
                          <p className="partner-card__description">{partner.description}</p>
                        )}
                      </div>
                      <div className="partner-card__accent"></div>
                      <div className="partner-card__glow"></div>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </Container>
    </section>
  );
};
