import Page from '@components/layout/Page';
import {
  Box,
  FormControl,
  Grid,
  Input,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Select
} from '@material-ui/core';
import React, { useState } from 'react';
import moment from 'moment';
import StyleRadio from '@components/jk_layout/StyleRadio';

export default function Add(): JSX.Element {
  const [arriveTime, setArriveTime] = useState(
    moment().format('YYYY-MM-DDTHH:mm')
  ); //抵蓉时间
  const [isolationTime, setIsolationTime] = useState(
    moment().format('YYYY-MM-DDTHH:mm')
  ); //隔离时间
  const [radioDialog, setRadioDialog] = useState({
    isolation: '是',
    is_guide: '是'
  });
  const [isolationType, setIsolationType] = useState('集中隔离'); //隔离类型

  //提交动作
  const submit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
  };
  const object = [
    {
      key: 'name',
      name: '姓名',
      placeholder: '请输入姓名'
    },
    {
      key: 'phone',
      name: '联系方式',
      placeholder: '请输入联系方式'
    },
    {
      key: 'id_card',
      name: '身份证号码',
      placeholder: '请输入身份证号码'
    },
    {
      key: 'source',
      name: '来源属性',
      placeholder: '请输入来源属性'
    },
    {
      key: 'village',
      name: '所在村(社区)',
      placeholder: '请输入所在社区(区，镇，村）'
    },
    {
      key: 'address',
      name: '市内详细居住地址',
      placeholder: '请输入详细居住地址'
    },
    {
      key: 'country',
      name: '国籍',
      placeholder: '请输入国籍'
    },
    {
      key: 'where',
      name: '从何处抵蓉',
      placeholder: '请输入从何处抵蓉'
    },
    {
      key: 'arrive_time',
      name: '抵蓉时间',
      placeholder: '请输入抵蓉时间'
    },
    {
      key: 'isolation',
      name: '是否隔离',
      placeholder: '是/否'
    },
    {
      key: 'isolation_time',
      name: '隔离时间',
      placeholder: 'xx月xx日'
    },
    {
      key: 'isolation_type',
      name: '隔离方式',
      placeholder: '居家隔离、集中隔离'
    },
    {
      key: 'arrive_way',
      name: '抵蓉路径',
      placeholder: '如xx月xx日,乘xxxx航班,从xx到xx'
    },
    {
      key: 'is_guide',
      name: '是否报属地指挥部',
      placeholder: '是/否'
    }
  ]; //科目

  //单选框集成
  const Radio = (props: { name: string; value: string }) => {
    return (
      <RadioGroup
        style={{ justifyContent: 'end' }}
        row
        aria-label="gender"
        name={props.name}
        value={props.value}
        onChange={updateDetail}
      >
        <FormControlLabel value="是" control={<StyleRadio />} label="是" />
        <FormControlLabel value="否" control={<StyleRadio />} label="否" />
      </RadioGroup>
    );
  };

  //单选框按钮改变
  const updateDetail = (e: any) => {
    setRadioDialog({
      ...radioDialog,
      [e.target.name]: e.target.value
    });
  };

  //渲染组件
  const renderGraph = (key: string, placeholder: string) => {
    if (key === 'arrive_time') {
      return (
        <TextField
          style={{
            textAlign: 'center',
            fontSize: '16px'
          }}
          name="arrive_time"
          type="datetime-local"
          onChange={(e: any) => {
            setArriveTime(e.target.value);
          }}
          value={arriveTime}
          InputLabelProps={{
            shrink: true
          }}
        />
      );
    } else if (key === 'isolation_time') {
      return (
        <TextField
          style={{
            textAlign: 'center',
            fontSize: '16px'
          }}
          name="isolation_time"
          type="datetime-local"
          onChange={(e: any) => {
            setIsolationTime(e.target.value);
          }}
          value={isolationTime}
          InputLabelProps={{
            shrink: true
          }}
        />
      );
    } else if (key === 'isolation') {
      return <Radio name="isolation" value={radioDialog.isolation} />;
    } else if (key === 'is_guide') {
      return <Radio name="is_guide" value={radioDialog.is_guide} />;
    } else if (key === 'isolation_type') {
      return (
        <Select
          className="isolation_type"
          value={isolationType}
          native
          style={{ display: 'flex' }}
          onChange={(e: any) => {
            setIsolationType(e.target.value);
          }}
        >
          <option value="集中隔离">集中隔离</option>
          <option value="居家隔离">居家隔离</option>
        </Select>
      );
    } else {
      return (
        <Input
          name={key}
          placeholder={placeholder}
          disableUnderline
          multiline
          fullWidth
          style={{ textAlign: 'center', fontSize: '16px' }}
        />
      );
    }
  };
  return (
    <Page title="录入管控人员">
      <div className="title">
        <h4>录入管控信息</h4>
      </div>
      <form onSubmit={submit}>
        {object.map(item => {
          return (
            <Box marginY={0.2} padding={0.5} key={item.key}>
              <Grid container spacing={2} style={{ width: '100%' }}>
                <Grid item xs={5}>
                  <FormControl
                    style={{
                      lineHeight: '30px',
                      marginLeft: '7%'
                    }}
                  >
                    {item.name}
                  </FormControl>
                </Grid>
                <Grid item xs={7}>
                  {renderGraph(item.key, item.placeholder)}
                </Grid>
              </Grid>
            </Box>
          );
        })}
        <Box
          margin={0.5}
          paddingTop={0.5}
          marginBottom={5}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button
            type="submit"
            variant="outlined"
            style={{
              background: '#1790FF',
              color: '#FFFFFF',
              width: '95%',
              height: '47px',
              fontSize: '16px'
            }}
          >
            确认并录入
          </Button>
        </Box>
      </form>
    </Page>
  );
}
