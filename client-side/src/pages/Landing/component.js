import React from 'react';
import { Helmet } from 'react-helmet/es/Helmet';
import { Row, Col, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { LANDING_TITLE, WELCOME_TEXT } from '../../resources/localization';
import PostCard from '../../components/PostCard';
import style from './index.module.scss';

const LandingPage = () => {
  const posts = useSelector((state) => state.posts);

  return (
    <>
      <Helmet>
        <title>{LANDING_TITLE}</title>
      </Helmet>
      <Row className={style.welcome}>
        <span>{WELCOME_TEXT}</span>
      </Row>
      <Row gutter={16}>
        {posts?.loading ? <Spin size="large" className={style.spin} /> : posts?.data?.map((el) => (
          <Col className={style.col} key={el.id} xs={24} sm={12} md={8} lg={32}>
            <PostCard data={el} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default LandingPage;
