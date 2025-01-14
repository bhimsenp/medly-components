import { DateRangeInput, OnDatesChangeProps } from '@datepicker-react/styled';
import { format } from 'date-fns';
import React, { FC, useCallback, useMemo, useState } from 'react';
import FieldWithLabel from '../FieldWithLabel';
import { DateRangePickerStyled } from './DateRangePicker.styled';
import { Props } from './types';

export const DateRangePicker: FC<Props> = React.memo(props => {
    const {
        label,
        labelPosition,
        fullWidth,
        value,
        onChange,
        required,
        disabled,
        minWidth,
        placement,
        minSelectableDate,
        maxSelectableDate,
        displayFormat,
        ...restProps
    } = props;

    const [showDatepicker, setShowDatepicker] = useState(null),
        dates = useMemo(() => ({ startDate: value.startDate || null, endDate: value.endDate || null }), [value.startDate, value.endDate]);

    const handleClick = useCallback((event: React.MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
        }, []),
        handleDateChange = useCallback(
            ({ startDate, endDate, focusedInput }: OnDatesChangeProps) => {
                setShowDatepicker(focusedInput);
                onChange && onChange({ startDate, endDate });
            },
            [onChange]
        ),
        formatFn = useCallback((date: Date) => format(date, displayFormat), [displayFormat]);

    return (
        <FieldWithLabel {...{ labelPosition, fullWidth, minWidth }}>
            {label && (
                <FieldWithLabel.Label {...{ required, labelPosition }} htmlFor={label}>
                    {label}
                </FieldWithLabel.Label>
            )}
            <DateRangePickerStyled placement={placement} data-testid="react-datepicker" disabled={disabled} onClick={handleClick}>
                <DateRangeInput
                    {...dates}
                    {...restProps}
                    displayFormat={formatFn}
                    onDatesChange={handleDateChange}
                    showClose={false}
                    onFocusChange={setShowDatepicker}
                    focusedInput={showDatepicker}
                    showStartDateCalendarIcon={false}
                    showEndDateCalendarIcon={false}
                    minBookingDate={minSelectableDate}
                    maxBookingDate={maxSelectableDate}
                />
            </DateRangePickerStyled>
        </FieldWithLabel>
    );
});

DateRangePicker.displayName = 'DateRangePicker';
DateRangePicker.defaultProps = {
    displayFormat: 'MM/dd/yyyy',
    placement: 'bottom-start',
    labelPosition: 'left',
    fullWidth: false,
    required: false,
    disabled: false,
    label: ''
};
