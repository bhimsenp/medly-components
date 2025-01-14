import { CloseIcon, SearchIcon } from '@medly-components/icons';
import { useCombinedRefs, useOuterClickNotifier, WithStyle } from '@medly-components/utils';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Options from '../SingleSelect/Options';
import { Option } from '../SingleSelect/types';
import { useKeyboardNavigation } from '../SingleSelect/useKeyboardNavigation';
import * as Styled from './SearchBox.styled';
import { CloseIconWrapper, SearchIconWrapper } from './styles/icons';
import { SearchInput } from './styles/input';
import { Props } from './types';

export const SearchBox: FC<Props> & WithStyle = React.memo(
    React.forwardRef((props, ref) => {
        const { options: defaultOptions, size, placeholder, onInputChange, onOptionSelected } = props;
        const wrapperRef = useRef<any>(null),
            inputRef = useCombinedRefs<HTMLInputElement>(ref, React.useRef(null)),
            isFocused = useRef(false),
            optionsRef = useRef<HTMLUListElement>(null),
            [isTyping, updateIsTyping] = useState(false),
            [areOptionsVisible, setOptionsVisibilityState] = useState(false),
            [options, setOptions] = useState(defaultOptions);

        useEffect(() => {
            setOptions(props.options);
            setOptionsVisibilityState(isTyping && props.options.length > 0);
        }, [props.options, isTyping]);

        const showOptions = useCallback(() => {
                setOptionsVisibilityState(true);
                inputRef.current.focus();
            }, []),
            hideOptions = useCallback(() => {
                setOptionsVisibilityState(false);
                inputRef.current.blur();
                updateIsTyping(false);
            }, []),
            clearSearchText = useCallback(() => {
                inputRef.current.value = '';
                inputRef.current.focus();
                setOptionsVisibilityState(false);
                updateIsTyping(false);
            }, []),
            handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                updateIsTyping(value.length !== 0);
                onInputChange(value);
            }, []),
            handleOptionClick = useCallback((option: Option) => {
                inputRef.current.value = option.label;
                inputRef.current.focus();
                setOptionsVisibilityState(false);
                onOptionSelected && onOptionSelected(option);
            }, []),
            handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
                updateIsTyping(event.target.value.length > 0);
                isFocused.current = true;
            }, []),
            handleBlur = useCallback(() => {
                isFocused.current = false;
            }, []);

        useKeyboardNavigation({
            isFocused,
            options,
            areOptionsVisible,
            setOptions,
            handleOptionClick,
            showOptions,
            optionsRef
        });

        useOuterClickNotifier(() => {
            hideOptions();
        }, wrapperRef);

        return (
            <Styled.SearchBoxWrapper ref={wrapperRef} areOptionsVisible={areOptionsVisible} size={size}>
                <SearchInput placeholder={placeholder} onChange={handleChange} ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} />
                {isTyping && (
                    <CloseIconWrapper isTyping={isTyping} size={size}>
                        <CloseIcon title="close icon" onClick={clearSearchText} />
                    </CloseIconWrapper>
                )}
                <SearchIconWrapper areOptionsVisible={areOptionsVisible} isTyping={isTyping} size={size}>
                    <SearchIcon title="search icon" />
                </SearchIconWrapper>
                {areOptionsVisible && (
                    <Options ref={optionsRef} options={options} variant="filled" onOptionClick={handleOptionClick}></Options>
                )}
            </Styled.SearchBoxWrapper>
        );
    })
);

SearchBox.displayName = 'SearchBox';
SearchBox.Style = Styled.SearchBoxWrapper;
SearchBox.defaultProps = {
    options: [],
    placeholder: 'Search',
    size: 'S'
};
