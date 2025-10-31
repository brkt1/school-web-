import React from 'react';
import { Row, Col, Space } from 'antd';
import "./Home.scss";
import { Container } from '../../components/Container/Container';
import { AppButton } from '../../components/AppButton/AppButton';
import img from '../../../../assets/home/intro.png';
import Image from 'next/image';
import Link from 'next/link';
import { BiDownArrow } from 'react-icons/bi';
import { News } from '@/modules/engagement/news/news.model';
import useNewsService from '@/modules/engagement/news/news.service';
import { TableParams } from '@/utils/table/table.model';
import { getRequestParams } from '@/utils/table/table.utils';
import { NewsCarousel } from './NewsCarousel';

interface HomeProps {
  initialPosts: News[];
}

const Home = ({ initialPosts }: HomeProps) => {
  return (
    <section id="home" className="home">
      <Container className="home__container">
        <Row>
          <Col xs={24} md={12} className="home__intro">
            <h1 className="intro__heading">Take the Stage Trading P.L.C.</h1>
            <p className="intro__sub-heading">SPEAK LIKE A LEADER!</p>
            <Space size={"large"} className="intro__button-group">
              <Link href="#registeration" passHref>
                <AppButton className="flex items-center gap-2 group">
                  Register Here
                  <BiDownArrow className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
                </AppButton>
              </Link>
            </Space>
          </Col>
          <Col xs={24} md={12} className="home__img-wrapper">
            <Image className="home__img" src={img} alt={"Home"} />
          </Col>
        </Row>

        <Row>
          {/* <NewsCarousel posts={initialPosts} /> */}
        </Row>
      </Container>
    </section>
  );
};

export default Home;

// Server-side fetching
export async function getServerSideProps() {
  const service = useNewsService(); // your news service
  const tableParams: TableParams = {
    pagination: { current: 1, pageSize: 6 },
    sorter: [],
  };
  const requestParams = getRequestParams(tableParams);
  const res = await service.getNewss(requestParams);

  return {
    props: {
      initialPosts: res.data?.results || [],
    },
  };
}
