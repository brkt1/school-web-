'use client';
import React, { useState } from 'react'
import { Form, Col, Input, Row, message } from 'antd'
import TextArea from 'antd/lib/input/TextArea';

import { Container } from '../../components/Container/Container';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';

import contact from "../../../../assets/contact/contact.png";

import "./Contact.scss";
import { AppButton } from '../../components/AppButton/AppButton';
import Image from 'next/image';
import useHandleError from '@/utils/api/handleError';
import useContactUsService from '@/modules/feedback/contact_us/contact_us.service';
import { ContactUs } from '@/modules/feedback/contact_us/contact_us.model';

export const Contact = () => {
  const [form] = Form.useForm<ContactUs>();
  const [loading, setLoading] = useState<boolean>(); 
  const errorHandler = useHandleError();
  const contactService = useContactUsService();
  
    const addData = (value: ContactUs) => {
      setLoading(true)
      contactService.addContactUs(value).then((res) => {
        form.resetFields();
        message.success("Contact form submitted successfully!");
      }).catch((e) => {
        errorHandler.handleError(e, form)
      })
      .finally(() => setLoading(false));
    }
  
    const onFinish = (value: ContactUs) => {
      addData(value);
    };

  return (
    <section id="contact" className="contact">
      <Container>
        <SectionHeading
  heading="Get In Touch"
  subHeading="We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out. Our team is here to help and connect with you."
/>
        <Row gutter={24} className="contact__form">
          <Col sm={24} lg={12}>
            <Form form={form} onFinish={onFinish}>
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item name='full_name'>
                    <Input placeholder="Name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name='subject' >
                    <Input placeholder="Subject" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} md={24}>
                  <Form.Item name='email' >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
                {/* <Col xs={24} md={12}>
                  <Item >
                    <Input placeholder="Budget" />
                  </Item>
                </Col> */}
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item name='message'  >
                    <TextArea rows={5} placeholder="Write Message" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item>
                    <AppButton htmlType='submit' loading={loading} type="primary">
                      Submit
                    </AppButton>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col sm={24} lg={12}>
            <div className="contact__img">
              <Image src={contact} alt={"contact"} />
            </div>
          </Col>
        </Row>
      </Container>
    </section >
  )
}
