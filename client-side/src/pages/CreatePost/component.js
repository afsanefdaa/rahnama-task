import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet/es/Helmet';
import { useForm, Controller } from 'react-hook-form';
import {
  Input, Tag, Divider, Row, Button, notification,
  Upload, message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';
import { yupResolver } from '@hookform/resolvers';
import style from './index.module.scss';
import { createPost } from '../../api/post';
import { updatePostAction } from '../../store/posts/action';
import { CREATE_NEW_POST } from '../../resources/localization';
import CreatePostSchema from './validation';

const { TextArea } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const CreatePost = () => {
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const register = useRef(null);
  const dispatch = useDispatch();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(false);

  const openNotification = () => {
    notification.open({
      message: 'با موفقیت ثبت شد!',
      icon: <CheckOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const user = useSelector((state) => state.user);
  // const {
  //   handleSubmit, control, errors,
  // } = useForm({ validationSchema: CreatePostSchema });

  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(CreatePostSchema),
  });

  const uploadButton = (
    <div>
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">آپلود عکس</div>
    </div>
  );

  const onSubmit = async (data) => {
    setSubmitLoading(true);
    const body = {
      tags,
      author: {
        ...user.data,
      },
      ...data,
    };

    if (body) {
      const response = await createPost(body);
      if (response) {
        dispatch(updatePostAction(response, 'create'));
        setSubmitLoading(false);
        openNotification();
      }
    }
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setImageLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imgUrl) => {
        setImageUrl(imgUrl);
        setImageLoading(false);
      });
    }
  };

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible({ inputVisible: true }, () => register.focus());
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let newTags = tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...tags, inputValue];
    }
    setTags(newTags);
    setInputValue('');
    setInputVisible(false);
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);

  return (
    <div className={style.main}>
      <Helmet>
        <title>{CREATE_NEW_POST}</title>
      </Helmet>
      <span className={style.title}>{CREATE_NEW_POST}</span>
      <Divider orientation="right" plain />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <div className={style.inputWrapper}>
            <label>عنوان</label>
            <Controller
              as={Input}
              name="title"
              control={control}
            />

            {errors.title && <p className={style.error}>{errors.title.message}</p>}
          </div>
          <div className={style.inputWrapper}>
            <label>توضیحات</label>
            <Controller
              as={TextArea}
              name="description"
              control={control}
            />

            {errors.description && <p className={style.error}>{errors.description.message}</p>}
          </div>
        </Row>
        <Row className={style.tags}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
              onComplete: (e) => {
                e.target.style = '';
              },
            }}
            leave={{
              opacity: 0, width: 0, scale: 0, duration: 200,
            }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
          {inputVisible && (
            <Input
              ref={register}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag onClick={showInput} className="site-tag-plus">
              <PlusOutlined />
              تگ جدید
            </Tag>
          )}
        </Row>

        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <Row className={style.submit}>
          <Button type="submit" loading={submitLoading} htmlType="submit">
            ایجاد
          </Button>
        </Row>
      </form>
    </div>
  );
};

export default CreatePost;
