"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Col, Image, Row, Space } from "antd";
import { SearchOutlined, LinkOutlined } from "@ant-design/icons";

import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import { Container } from "../../components/Container/Container";

import img01 from "../../../../assets/showcase/pj01.jpg";
import img02 from "../../../../assets/showcase/pj02.jpg";
import img03 from "../../../../assets/showcase/pj03.jpg";
import img04 from "../../../../assets/showcase/pj04.jpg";
import img05 from "../../../../assets/showcase/pj05.jpg";

import "./Showcase.scss";
import { Gallery } from "@/modules/engagement/gallery/gallery.model";
import { TableParams } from "@/utils/table/table.model";
import useGalleryService from "@/modules/engagement/gallery/gallery.service";
import { getRequestParams } from "@/utils/table/table.utils";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import { Post } from "../LatestNews/Post/Post";
import { toDateAndTime } from "@/utils/timeUtils";

export const Showcase = () => {
  const [projectList, setProjectList] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sorter: [],
  });

  const service = useGalleryService();
  const requestParams = useMemo(
    () => getRequestParams({ ...tableParams, searchText }),
    [tableParams, searchText]
  );

  const fetchData = useCallback(() => {
    setLoading(true);
    service
      .getGallerys(requestParams)
      .then((res) => {
        setProjectList(res?.data?.results);
        const newTotal = res.data?.count;
        setTableParams((prev) => {
          if (prev.pagination?.total === newTotal) return prev;
          return {
            ...prev,
            pagination: { ...prev.pagination, total: newTotal },
          };
        });
      })
      .finally(() => setLoading(false));
  }, [requestParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
//     <section id="showcase" className="showcase">
//       <Container fluid className="showcase__container">
//         <SectionHeading
//   className="showcase__heading"
//   heading="Recent Works"
//   subHeading="Take a look at some of our latest projects and accomplishments. These examples showcase our skills, creativity, and commitment to delivering high-quality results."
// />
//       </Container>
//       <div className="showcase__slider">
        // <Row gutter={projectList?.length} className="justify-center">
        <>
          {projectList?.map((project) => (
            // <Link target="_blank" href={project?.url}>
            // <Col key={project.id}>
            //   <Image.PreviewGroup items={projectList?.map((proj) => proj.image)}>
            //     <Image preview={false} className="bg-white" width={200} src={project.image} />
            //   </Image.PreviewGroup>
            // </Col>
            // </Link>
            <SwiperSlide key={project.id}>
              <Post
                title={project.title}
                img={project.image}
                alt={project.title}
                publishedTime={toDateAndTime(project.create_date)}
                url={project.url}
                target="_blank"
              />
            </SwiperSlide>
          ))}
          </>
        /* </Row> */
    //   </div>
    // </section>
  );
};
