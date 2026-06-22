import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { Label } from '../label/Label';

const checkVariants = cva('', {
  variants: {
    type: {
      checkbox: 'tw-rounded-[5px]',
      radio: 'tw-rounded-[50%]',
      checkmark: 'tw-rounded-[50%]',
    },
    size: {
      default: 'tw-h-[16px] tw-w-[16px]',
      large: 'tw-h-[20px] tw-w-[20px]',
    },
  },
  compoundVariants: [{ type: 'checkbox', size: 'large', className: 'tw-rounded-[7px]' }],
  defaultVariants: { type: 'checkbox', size: 'default' },
});

const checkPositionVariants = cva('tw-flex', {
  variants: {
    align: {
      left: '',
      right: 'tw-w-full tw-flex-row-reverse tw-justify-between',
    },
  },
  compoundVariants: [
    { align: 'left', size: 'default', className: 'tw-space-x-[6px]' },
    { align: 'left', size: 'large', className: 'tw-space-x-[12px]' },
  ],
  defaultVariants: { align: 'left', size: 'default' },
});

const IndicatorGlyph = ({ type = 'checkbox', size = 'default', intermediate = false }) => {
  const iconSize = size === 'large' ? 14 : 12;

  if (intermediate) {
    return <span className="tw-block tw-h-[2px] tw-w-[8px] tw-rounded tw-bg-white" />;
  }

  if (type === 'radio') {
    return <span className={`tw-rounded-full tw-bg-white ${size === 'large' ? 'tw-h-[8px] tw-w-[8px]' : 'tw-h-[6px] tw-w-[6px]'}`} />;
  }

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
};

const Checkbox = React.forwardRef(({ className, type, size, intermediate, align, label, helper, ...props }, ref) => (
  <div className={cn(checkPositionVariants({ align, size }), `${!helper && 'tw-items-center'}`, className)}>
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        checkVariants({ type, size }),
        `tw-peer tw-mt-[2px] tw-flex tw-justify-center tw-items-center tw-shrink-0 tw-border-solid tw-border-[1px] focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-icon-brand focus-visible:data-[state=checked]:tw-ring-offset-2 ${
          props.disabled ? 'tw-cursor-not-allowed tw-bg-[#CCD1D5]/30 tw-border-border-weak' : 'tw-bg-background-surface-layer-01 tw-border-border-default'
        }`
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          checkVariants({ type, size }),
          `tw-flex tw-justify-center tw-items-center tw-text-white ${props.disabled ? 'tw-bg-[#ACB2B9]/45' : 'tw-bg-icon-brand'}`
        )}
      >
        <IndicatorGlyph type={type} size={size} intermediate={intermediate === true && props.disabled !== true} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label && (
      <div className={`tw-flex tw-flex-col ${helper && size === 'large' && 'tw-space-y-[2px]'}`}>
        <Label size={size} type="label">{label}</Label>
        {helper ? <Label size={size} type="helper">{helper}</Label> : null}
      </div>
    )}
  </div>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
