import { centerAligned, css, styled } from '@medly-components/utils';
import { StyledProps } from './types';

const solidStyle = () => css<StyledProps>`
    justify-content: space-between;
    align-items: stretch;
    padding: ${({ theme, tabSize }) => theme.tabs.solid.tabList.padding[tabSize]};
    box-sizing: border-box;
    border-radius: ${({ theme }) => theme.tabs.solid.tabList.borderRadius};
    position: relative;
    color: red;
    background-color: ${({ theme }) => theme.tabs.solid.tabList.color};
`;

export const TabList = styled.div<StyledProps>`
    ${centerAligned('flex')}
    flex-direction: row;
    justify-content: flex-start;
    overflow-x: auto;
    background-color: transparent;

    ${({ variant }) => variant === 'solid' && solidStyle}
`;

const transformSlider = ({ theme, tabSize, active }: StyledProps) =>
    `transform: translateX(${`calc(${active * 100}% + calc(${active} * ${theme.tabs.solid.tabList.padding[tabSize]})`}));`;

const getSliderWidth = ({ totalTabs, theme, tabSize }: StyledProps) => {
    const totalHorizontalPadding = `calc(${theme.tabs.solid.tabList.padding[tabSize]} + ${theme.tabs.solid.tabList.padding[tabSize]} / ${totalTabs})`;
    return `calc(${100 / totalTabs}% - ${totalHorizontalPadding})`;
};

export const Slider = styled.div<StyledProps>`
    background-color: ${({ theme }) => theme.tabs.bgColor.active};
    width: ${getSliderWidth};
    height: ${({ theme, tabSize }) => `calc(100% - calc(${theme.tabs.solid.tabList.padding[tabSize]} * 2)) `};
    position: absolute;
    border-radius: ${({ theme }) => theme.tabs.solid.tabBorderRadius};
    box-shadow: 0 0.1rem 0.4rem rgba(96, 120, 144, 0.1);
    transition: transform 0.3s ease-out;
    transform-box: content-box;
    box-sizing: border-box;
    ${transformSlider}
`;
