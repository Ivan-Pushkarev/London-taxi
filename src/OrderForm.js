import moment from 'moment';
import {
    Form,
    Input,
    Button,
    Cascader,
    DatePicker, Select,
} from 'antd';


const OrderForm = ({sendRequest}) => {
    
    const localStorageData = JSON.parse(localStorage.getItem('values'))
    const initValues = localStorageData ? localStorageData : null
    
  
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 24,
        },
        layout: "vertical"
    };
    const onFinish = (values) => {
        
        const data = {
            name: values.name, phone: values.phone,
            date: values.date._d,
            flight: values.flight,
            airport: values.airport.join(' / ')
        }
        sendRequest(data)
        localStorage.setItem('values', JSON.stringify(values))
    };
    
    function disabledDate(current) {
        return current && current < moment().startOf('day');
    }
    
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select defaultValue="+44" style={{width: 70}}/>
        </Form.Item>
    );
    
    
    return (
        <Form {...layout} name="taxi-form" onFinish={onFinish}>
            <Form.Item
                name='name'
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name'
                    },
                ]}
            >
                <Input defaultValue={initValues.name}/>
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{
                    required: true,
                    message: 'Please input your phone number',
                },
                    {
                        pattern: /^[\d]{10,11}$/,
                        message: "Value should be 10 or 11 integers",
                    }]}
                validateTrigger="onBlur"
            >
                <Input addonBefore={prefixSelector}
                       defaultValue={initValues.phone}
                       style={{width: '100%'}}
                />
            </Form.Item>
            
            <Form.Item
                name='airport'
                label="Chose Airport"
                rules={[
                    {
                        required: true,
                        message: 'Please chose airport'
                    },
                ]}>
                <Cascader defaultValue={[...initValues.airport]}
                          options={[
                              {
                                  value: 'Heathrow',
                                  label: 'Heathrow',
                                  children: [
                                      {
                                          value: 'Terminal 1',
                                          label: 'Terminal 1',
                                      },
                                      {
                                          value: 'Terminal 2',
                                          label: 'Terminal 2',
                                      },
                                      {
                                          value: 'Terminal 3',
                                          label: 'Terminal 3',
                                      },
                                      {
                                          value: 'Terminal 4',
                                          label: 'Terminal 4',
                                      },
                                      {
                                          value: null,
                                          label: 'not sure',
                                      },
                                  ],
                              },
                              {
                                  value: 'Gatwick',
                                  label: 'Gatwick',
                              },
                          ]}
                />
            </Form.Item>
            <Form.Item
                name='date'
                label="Date of arrival"
                rules={[
                    {
                        required: true,
                        message: 'Please chose date of arrival'
                    },
                ]}>
                <DatePicker
                    disabledDate={disabledDate}
                    defaultValue={moment(initValues.date)}
                />
            </Form.Item>
            <Form.Item name='flight'
                       label="Air Flight number">
                <Input defaultValue={initValues.flight}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default OrderForm