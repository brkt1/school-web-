'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';

import { Member } from './Member/Member';
import { Container } from '../../components/Container/Container';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';

import "./Team.scss"
import { TeamMember } from '@/modules/organization/team_member/team_member.model';
import useTeamMemberService from '@/modules/organization/team_member/team_member.service';
import { TableParams } from '@/utils/table/table.model';
import { getRequestParams } from '@/utils/table/table.utils';

export const Team = () => {
  const [memberList, setMemberList] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sorter: [],
  });

  const service = useTeamMemberService();
  const requestParams = useMemo(() => getRequestParams({ ...tableParams, searchText }), [tableParams, searchText]);

  const fetchData = useCallback(() => {
    setLoading(true);
    service.getTeamMembers(requestParams)
      .then((res) => {
        setMemberList(res?.data?.results);
        const newTotal = res?.data?.count;
        setTableParams((prev) => {
          if (prev.pagination?.total === newTotal) return prev;
          return { ...prev, pagination: { ...prev.pagination, total: newTotal } };
        });
      })
      .finally(() => setLoading(false));
  }, [requestParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <section id="team" className="team">
      <Container>
        <SectionHeading
  heading="Team Members"
  subHeading="Meet the talented individuals behind our success. Our team brings diverse skills, passion, and dedication to every project we take on."
/>
        <Row gutter={[24, 24]} justify="center">
          {
            memberList?.map(member => (
              <Col xs={20} sm={12} md={8} lg={6} key={member.full_name + member.position}>
                <Member
                  name={member.full_name}
                  position={member.position}
                  img={member.profile}
                  facebook={member.facebook_link}
                  twitter={member.twitter_link}
                  linkedin={member.linkedin_link}
                />
              </Col>
            ))
          }
        </Row>
      </Container>
    </section>
  )
}
