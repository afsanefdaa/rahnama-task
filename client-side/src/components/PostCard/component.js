// @flow
import React from 'react';
import {
  Row, Card, Avatar, Typography, Tag, Col, Badge,
  Menu, Dropdown,
} from 'antd';
import { ShareAltOutlined, CommentOutlined, LikeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import style from './index.module.scss';
import { dateFormat } from '../../utils/index';
import { likePost } from '../../api/post/index';
import { updatePostAction } from '../../store/posts/action';

const { Meta } = Card;
const { Paragraph } = Typography;

type componentProps = {
  data: {
    id: string,
    title: string,
    image: string,
    likes: number,
    author: {
      first_name: string,
      last_name: string,
      avatar: string,
    },
    created_at: string,
    tags: Array,
    description: string,
  }
};

const PostCard = ({ data }: componentProps) => {
  const dispatch = useDispatch();
  const handleAction = async (e, type) => {
    e.stopPropagation();

    if (type === 'like') {
      const response = await likePost(data?.id);
      await dispatch(updatePostAction(response, 'like', data?.id));
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a target="_blank" rel="noopener noreferrer" href="http://www.whatsapp.com/">
          اشتراک گذاری در واتس اپ
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" href="http://www.telegram.com/">
          اشتراک گذاری در تلگرام
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a target="_blank" rel="noopener noreferrer" href="http://www.linkedin.com/">
          اشتراک گذاری در لینکداین
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      className={style.card}
      cover={(
        <Link to={`/post/${data?.id}`}>
          <div className={style.imageWrapper}>
            <img
              alt={data?.title}
              src={data?.image}
            />
          </div>
        </Link>
      )}
      actions={[
        <div className={style.likesWrapper}>
          <Badge count={data?.likes} />
          <LikeOutlined key="like" onClick={(e) => handleAction(e, 'like')} />
        </div>,
        <CommentOutlined key="comment" onClick={(e) => handleAction(e, 'comment')} />,
        <Dropdown overlay={menu} trigger={['click']}>
          <ShareAltOutlined key="share" />
        </Dropdown>,
      ]}
    >
      <Row className={style.dateWrapper}>
        <Col>{`${data?.author?.first_name} ${data?.author?.last_name}`}</Col>
        <Col>{dateFormat(data?.created_at)}</Col>
      </Row>
      <Row className={style.tagWrapper}>
        {
          data?.tags?.map((el) => <Tag key={el} color="#dedede">{el}</Tag>)
        }
      </Row>
      <Meta
        avatar={<Avatar src={data?.author?.avatar} />}
        title={data?.title}
        description={(
          <Paragraph className={style.description} ellipsis={{ rows: 5, expandable: false, symbol: 'more' }}>
            {data?.description}
          </Paragraph>
        )}
      />
    </Card>
  );
};

export default PostCard;
