import { IDropdownOption } from '@/types/components';
import { imgPrefix } from '@/utils/path';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

interface PropsType {
	options: IDropdownOption<any>[];
	currentOption: IDropdownOption<any> | null;
	onSelect: (option: IDropdownOption<any>) => void;
	placeholder?: string;
	disabled?: boolean;
}

const Dropdown: FunctionComponent<PropsType> = ({
	options,
	currentOption,
	onSelect,
	placeholder,
	disabled,
}) => {
	const ddRef = useRef<HTMLDivElement>(null);
	const [expand, setExpand] = useState<boolean>(false);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ddRef.current && !ddRef.current.contains(event.target as Node)) {
				setExpand(false);
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ddRef]);

	const onChangeOption = (option: IDropdownOption<any>) => {
		if (!disabled) {
			onSelect(option);
			setExpand(false);
		}
	};

	const getLabel = (): string => {
		if (!currentOption) {
			return placeholder || 'เลือกตัวเลือก';
		}
		return currentOption.label;
	};

	const getBorderColor = (): string => {
		let borderColor = 'var(--color-black)';
		if (disabled) {
			borderColor = 'var(--color-gray-2)';
		}
		if (expand) {
			borderColor = 'var(--color-highlight-2)';
		}
		return borderColor;
	};

	const getBoderClass = (): string => {
		return `px-[16px] py-[10px] bg-[var(--color-white)] border-[3px] rounded-[50px]`;
	};

	const cursor = (): string => {
		return disabled ? 'cursor-unset' : 'cursor-pointer';
	};
	const labelClass = (): string => {
		if (disabled) {
			return 'text-[var(--color-gray-2)]';
		}
		return currentOption !== null
			? 'text-[var(--color-black)]'
			: 'text-[var(--color-gray-3)]';
	};

	return (
		<div className="relative w-full" ref={ddRef}>
			<div
				className={`flex items-center justify-between hover:${cursor()} ${getBoderClass()}`}
				onClick={() => {
					if (!disabled) {
						setExpand(!expand);
					}
				}}
				style={{ borderColor: getBorderColor() }}
			>
				<span className={labelClass()}>{getLabel()}</span>
				<img
					className={`${
						disabled &&
						'[filter:invert(88%) sepia(9%) saturate(416%) hue-rotate(17deg) brightness(83%) contrast(87%)]'
					}`}
					src={`${imgPrefix}/Chevron.svg`}
					alt="dropdown-arrow"
					style={{
						transform: `${expand ? 'rotate(180deg)' : 'none'}`,
						filter: `${
							disabled
								? 'invert(88%) sepia(9%) saturate(416%) hue-rotate(17deg) brightness(83%) contrast(87%)'
								: 'unset'
						}`,
					}}
				/>
			</div>
			{expand && (
				<div className="absolute w-full max-h-[300px] overflow-y-auto z-50 mt-[12px] p-[15px] bg-[var(--color-highlight-1)] border-[3px] border-[var(--color-black)]">
					{options.map((item, index) => {
						return (
							<div
								key={`option-${index}`}
								className="hover:cursor-pointer hover:bg-[var(--color-highlight-2)] rounded-[10px]"
							>
								<div
									className="p-[5px]"
									key={`option-${index}`}
									onClick={() => onChangeOption(item)}
								>
									{item.label}
								</div>
								{index !== options.length - 1 && (
									<hr className="border-t-[1px] border-[var(--color-highlight-2)] w-[98%] mx-auto" />
								)}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
