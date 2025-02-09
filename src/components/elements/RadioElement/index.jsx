import React, { useState } from 'react';
import { Radio, Space } from 'antd';
const RadioElement = ({optionsList, value, onChangeValue}) => {
  const onChange = (e) => {
    onChangeValue(e.target.value);
  };
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        {optionsList?.map((option) => <Radio value={option?.value}>{option?.label}</Radio>) }
      </Space>
    </Radio.Group>
  );
};
export default RadioElement;