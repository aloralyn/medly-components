import { AddIcon } from '@medly-components/icons';
import { render } from '@test-utils';
import React from 'react';
import { TabsContext } from '../Tabs.context';
import { TabBackground, TabSize, Variant } from '../types';
import { Tab } from './Tab';
import { TabProps } from './types';

const renderer = ({
    id = 'dummy',
    label = 'Add',
    helperText = 'Details for tab1',
    count = 2,
    hide = false,
    icon = AddIcon,
    disabled = false,
    active = false,
    tabSize = 'S',
    tabBackground = 'WHITE',
    variant = 'flat'
}: Partial<TabProps> & { tabSize?: TabSize; tabBackground?: TabBackground; variant?: Variant }) =>
    render(
        <TabsContext.Provider value={{ variant, tabSize, tabBackground }}>
            <Tab {...{ id, label, helperText, count, hide, icon, disabled, active }}>Content for the add panel</Tab>
        </TabsContext.Provider>
    );

describe('Tab', () => {
    it('should render active state properly', () => {
        const { container } = renderer({ active: true });
        expect(container).toMatchSnapshot();
    });

    it('should render disabled state properly', () => {
        const { container } = renderer({ disabled: true });
        expect(container).toMatchSnapshot();
    });

    test.each(['S', 'M', 'L'])('should render properly with %s tab size', (tabSize: TabSize) => {
        const { container } = renderer({ tabSize });
        expect(container).toMatchSnapshot();
    });

    test.each(['flat', 'outlined', 'solid'])('should render properly with %s tab variant', (variant: Variant) => {
        const { container } = renderer({ variant });
        expect(container).toMatchSnapshot();
    });

    test.each(['WHITE', 'GREY'])('should render properly with %s tab background', (tabBackground: TabBackground) => {
        const { container } = renderer({ tabBackground });
        expect(container).toMatchSnapshot();
    });

    test.each(['S', 'M', 'L'])('should render properly with %s tab size', (tabSize: TabSize) => {
        const { container } = renderer({ tabSize });
        expect(container).toMatchSnapshot();
    });

    it('should render icon only when given', () => {
        const { container } = renderer({ icon: null });
        expect(container.querySelector('svg')).toBeNull();
    });
});
