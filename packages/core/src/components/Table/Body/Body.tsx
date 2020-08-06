import React, { useContext } from 'react';
import Text from '../../Text';
import { TablePropsContext } from '../TableProps.context';
import { TBody } from './Body.styled';
import GroupedRow from './GroupedRow';
import Row from './Row';
import { NoResult } from './Row/Row.styled';
import { Props } from './types';

const Body: React.FC<Props> = React.memo(props => {
    const { data, groupBy, rowIdentifier } = useContext(TablePropsContext),
        { selectedRowIds, onRowSelection, onGroupedRowSelection, setUniqueIds, ...restProps } = props;

    return (
        <TBody>
            {data.length === 0 && (
                <NoResult>
                    <Text>No result</Text>
                </NoResult>
            )}
            {data.map((row, index) => {
                const identifier = (groupBy ? row[groupBy] : row[rowIdentifier]) || index;
                return groupBy ? (
                    <GroupedRow
                        id={identifier}
                        key={identifier}
                        titleRowData={row}
                        setUniqueIds={setUniqueIds}
                        selectedTitleRowIds={selectedRowIds}
                        onTitleRowSelection={onRowSelection}
                        {...{ ...restProps, onGroupedRowSelection }}
                    />
                ) : (
                    <Row id={identifier} key={identifier} data={row} {...{ ...restProps, selectedRowIds, onRowSelection }} />
                );
            })}
        </TBody>
    );
});
Body.displayName = 'Body';
export default Body;
