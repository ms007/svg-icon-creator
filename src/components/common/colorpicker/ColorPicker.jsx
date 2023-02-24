import Popover from '../popover';
import styled from 'styled-components';
import { HexAlphaColorPicker } from 'react-colorful';

import './ColorPicker.css';

const CircleBackground = styled.div`
  position: absolute;
  top: 170px;
  height: 32px;
  width: 32px;
  background-position: bottom 3px left 7px;
  background-size: 11px 20px;
  background-origin: border-box;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 15 28'%3E%3Cpath fill='%23eae8e8' d='M0 28h7.5v-7H0v7ZM0 7v7h7.5v7H15v-7H7.5V7H15V0H7.5v7H0Z'/%3E%3C/svg%3E");
  border-radius: 50%;
`;

const CircleForeground = styled.div`
  position: absolute;
  top: 170px;
  height: 32px;
  width: 32px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgb(117 117 117 / 20%);
`;

const ColorPicker = ({ color, width, renderTrigger, renderAnchor, onChange }) => {
  return (
    <Popover
      width={width}
      align="end"
      renderAnchor={renderAnchor}
      renderPopoverButton={renderTrigger}
    >
      <div className="picker">
        <HexAlphaColorPicker color={color} onChange={onChange} />
        <CircleBackground />
        <CircleForeground color={color} />
      </div>
    </Popover>
  );
};

export default ColorPicker;
