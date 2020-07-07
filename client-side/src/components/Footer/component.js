import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '..';
import style from './index.module.scss';

export const Footer = () => (
  <div className={style.body}>
    <Container className={style.box}>
      <div className={style.cols}>
        <span className={style.title}>پروژه تست</span>
        <Link to="/">موقعیت های شغلی</Link>
        <Link to="/">اخبار</Link>
        <Link to="/">سیاست ها</Link>
        <Link to="/">درباره ما</Link>
      </div>
      <div className={style.cols}>
        <span className={style.title}>پیدا کنید</span>
        <Link to="/">کنفرانس تهران</Link>
        <Link to="/">کنفرانس اصفهان</Link>
        <Link to="/">کنفرانس مشهد</Link>
      </div>
      <div className={style.cols}>
        <span className={style.title}>پشتیبانی</span>
        <Link to="/">کمک نیاز دارید؟</Link>
        <Link to="/">تماس با ما</Link>
      </div>
    </Container>
    <span className={style.copyRight}>©۱۳۹۹ پروژه تست</span>
  </div>
);

export default Footer;
