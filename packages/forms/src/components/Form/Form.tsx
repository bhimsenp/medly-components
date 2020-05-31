import { Text } from '@medly-components/core';
import { WithStyle } from '@medly-components/utils';
import React, { useEffect, useMemo } from 'react';
import useForm from '../../hooks/useForm';
import Actions from '../Actions';
import Fields from '../Fields';
import * as Styled from './Form.styled';
import { Props } from './types';

export const Form: React.SFC<Props> & WithStyle = React.memo(
    React.forwardRef(
        (
            {
                header,
                helperText,
                disabled,
                hideActions,
                apiErrorMessages,
                initialState,
                actionLabel,
                actionSchema,
                onSubmit,
                onReset,
                id,
                fieldSchema,
                ...restProps
            },
            ref
        ) => {
            const formId = useMemo(() => id || 'medly-dynamic-form', [id]),
                { values, handlers, errorMessages, addErrorMessage, setErrorMessages } = useForm(initialState);

            useEffect(() => {
                apiErrorMessages && Object.keys(apiErrorMessages).length && setErrorMessages(apiErrorMessages);
            }, [apiErrorMessages]);

            return (
                <Styled.Form
                    {...restProps}
                    id={formId}
                    ref={ref}
                    onSubmit={handlers.handleFormSubmit(onSubmit)}
                    onReset={handlers.handleFormReset(onReset)}
                >
                    {header && <Text textVariant="h2">{header}</Text>}
                    {helperText && <Text textVariant="body1">{helperText}</Text>}
                    <Fields
                        errorMessages={errorMessages}
                        addErrorMessage={addErrorMessage}
                        fields={fieldSchema}
                        values={values}
                        handlers={handlers}
                        disabled={disabled}
                    />
                    {!hideActions && <Actions actionSchema={actionSchema} formId={formId} disabled={disabled} actionLabel={actionLabel} />}
                </Styled.Form>
            );
        }
    )
);
Form.displayName = 'Form';
Form.Style = Styled.Form;
Form.defaultProps = {
    initialState: {},
    hideActions: false,
    disabled: false,
    fullWidth: false
};