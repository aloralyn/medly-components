import { WithStyle } from '@medly-components/utils';
import React, { useEffect, useRef } from 'react';
import Text from '../../../Text';
import { Cell as StyledCell, CustomComponentWrapper, LoadingDiv } from './Styled';
import { TableCellProps } from './types';

const Cell: React.FC<TableCellProps> & WithStyle = React.memo(props => {
    const childRef = useRef(null),
        { addColumnMaxSize, config, data, rowId, isRowClickDisabled, dottedFieldName, tableSize, isLoading, ...restProps } = props,
        { align, hidden, frozen, formatter, component: CustomComponent } = config;

    useEffect(() => {
        childRef.current &&
            !isLoading &&
            addColumnMaxSize &&
            addColumnMaxSize(dottedFieldName, childRef.current.clientWidth + (tableSize === 'L' ? 48 : 32));
    }, [childRef.current, tableSize]);

    return (
        <StyledCell hidden={hidden} frozen={frozen} tableSize={tableSize} align={align} {...restProps}>
            {isLoading ? (
                <LoadingDiv ref={childRef} />
            ) : CustomComponent ? (
                <CustomComponentWrapper ref={childRef}>
                    <CustomComponent {...{ data, rowId, disabled: isRowClickDisabled }} />
                </CustomComponentWrapper>
            ) : (
                <Text ref={childRef} textVariant="body2">
                    {formatter ? formatter(data) : data}
                </Text>
            )}
        </StyledCell>
    );
});
Cell.displayName = 'Cell';
Cell.Style = StyledCell;

export default Cell;
