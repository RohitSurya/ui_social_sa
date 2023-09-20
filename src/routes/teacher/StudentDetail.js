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

const dateFormat = 'MM/DD/YYYY';

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

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [address1, setAddress1] = useState('')

  const done = () => {
    const confirm = window.confirm('Are you sure to submit the details?');
    if (confirm) {
      setState({
        ...state,
        status: 'finish',
        isFinished: true,
        current: 0,
      });

      fetch('/user/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          gender: gender.trim(),
          address1: address1.trim(),
          mailId: email.trim()
        })
      })
      .then(response => response.json())
      .then(result => console.log(result))

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
              <Form.Item name="firstname" label="First Name" value = {firstName} onChange={e => setFirstName(e.target.value)}>
                          <Input placeholder="FirstName" />
                        </Form.Item>
                        <Form.Item name="middlename" label="Middle Name">
                          <Input placeholder="MiddleName" />
                        </Form.Item>
                        <Form.Item name="lastname" label="Last Name" value = {lastName} onChange={e => setLastName(e.target.value)}>
                          <Input placeholder="LastName" />
                        </Form.Item>
                        <Form.Item name="gender" label="Gender" value = {gender} onChange={e => setGender(e.target.value)}>
                        <Radio.Group defaultValue="a">
                    <Radio.Button value="a">Male</Radio.Button>
                    <Radio.Button value="b">Female</Radio.Button>
                    <Radio.Button value="c">Others</Radio.Button>
                  </Radio.Group>
                  </Form.Item>
                        
              <Form.Item name="dob" rules={[{ type: 'object', whitespace: true }]} label="Date of Birth">
                <DatePicker format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>
                        <Form.Item name="phone" label="Mobile No.">
                          <Input placeholder="Phone" />
                        </Form.Item>
                        <Form.Item name="email" rules={[{ type: 'email' }]} label="Email Address" value = {email} onChange={e => setEmail(e.target.value)}>
                          <Input placeholder="name@gmail.com" />
                        </Form.Item>
                        <Form.Item name="address1" label="Address1" value = {address1} onChange={e => setAddress1(e.target.value)}>
                          <Input placeholder="Address1" />
                        </Form.Item>
                        <Form.Item name="address2" label="Address2">
                          <Input placeholder="Address2" />
                        </Form.Item>
                        <Form.Item name="state" label="State">
                          <Input placeholder="State" />
                        </Form.Item>
                        <Form.Item name="city" label="City">
                          <Input placeholder="City" />
                        </Form.Item> 
                                       
            </Form>
            </div>
                    </Col>
                  </Row>
                </div>
          </BasicFormWrapper>
            ),
          },
          {
            title: 'Parent Details',
            className: 'wizard-step-item',
            icon: <UilUser />,
            content: 
            status !== 'finish' ? (
              <BasicFormWrapper className="basic-form-inner">
                <div className="atbd-form-checkout">
                  <Row justify="center">
                    <Col sm={22} xs={24}>
                      <div className="parent-form">
                        <Form form={form} name="parent">
                        <Form.Item name="firstname" label="First Name">
                <Input placeholder="First Name" />
              </Form.Item>

              <Form.Item name="middlename" label="Middle Name">
                <Input placeholder="Middle Name" />
              </Form.Item>

              <Form.Item name="lastname" label="Last Name">
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item name="relation" initialValue="active" label="Relation">
                <Radio.Group>
                  <Radio value="active">Father</Radio>
                  <Radio value="deactivated">Mother</Radio>
                  <Radio value="blocked">Guardian</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="phone" label="Phone No.">
                          <Input placeholder="Phone" />
                        </Form.Item>
                        <Form.Item name="email" rules={[{ type: 'email' }]} label="Email Address">
                          <Input placeholder="name@gmail.com" />
                        </Form.Item>
        
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </div>
              </BasicFormWrapper>
            ) : (
              <Row justify="center" style={{ width: '100%' }}>
                <Col xl={21} xs={24}>
                  <div className="checkout-successful">
                    <Cards
                      headless
                      bodyStyle={{
                        borderRadius: '20px',
                      }}
                    >
                      <Cards headless>
                        <span className="icon-success">
                          <UilCheck />
                        </span>
                        <Heading as="h3">Registration Successful</Heading>
                        <p>Thank you!</p>
                      </Cards>
                    </Cards>
                  </div>
                </Col>
              </Row>
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
