import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { Container } from '..';
import style from './index.module.scss';
import { LANDING_TITLE, CREATE_POST } from '../../resources/localization';

export const Header = () => {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user.data);

  return (
    <Container className={style.body}>
      <Row className={style.main}>
        <Col span={12} className={style.box}>
          <Link to="/" className={pathname === '/' && style.active}>
            {LANDING_TITLE}
          </Link>
          <Link to="/create-post" className={pathname === '/create-post' && style.active}>
            {CREATE_POST}
          </Link>
        </Col>
        <Col span={12}>
          <div className={style.user}>
            <div className={style.wrapper}>
              <img src={user?.avatar} alt={user?.first_name} />
            </div>
            <span className={style.name}>{`${user?.first_name} ${user?.last_name}`}</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
