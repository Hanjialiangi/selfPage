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
import { getResidentInfo } from '@src/api';

export type Properties = {
  key: string;
  key_id: number;
  key_name: string;
  value: string;
};
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
  const [showIcon, setshowIcon] = useState(true);

  //

  const [info, setinfo] = useState<any>();
  const Init = async () => {
    //TODO://根据id获取信息
    const res = await getResidentInfo();
    if (res.code == 200) {
      const onePerson = {};
      res.data.map(function (proper: Properties, key: number) {
        Object.assign(onePerson, { [proper.key]: proper.value });
        if (key == res.data.length - 1) {
          setinfo(onePerson);
        }
      });
      //   //缺
      //   contactType: res.data.contactType,
      //   isolateType: res.data.isolateType,
      //   lastContaceTime: res.data.lastContaceTime,
      //   relatedIDCard: res.data.relatedIDCard,
      //   relatedPhone: res.data.relatedPhone,
      //   isolateMethod: res.data.isolateMethod,
      //   expectSamplingDate: res.data.expectSamplingDate,
      //   actualSamplingDate: res.data.actualSamplingDate,
      //   samplingResult: res.data.samplingResult,
      //   isloatePlace: res.data.isloatePlace,
      //   transferTime: res.data.transferTime,
      //   Hospital: res.data.Hospital,
      //   removeDate: res.data.removeDate,
      //   finishDate: res.data.finishDate
      // };
    }
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
                expandIcon={showIcon ? <ExpandMore /> : <KeyboardArrowUpIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {info ? (
                  <OrderDetailHeader
                    name={info.name}
                    contactType={'密切接触'}
                    status={status}
                    isolateType={info.isolateType}
                    isloatePlace={info.isloatePlace}
                    fillDate={info.register_time}
                    sourceAttribute={info.data_source_type}
                    dataSource={info.dataSource}
                    personAttribute={info.resident_property}
                    relatedEvent={info.related_event}
                    relatedCase={info.related_case}
                    associatedContace={info.related_resident}
                    contactForm={info.contact_type}
                    lastContaceTime={info.last_contact_time}
                    IDCard={info.id_card}
                    gender={info.gender}
                    age={info.age}
                    phone={info.contact}
                    transferAddress={info.transfer_from}
                    homeAddress={info.home_address}
                    region={info.belong_area}
                    street={info.sub_district}
                    //wu
                    relatedIDCard={info.relatedIDCard}
                    relatedPhone={info.relatedPhone}
                    hotel={info.planned_quarantine_hotel}
                  />
                ) : null}
              </AccordionSummary>
              <AccordionDetails>
                {info ? (
                  <OrderDetailContent
                    abnormalState={info.quarantine_exception}
                    isolationDate={info.quarantine_start_time}
                    roomNumber={info.roomNumber}
                    expectSamplingDate={info.expectSamplingDate}
                    actualSamplingDate={info.actualSamplingDate}
                    samplingResult={info.samplingResult}
                    transferTime={info.transferTime}
                    Hospital={info.Hospital}
                    removeDate={info.removeDate}
                    homeManagementTime={
                      info.close_contact_home_quarantine_start_time
                    }
                    secondSamplingResult={
                      info.close_contact_home_second_day_nat_result
                    }
                    seventhSamplingResult={
                      info.close_contact_home_seventh_day_nat_result
                    }
                    finishDate={info.restriction_end_time}
                    outcome={info.outcome}
                    isolateMethod={info.isolateMethod}
                  >
                    {content}
                  </OrderDetailContent>
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
