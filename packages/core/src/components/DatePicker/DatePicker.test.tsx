import { TestUtils } from '@medly-components/utils';
import React, { useState } from 'react';
import DatePicker from './DatePicker';

jest.mock('react-datepicker/dist/react-datepicker.css', () => ({}));

const DummmyComponent = ({ disabled, placeholder }: { disabled: boolean; placeholder?: string }) => {
    const [date, setDate] = useState('');
    return (
        <DatePicker
            value={date}
            onChange={setDate}
            disabled={disabled}
            label="Start Date"
            labelPosition="left"
            required
            placeholder={placeholder}
        />
    );
};

describe('DatePicker component', () => {
    const { container, getByLabelText, getByValue, rerender } = TestUtils.render(<DummmyComponent disabled={false} />);
    it('should render correctly', () => {
        expect(container).toMatchSnapshot();
    });

    it('should display date popover on click on it', () => {
        const input = container.querySelector('input');
        TestUtils.fireEvent.click(input);
        expect(container).toMatchSnapshot();
    });

    it('should be able to display selected date', async () => {
        const date = getByLabelText('day-15');
        TestUtils.fireEvent.click(date);
        TestUtils.waitForElement(() => getByValue(/(.*)-15/));
        const input = container.querySelector('input');
        expect(input).toMatchSnapshot();
    });

    it('should render correctly in disabled mode', () => {
        rerender(<DummmyComponent disabled placeholder="Start Date" />);
        const input = container.querySelector('input');
        expect(input).toMatchSnapshot();
    });
});