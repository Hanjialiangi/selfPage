import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import { useParams } from 'react-router';
import {
  Box,
  Paper,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ExpandMore from '@material-ui/icons/ExpandMore';
import OrderDetailHeader from '@components/OrderDetail/Header';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import commonStyle from '@styleModules/common.module.scss';
import OrderDetailContent from '@components/OrderDetail/Content';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import BlockIcon from '@material-ui/icons/Block';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import '@src/styles/modules/detail/detail.scss';

const title = '11';
const status = 3; //初始状态
const content = 'sadsadsad';
export default function PeopleDetailPage(): JSX.Element {
  const param: { id: string } = useParams(); //获取路由参数
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

  //收缩按钮
  const [showdownIcon, setshowdownIcon] = useState(true);
  const [showUpIcon, setshowUpIcon] = useState(false);

  const Init = () => {
    //TODO://根据id获取信息
  };
  useEffect(() => {
    Init();
    console.log(param.id);
  }, [param.id]);
  return (
    <Page title="人员详情" paddingBottom={5}>
      <>
        <Paper elevation={0} square>
          <Box padding={1.5}>
            <Accordion>
              <AccordionSummary
                expandIcon={showdownIcon ? <ExpandMore /> : null}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => {
                  setshowdownIcon(showUpIcon);
                  setshowUpIcon(showdownIcon);
                }}
              >
                {showUpIcon ? (
                  <KeyboardArrowUpIcon
                    style={{
                      position: 'absolute',
                      marginTop: '480px',
                      left: '46%'
                    }}
                  />
                ) : null}
                <OrderDetailHeader
                  name={title}
                  contactType={title}
                  status={status}
                  isolateType={title}
                  isloatePlace={title}
                  fillDate={title}
                  sourceAttribute={title}
                  dataSource={title}
                  personAttribute={title}
                  relatedEvent={title}
                  relatedCase={title}
                  associatedContace={title}
                  contactForm={title}
                  lastContaceTime={title}
                  IDCard={title}
                  gender={title}
                  age={title}
                  phone={title}
                  transferAddress={title}
                  homeAddress={title}
                  region={title}
                  street={title}
                  relatedIDCard={title}
                  relatedPhone={title}
                  hotel={title}
                />
              </AccordionSummary>
              <AccordionDetails>
                <OrderDetailContent
                  abnormalState={title}
                  isolationDate={title}
                  roomNumber={title}
                  expectSamplingDate={title}
                  actualSamplingDate={title}
                  samplingResult={title}
                  transferTime={title}
                  Hospital={title}
                  removeDate={title}
                  homeManagementTime={title}
                  secondSamplingResult={title}
                  seventhSamplingResult={title}
                  finishDate={title}
                  outcome={title}
                  isolateMethod={title}
                >
                  {content}
                </OrderDetailContent>
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
