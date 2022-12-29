import React, { useState } from 'react';
import { Comment, Tooltip, Avatar, Button, Form } from 'antd';
import moment from 'moment';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled
} from '@ant-design/icons';
import '../styles/comment.scss';
import TextArea from 'antd/lib/input/TextArea';
import { useRef } from 'react';

interface M {
  concat: {
    id: number;
    author: string;
    sayer: string;
    url: string;
    content: string;
    time: string;
  };
}
const list = [
  {
    id: 2,
    author: 'e',
    sayer: 'e',
    url: 'https://joeschmoe.io/api/v1/random',
    content: 'why?',
    time: '2022-04-15 11:00'
  },
  {
    id: 3,
    author: 'e',
    sayer: 'mtj',
    url: 'https://joeschmoe.io/api/v1/random',
    content: 'I am from Japan,I am Janpanse!',
    time: '2022-04-15 11:05'
  }
];

export default function CommentComponent(): JSX.Element {
  const textRef = useRef(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState('');

  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [recieve, setRecieve] = useState('');

  const [initMessage, setInitMessage] = useState({
    id: 1,
    author: 'e',
    sayer: 'e',
    url: 'https://joeschmoe.io/api/v1/random',
    content: 'where are you from ,man?',
    time: '2022-04-15 10:00'
  });
  const [messageList, setMessageList] = useState(list);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const handleSubmit = () => {
    if (value) {
      setLoading(true);
      const legth = messageList.length;
      const Param = [
        ...messageList,
        {
          id: legth + 2,
          author: 'mtj',
          sayer: 'mtj',
          url: 'https://joeschmoe.io/api/v1/random',
          content: value,
          time: moment().format('YYYY-MM-DD HH:mm:ss')
        }
      ];
      setMessageList(Param);
    }
  };

  //动作
  const actions = (sayer: string) => [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {action === 'liked' ? <LikeFilled /> : <LikeOutlined />}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span
      key="comment-basic-reply-to"
      onClick={() => {
        setIsShow(true);
        setRecieve(sayer);
      }}
    >
      回复
    </span>
  ];

  //回复条
  const ExampleCommit = (props: M) => {
    return (
      <Comment
        actions={actions(props.concat.sayer)}
        author={<a>{props.concat.sayer}</a>}
        avatar={<Avatar src={props.concat.url} alt={props.concat.sayer} />}
        content={<p>{props.concat.content}</p>}
        datetime={
          <Tooltip title={props.concat.time}>
            <span>{moment(props.concat.time).fromNow()}</span>
          </Tooltip>
        }
      ></Comment>
    );
  };

  //编辑框
  const Editor = () => (
    <>
      <Form.Item>
        <TextArea
          ref={textRef}
          style={{ width: '95%', margin: '20px' }}
          rows={4}
          onChange={e => {
            setValue(e.target.value);
            console.log(textRef.current);
          }}
          placeholder={`@${recieve}`}
          value={value}
        />
      </Form.Item>
      <Form.Item>
        <Button
          style={{ margin: '20px' }}
          htmlType="submit"
          loading={loading}
          onClick={handleSubmit}
          type="primary"
        >
          回复
        </Button>
      </Form.Item>
    </>
  );

  return (
    <>
      <ExampleCommit concat={initMessage}></ExampleCommit>
      {isShow ? <Editor /> : null}
    </>
  );
}
