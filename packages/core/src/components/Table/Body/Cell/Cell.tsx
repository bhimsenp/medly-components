import { WithStyle } from '@medly-components/utils';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import Checkbox from '../../../Checkbox';
import Text from '../../../Text';
import * as Styled from './Cell.styled';
import { TableCellProps } from './types';

const Cell: React.FC<TableCellProps> & WithStyle = React.memo(props => {
    const childRef = useRef(null),
        {
            addColumnMaxSize,
            config,
            data,
            rowId,
            isRowSelected,
            isRowClickDisabled,
            isRowSelectionDisabled,
            onRowSelection,
            dottedFieldName,
            isLoading,
            showShadowAtRight,
            ...restProps
        } = props,
        isRowSelectionCell = useMemo(() => config.field === 'medly-table-checkbox', [config.field]);

    useEffect(() => {
        childRef.current && !isLoading && addColumnMaxSize(dottedFieldName, childRef.current.clientWidth);
    }, [childRef.current]);

    const stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), []),
        handleCellClick = useCallback((e: React.MouseEvent) => isRowSelectionCell && e.stopPropagation(), []),
        handleRowSelection = (id: number) => () => onRowSelection(id);

    const rowSelectionCheckbox = useMemo(
            () => (
                <Checkbox
                    disabled={isRowSelectionDisabled}
                    ref={childRef}
                    checked={isRowSelected}
                    onChange={handleRowSelection(rowId)}
                    onClick={stopPropagation}
                    name="active"
                />
            ),
            [rowId, isRowSelectionDisabled, isRowSelected]
        ),
        formattedCell = useCallback(() => {
            switch (config.formatter) {
                case 'boolean':
                    return (
                        <Text ref={childRef} textVariant="body2">
                            {data ? 'Yes' : 'No'}
                        </Text>
                    );
                case 'react-component': {
                    const Component = config.component;
                    return (
                        <Styled.CustomComponentWrapper ref={childRef}>
                            <Component {...{ data, rowId, disabled: isRowClickDisabled }} />
                        </Styled.CustomComponentWrapper>
                    );
                }
                default:
                    return (
                        <Text ref={childRef} textVariant="body2">
                            {data}
                        </Text>
                    );
            }
        }, [data, rowId, isLoading, isRowClickDisabled]),
        textAlign = useMemo(() => config.align || (config.formatter === 'numeric' ? 'right' : 'left'), []);

    return (
        <Styled.Cell
            hidden={config.hidden}
            frozen={config.frozen}
            align={textAlign}
            onClick={handleCellClick}
            isRowSelectionCell={isRowSelectionCell}
            showShadowAtRight={isRowSelectionCell && showShadowAtRight}
            showSelectedRowBorder={isRowSelectionCell && isRowSelected}
            {...restProps}
        >
            {isLoading ? <Styled.LoadingDiv ref={childRef} /> : isRowSelectionCell ? rowSelectionCheckbox : formattedCell()}
        </Styled.Cell>
    );
});
Cell.displayName = 'Cell';
Cell.Style = Styled.Cell;

export default Cell;
