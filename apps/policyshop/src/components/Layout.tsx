import { FunctionComponent, ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { imgPrefix } from '@/utils/path';
import ModalSeeMore from './ModalSeeMore';
// import '@thailand-election-2023/components';

interface PropsType {
	title: string | string[] | undefined;
	children: ReactNode;
}

const Layout: FunctionComponent<PropsType> = ({ title, children }) => {
	useEffect(() => {
		// @ts-ignore
		import('@thailand-election-2023/components');
	}, []);

	return (
		<div className="main-component">
			<ModalSeeMore />
			<election-header></election-header>
			<div
				className={`max-w-[420px]   m-auto ${
					title != 'landing' ? ' md:max-w-[728px] px-4' : ' md:max-w-none'
				}`}
			>
				{title != 'landing' && (
					<Link href="/" className="flex mt-[16px]">
						<img src={`${imgPrefix}/arrow.svg`} alt="arrow" />
						<p className="ml-[8px] typo-h6 font-bold">{title}</p>
					</Link>
				)}
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Layout;
