import * as React from 'react';
import { useEffect } from 'react';
import { DynamicIcon } from 'lucide-react/dynamic.mjs';
import { cn } from '../utils/cn';
import { inputVariants } from './inputVariants';

const baseFieldClass =
  'tw-peer tw-flex tw-text-[12px]/[18px] tw-w-full tw-rounded-[8px] tw-border-[1px] tw-border-solid tw-bg-background-surface-layer-01 tw-py-[7px] tw-text-text-default focus-visible:tw-ring-[1px] focus-visible:tw-ring-offset-[1px] focus-visible:tw-ring-border-accent-strong focus-visible:tw-ring-offset-border-accent-strong focus-visible:tw-border-transparent disabled:tw-cursor-not-allowed';

const Input = React.forwardRef(
  ({ className, size, type, multiline, response, isWorkspaceConstant, rows = 3, onValueChange, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const isPasswordField = type === 'password';

    const togglePasswordVisibility = () => {
      if (!props.disabled) {
        setIsPasswordVisible((prev) => !prev);
      }
    };

    useEffect(() => {
      if (isWorkspaceConstant) {
        setIsPasswordVisible(true);
      }
    }, [isWorkspaceConstant]);

    const validationClass = response === true ? 'valid-textarea' : response === false ? 'invalid-textarea' : '';

    if (multiline) {
      return (
        <textarea
          className={cn(`tw-relative ${baseFieldClass} ${props.styles || ''}`, className, validationClass)}
          rows={rows}
          ref={ref}
          onChange={onValueChange}
          {...props}
        />
      );
    }

    return (
      <div className="design-component-inputs">
        <input
          type={isPasswordField && isPasswordVisible ? 'text' : type}
          className={cn(inputVariants({ size }), `${baseFieldClass} ${props.styles || ''}`, className)}
          ref={ref}
          {...props}
        />
        {isPasswordField && (
          <button type="button" onClick={togglePasswordVisibility} className="tw-absolute tw-right-3 tw-top-1/2 tw--translate-y-1/2">
            <DynamicIcon name={isPasswordVisible ? 'eye' : 'eye-off'} size={16} className="tw-text-icon-default" />
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
