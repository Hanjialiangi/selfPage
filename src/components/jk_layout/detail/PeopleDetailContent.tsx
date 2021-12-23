import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Properties } from '@pages/people_detail/Index';
import { CopyIcon } from '@src/assets/svg/picture';
import Clipboard from 'clipboard';
import { dingAlert } from '@src/dingtalkAPI';

export default function PeopleDetailContent(props: { info: any }): JSX.Element {
  const [baseInfo, setBaseInfo] = useState<any[]>(); //基础属性
  const usual = {
    marginBottom: '5px',
    flex: '1 0 auto',
    minWidth: '50%',
    alignItems: 'center',
    fontSize: '14px'
  }; //普通样式
  const strong = {
    marginBottom: '5px',
    flex: '1 0 auto',
    minWidth: '50%',
    alignItems: 'center',
    fontSize: '14px',
    width: '100%'
  }; //加强样式

  useEffect(() => {
    //处理props
    const array: Properties[] = [];
    props.info.map((item: Properties) => {
      if (item.key === 'current_state') {
        return;
      }
      array.push(item);
      setBaseInfo(array);
    });
  }, []);
  //处理复制到粘贴板
  const handleCopy = () => {
    const clipboard = new Clipboard('.destory');
    console.log(clipboard);
    clipboard.on('success', function (e) {
      dingAlert('复制成功', '正确', '确认');

      e.clearSelection();
    });
    clipboard.on('error', function () {
      dingAlert('复制失败', '失败', '确认');
    });
  };

  return (
    <Box>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: '10px'
        }}
      >
        {baseInfo?.map((item: Properties) => {
          return (
            <Typography
              key={item.key_id}
              style={item.value.length > 18 ? strong : usual}
            >
              <span
                style={{
                  color: 'gray',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.key_name}:
              </span>
              {item.key === 'contact' ? (
                <span
                  style={{
                    color: '#1790ff',
                    marginLeft: '10px',
                    textDecoration: 'underline'
                  }}
                >
                  <a href={`tel:${item.value}`}>{item.value}</a>
                  <button
                    className="destory"
                    onClick={handleCopy}
                    data-clipboard-text={item.value}
                  >
                    <CopyIcon />
                  </button>
                </span>
              ) : (
                <span
                  style={{
                    color: 'black',
                    marginLeft: '10px'
                  }}
                >
                  {item.value}
                </span>
              )}
            </Typography>
          );
        })}
      </div>
    </Box>
  );
}
