import { WithStyle } from '@medly-components/utils';
import React, { FC, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import Body from './Body';
import ColumnConfiguration from './ColumnConfiguration';
import { loadingBodyData } from './constants';
import Head from './Head';
import { getUpdatedColumns } from './helpers';
import { maxColumnSizeReducer } from './maxColumnSizeReducer';
import { TableStyled } from './Table.styled';
import { TablePropsContext } from './TableProps.context';
import { StaticProps, TableProps } from './types';
import useRowSelector from './useRowSelector';
import { useScrollState } from './useScrollState';

export const Table: FC<TableProps> & WithStyle & StaticProps = React.memo(
    React.forwardRef((props, ref) => {
        const {
                data,
                onRowClick,
                rowIdentifier,
                rowSelectionDisableKey,
                isRowSelectable,
                isRowExpandable,
                selectedRowIds,
                onRowSelection,
                isLoading,
                showRowWithCardStyle,
                ...restProps
            } = props,
            isGroupedTable = !!restProps.groupBy,
            size = showRowWithCardStyle ? 'L' : restProps.size;

        const [scrollState, handleScroll] = useScrollState(),
            [maxColumnSizes, dispatch] = useReducer(maxColumnSizeReducer, {}),
            [columns, setColumns] = useState(getUpdatedColumns(props.columns, isRowSelectable, isRowExpandable, size, isGroupedTable)),
            addColumnMaxSize = useCallback((field: string, value: number) => dispatch({ field, value, type: 'ADD_SIZE' }), [dispatch]);

        const isRowClickable = useMemo(() => (onRowClick ? true : false), [onRowClick]),
            isSelectAllDisable = useMemo(() => data.every(dt => dt[rowSelectionDisableKey]), [data, rowSelectionDisableKey]),
            rowSelector = useRowSelector(data, selectedRowIds, rowSelectionDisableKey, rowIdentifier, isRowSelectable),
            { isAnyRowSelected, isEachRowSelected, selectedIds, toggleId } = rowSelector;

        useEffect(() => {
            setColumns(getUpdatedColumns(props.columns, isRowSelectable, isRowExpandable, size, isGroupedTable));
        }, [props.columns, isRowSelectable, isRowExpandable, size, isGroupedTable]);

        useEffect(() => {
            onRowSelection && onRowSelection(selectedIds);
        }, [selectedIds, onRowSelection]);

        return (
            <TablePropsContext.Provider value={{ ...props, columns, size, data: isLoading ? loadingBodyData : data }}>
                <TableStyled
                    ref={ref}
                    {...restProps}
                    onScroll={handleScroll}
                    isRowClickable={isRowClickable}
                    showRowWithCardStyle={showRowWithCardStyle}
                >
                    <Head
                        {...{
                            setColumns,
                            maxColumnSizes,
                            isEachRowSelected,
                            isAnyRowSelected,
                            onSelectAllClick: toggleId,
                            isSelectAllDisable: isSelectAllDisable,
                            showShadowAtBottom: !scrollState.isScrolledToTop,
                            showShadowAfterFrozenElement: !scrollState.isScrolledToLeft
                        }}
                    />
                    <Body
                        {...{
                            addColumnMaxSize,
                            selectedRowIds: selectedIds,
                            onRowSelection: toggleId,
                            showShadowAfterFrozenElement: !scrollState.isScrolledToLeft
                        }}
                    />
                </TableStyled>
            </TablePropsContext.Provider>
        );
    })
);

Table.defaultProps = {
    size: 'M',
    rowIdentifier: 'id',
    selectedRowIds: [],
    defaultSortOrder: 'asc',
    rowClickDisableKey: '',
    rowSelectionDisableKey: ''
};

Table.displayName = 'Table';
Table.ColumnConfiguration = ColumnConfiguration;
Table.Style = TableStyled;
