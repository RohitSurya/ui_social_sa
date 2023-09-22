import React, { useState } from 'react';
import { Row, Col, Form, Input, Upload, Select, Radio, DatePicker} from 'antd';
import { Link } from 'react-router-dom';
import UilCamera from '@iconscout/react-unicons/icons/uil-camera';
import UilUser from '@iconscout/react-unicons/icons/uil-user';
import UilCheck from '@iconscout/react-unicons/icons/uil-user';
import { BasicFormWrapper } from './styled';
import { Button } from '../../components/buttons/buttons';
import Heading from '../../components/heading/heading';
import { FigureWizards, WizardWrapper, OrderSummary, WizardTwo } from './pageStyle';
import { Steps } from '../../components/steps/steps';
import { Cards } from '../../components/cards/frame/cards-frame';

const dateFormat = 'DD-MMM-yyyy';

const { Option } = Select;
function Info() {
  const [state, setState] = useState({
    values: '',
    isFinished: false,
    current:1,
  });
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    setState({ ...state, values });
  };

  const next = () => {
    setState({
      ...state,
      status: 'process',
      current: current + 1,
    });
  };

  const prev = () => {
    setState({
      ...state,
      status: 'process',
      current: current - 1,
    });
  };

  const [batchName, setBatchName] = useState('')
  const [courseName, setCourseName] = useState('')  

  const done = () => {
    const confirm = window.confirm('Are you sure to submit the details?');
    if (confirm) {
      setState({
        ...state,
        status: 'finish',
        isFinished: true,
        current: 0,
      });

      
    }
  };
  const { status, isFinished, current } = state;  

  return (
    <WizardWrapper className="ninjadash-wizard-page">
    <WizardTwo>
      <Steps
        isswitch
        current={0}
        status={status}
        steps={[
          {
            title: 'Student Details',
            className: 'wizard-step-item',
            icon: <UilUser />,
            content: (
          <BasicFormWrapper className="basic-form-inner">
             <div className="atbd-form-checkout">
                  <Row justify="center">
                    <Col sm={22} xs={24}>
                      <div className="student-form">
                      <Form form={form} name="student">
              <Form.Item name="batchName" label="Batch Name" required='true' value = {batchName} onChange={e => setBatchName(e.target.value)}>
                          <Input placeholder="Batch Name" />
                        </Form.Item>
                        <Form.Item name="courseName" label="Course Name" value = {courseName} onChange={e => setCourseName(e.target.value)}>
                          <Input placeholder="Course Name" />
                        </Form.Item>
                                       
            </Form>
            </div>
                    </Col>
                  </Row>
                </div>
          </BasicFormWrapper>
            ),
          },
          
        ]}
      onNext={next}
      onPrev={prev}
      onDone={done}
      isfinished={isFinished}
    />
  </WizardTwo>
</WizardWrapper>

  );

}

export default Info;
