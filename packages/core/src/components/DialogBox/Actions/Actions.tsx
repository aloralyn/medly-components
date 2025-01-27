import { WithStyle } from '@medly-components/utils';
import React, { useContext } from 'react';
import { DialogBoxContext } from '../DialogBox.context';
import * as Styled from './Actions.styled';
import { DialogBoxActionUserProps } from './types';

export const Actions: React.FC<DialogBoxActionUserProps> & WithStyle = React.memo(({ children, alignItems }) => {
    const { id } = useContext(DialogBoxContext);

    return <Styled.Actions {...{ alignItems, id: `${id}-actions` }}>{children}</Styled.Actions>;
});
Actions.displayName = 'Actions';
Actions.Style = Styled.Actions;
