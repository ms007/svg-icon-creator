import Popover from '../popover';
import { HexAlphaColorPicker } from 'react-colorful';

import './ColorPicker.css';

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
      </div>
    </Popover>
  );
};

export default ColorPicker;
