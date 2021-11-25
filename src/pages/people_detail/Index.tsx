import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import { useParams } from 'react-router';
import {
  Box,
  Typography,
  Paper,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PeopleDetailHeader from '@components/jk_layout/detail/PeopleDetailHeader';
import PeopleDetailContent from '@components/jk_layout/detail/PeopleDetailContent';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import commonStyle from '@styleModules/common.module.scss';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import BlockIcon from '@material-ui/icons/Block';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import '@src/styles/modules/detail/detail.scss';
import { getResidentInfo } from '@src/api';
import StatusIcon from '@components/StatusIcon';

export type Properties = {
  key: string;
  key_id: number;
  key_name: string;
  value: string;
};

const status = 3; //状态
export default function PeopleDetailPage(): JSX.Element {
  const param: { id: string } = useParams(); //获取路由参数
  const [name, setName] = useState(''); //人员名字
  const [residentProperty, setResidentProperty] = useState(''); //人员属性
  const [quarantineType, setQuarantineType] = useState(''); //隔离方式
  /* 是否显示转运按钮 */
  const [isTransferButtonVisible, setIsTransferButtonVisible] = useState(true);

  /* 是否显示接收并开始隔离 */
  const [isArriveButtonVisible, setisArriveButtonVisible] = useState(true);

  /* 转运 */
  const handleTransferOrder = async () => {
    window.location.href = `/detail/transfer/${param.id}/edit`;
  };

  /* 修改信息 */
  const handleFixOrder = async () => {
    window.location.href = `/detail/resident/${param.id}/baseinfo/edit`;
  };
  /* 修改接收并开始隔离 */
  const handleArrive = async () => {
    window.location.href = `/detail/arrive/${param.id}/edit`;
  };
  /* 上报采样结果 */
  const handleSamplingResult = async () => {
    window.location.href = `/detail/samplingresult/${param.id}/edit`;
  };

  /* 上报健康状况 */
  const handleHealth = async () => {
    window.location.href = `/detail/health/${param.id}/edit`;
  };

  const [information, setInformation] = useState<Properties[]>();
  const [expandInformation, setExpandInformation] = useState<Properties[]>();
  const Init = async (id: string) => {
    //TODO://根据id获取信息
    const res = await getResidentInfo(id);
    if (res.code == 200) {
      res.data.map((item: Properties, index: number) => {
        if (item.key === 'name') {
          setName(item.value);
        }
        if (item.key === 'resident_property') {
          setResidentProperty(item.value);
        }
        if (item.key === 'quarantine_type') {
          setQuarantineType(item.value);
        }
        if (item.key_name === '预计隔离酒店') {
          setExpandInformation(res.data.slice(index)); //初始卡片渲染
          setInformation(res.data.slice(0, index + 1)); //伸展卡片渲染
        }
      });
    }
  };

  useEffect(() => {
    Init(param.id);
  }, [param.id]);

  return (
    <Page title="人员详情" paddingBottom={5}>
      <>
        <Paper elevation={0} square>
          <Box padding={1.5}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Paper elevation={0} square>
                  <Box>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography variant="h6">{name}的基本信息</Typography>
                      <Typography
                        variant="subtitle1"
                        color={'secondary'}
                        component={'span'}
                      >
                        {residentProperty}
                      </Typography>
                    </div>
                    <Typography variant="body2" style={{ marginTop: '10px' }}>
                      <span style={{ color: 'gray' }}>隔离类型：</span>
                      {quarantineType}
                    </Typography>
                    <div style={{ marginTop: '10px' }}>
                      <StatusIcon exchangeStatus={5} status={status} />
                    </div>
                  </Box>
                  {information ? (
                    <PeopleDetailHeader info={information} />
                  ) : null}
                </Paper>
              </AccordionSummary>
              <AccordionDetails>
                {expandInformation ? (
                  <PeopleDetailContent info={expandInformation} />
                ) : null}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Paper>
        <Paper elevation={0}>
          {isTransferButtonVisible && (
            <Box
              margin={1.5}
              paddingTop={1}
              style={{ display: 'flex', justifyContent: 'space-around' }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={handleTransferOrder}
                className={commonStyle.whiteBackground}
                style={{ width: '45%' }}
              >
                <TransferWithinAStationIcon />
                转运
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleArrive}
                className={commonStyle.whiteBackground}
                style={{ width: '45%' }}
              >
                <BlockIcon />
                接收并开始隔离
              </Button>
            </Box>
          )}
          {isArriveButtonVisible && (
            <>
              <Box
                margin={1.5}
                style={{ display: 'flex', justifyContent: 'space-around' }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSamplingResult}
                  className={commonStyle.whiteBackground}
                  style={{ width: '45%' }}
                >
                  <AssignmentIcon />
                  上报采样结果
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleHealth}
                  className={commonStyle.whiteBackground}
                  style={{ width: '45%' }}
                >
                  <LocalHospitalIcon />
                  上报健康状况
                </Button>
              </Box>
            </>
          )}
          {isTransferButtonVisible && (
            <Box
              margin={1.5}
              style={{ display: 'flex', justifyContent: 'space-around' }}
              paddingBottom={1}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={handleFixOrder}
                className={commonStyle.whiteBackground}
                style={{ width: '95%' }}
              >
                <FileCopyOutlinedIcon />
                修改基本信息
              </Button>
            </Box>
          )}
        </Paper>
      </>
    </Page>
  );
}
