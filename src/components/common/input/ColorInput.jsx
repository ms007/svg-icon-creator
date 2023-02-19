import styled from 'styled-components';

const Background = styled.div`
  position: relative;
  height: 100%;
  background-size: 15px 28px;
  background-origin: border-box;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 15 28'%3E%3Cpath fill='%23eae8e8' d='M0 0h7.5v7H0V0Zm0 21v-7h7.5V7H15v7H7.5v7H15v7H7.5v-7H0Z'/%3E%3C/svg%3E");
  border-radius: 4px;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ color }) => color};
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0;
`;

const ColorInput = ({ color }) => {
  return (
    <Background>
      <Button color={color}></Button>
    </Background>
  );
};

export default ColorInput;
