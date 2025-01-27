import { WithStyle } from '@medly-components/utils';
import React, { FC } from 'react';
import Warning323LineIconSvg from '../../assets/GSDD/Warning_323_Line.svg';
import SvgIcon, { SvgIconProps } from '../../SvgIcon';

const Warning323LineIcon: FC<SvgIconProps> & WithStyle = React.memo(props => {
    const { size, withHoverEffect, color, margin, ...restProps } = props;
    return (
        <SvgIcon {...{ size, withHoverEffect, color, margin, ...restProps }}>
            <Warning323LineIconSvg {...restProps} width="1em" height="1em" />
        </SvgIcon>
    );
});

Warning323LineIcon.Style = SvgIcon;
Warning323LineIcon.displayName = 'Warning323LineIcon';

export default Warning323LineIcon
