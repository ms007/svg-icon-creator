import * as RadixPopover from '@radix-ui/react-popover';

import styled, { keyframes } from 'styled-components';

const slideUpAndFade = keyframes`
    0% {
      opacity: 0;
      transform: translateY(2px)
    }
    100% {
      opacity: 1;
      transform: translateY(0)
    }
`;

const slideRightAndFade = keyframes`
    0% {
      opacity: 0;
      transform: translateX(-2px)
    }
    100% {
      opacity: 1;
      transform: translateX(0)
    }
`;

const slideDownAndFade = keyframes`
    0% {
      opacity: 0;
      transform: translateY(-2px)
    }
    100% {
      opacity: 1;
      transform: translateY(0)
    }
`;

const slideLeftAndFade = keyframes`
    0% {
      opacity: 0;
      transform: translateX(2px)
    }
    100% {
      opacity: 1;
      transform: translateX(0)
    }
`;

const PopoverContent = styled(RadixPopover.Content)`
  width: ${({ width }) => `${width}px`};
  min-width: 220px;
  background-color: var(--neutral);
  border-radius: var(--radix-radius);
  padding: 10px;
  box-shadow: 0 10px 20px rgba(64, 64, 64, 0.15);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  user-select: none;

  &[data-state='open']&[data-side='top'] {
    animation: ${slideDownAndFade};
  }

  &[data-state='open']&[data-side='right'] {
    animation: ${slideLeftAndFade};
  }

  &[data-state='open']&[data-side='bottom'] {
    animation: ${slideUpAndFade};
  }

  &[data-state='open']&[data-side='left'] {
    animation: ${slideRightAndFade};
  }
`;

const Popover = ({
  renderPopoverButton,
  renderAnchor,
  width = 'auto',
  align = 'center',
  children,
}) => {
  return (
    <RadixPopover.Root>
      {renderAnchor && <RadixPopover.Anchor asChild>{renderAnchor()}</RadixPopover.Anchor>}
      <RadixPopover.Trigger asChild>{renderPopoverButton()}</RadixPopover.Trigger>

      <RadixPopover.Portal>
        <PopoverContent width={width} align={align}>
          {children}
        </PopoverContent>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

export default Popover;
