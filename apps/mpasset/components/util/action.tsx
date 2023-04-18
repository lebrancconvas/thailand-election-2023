import { LottieNotFound } from "./lottie"

export const Expand: React.FC<{ onClick: Function }> = (props) => <svg {...props} onClick={() => props.onClick()} width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.68115 10.2786C3.34851 10.0359 4.23237 10.1161 4.92857 10.0934C6.23672 10.0509 7.54997 9.90829 8.85769 9.90829C10.4993 9.90829 12.1414 9.81572 13.7794 9.81572C14.8411 9.81572 15.896 9.72314 16.9371 9.72314" stroke="#090909" strokeWidth={2} strokeLinecap="round" />
  <path d="M9 3C9.17146 3.1929 9.08897 3.53527 9.09771 3.77142C9.12569 4.52668 9.22379 5.29462 9.31886 6.04455C9.50372 7.50292 9.648 8.87412 9.648 10.344C9.648 12.2473 9.648 14.145 9.648 16.0525" stroke="#090909" strokeWidth={2} strokeLinecap="round" />
</svg>

export const Collapse: React.FC<{ onClick: Function }> = (props) => <svg {...props} onClick={() => props.onClick()} width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.45239 10.0008C6.10758 10.0008 8.761 9.9082 11.4186 9.9082C12.4881 9.9082 13.5626 10.0008 14.638 10.0008C15.1372 10.0008 15.665 10.0647 16.1346 9.9082" stroke="#090909" strokeWidth={2} strokeLinecap="round" />
</svg>

export const Gesture = () =>
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.58846 21.483C6.0591 20.336 6.0591 19.5713 6.04565 18.4243C6.05904 17.2773 6.04566 16.7613 6.04566 15.6903C6.04566 15.0986 6.46818 14.3867 6.90163 13.9966C8.35313 13.0715 9.11781 14.8312 9.11781 15.3656" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8.71021 16.9347C8.79488 16.3843 9.02751 15.8467 9.14701 15.3004C9.27721 14.7052 9.23437 14.0865 9.32023 13.4854C9.47805 12.3807 9.75158 11.273 9.86247 10.1642C9.8987 9.80191 9.88243 9.24777 9.88243 8.86543C9.88243 8.48309 9.83335 8.29704 9.88243 8.10075C10.2648 6.57142 11.5056 7.14141 11.7941 7.71842C12.0354 8.20098 12.1765 8.91302 12.1765 9.24778C12.2765 9.98173 12.1765 10.7971 12.1765 11.5418C12.1765 12.2236 12.1348 13.1005 11.926 13.7566C11.6336 14.6756 11.6247 15.8646 11.6247 16.7991" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12.3704 13.207C13.0657 13.3545 13.7982 13.7183 14.3812 14.1258C15.3278 14.7876 14.8313 16.1953 14.6749 17.1383C14.5184 18.0818 14.1676 18.9243 13.6732 19.7365C13.6255 19.815 13.5184 19.9808 13.4548 19.9173" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15.0816 15.5791C16.2573 15.9274 16.8306 16.4827 16.9268 17.6728C16.9994 18.572 16.8816 19.5104 16.3996 20.2936C16.0972 20.785 15.8303 21.2643 15.4582 21.7245C14.9846 22.3102 14.5094 22.2893 13.8616 22.5604C13.3604 22.7703 12.7674 22.8771 12.2349 22.9521C11.5311 23.0512 11.0114 22.9995 10.3596 22.7638C9.97666 22.6253 9.58959 22.5033 9.24503 22.2818C8.93185 22.0805 8.35306 21.865 8.35306 21.865L7.58838 21.4826" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7.80718 7.42138C7.29281 7.19277 6.21289 6.56446 6 5.92578" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10.3621 4.80424C10.3515 3.86915 10.2998 2.93526 10.2998 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13.3364 6.12981C13.6806 5.5041 14.3209 5.0083 14.7697 4.44727" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14.6907 8.68488C15.5635 8.65162 16.4348 8.63711 17.308 8.62256" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>

export const SortDesc = () =>
  <svg width={15} height={15} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.37213 12.5C4.37213 12.016 4.66759 10.2039 4.6221 9.72222C4.54875 8.9456 4.27752 8.56298 4.27079 7.77778C4.25964 6.47827 4.24147 6.16502 4.30794 4.87365C4.32329 4.57551 4.34172 4.44864 4.34172 4.16667C4.04932 4.45178 3.68912 4.37176 3.39927 4.66082C2.31388 5.74322 0.405396 7.84593 1.46383 6.73449C2.25549 5.90319 1.74831 6.24544 2.50748 5.38089C3.14927 4.65001 3.76816 3.84168 4.27079 2.99721C4.38743 2.80124 4.46617 2.30965 4.6221 2.57864C5.06019 3.33442 5.48364 4.07518 5.99356 4.78142C6.59352 5.61239 6.29291 6.03096 6.87497 6.875" stroke="#000000" strokeLinecap="round" />
    <path d="M9.12183 3.91222C9.49963 3.94656 9.72509 3.89098 10.0981 3.77065C10.3441 3.69129 10.5956 3.79474 10.8401 3.82191C11.1103 3.85193 11.3381 3.69255 11.6016 3.69255C12.0298 3.69255 12.4443 3.63486 12.8585 3.71452C13.0779 3.75671 13.315 3.82435 13.5371 3.82435C13.7271 3.82435 14.0512 3.85174 14.218 3.92198" stroke="#000000" strokeLinecap="round" />
    <path d="M9.16577 7.69079C9.65763 7.69079 10.1458 7.64686 10.6375 7.64686C10.8289 7.64686 11.0135 7.59773 11.2111 7.60292C11.3808 7.60739 11.5521 7.6867 11.7236 7.69079C11.8722 7.69433 12.0106 7.66047 12.1312 7.75425C12.2001 7.8078 12.2724 7.85644 12.3558 7.88849C12.5694 7.97065 12.7841 7.86652 12.9879 7.86652" stroke="#000000" strokeLinecap="round" />
    <path d="M9.07788 11.5566C9.4158 11.5566 9.71652 11.5815 10.0444 11.5542C10.3122 11.5318 10.5762 11.4248 10.8352 11.4248" stroke="#000000" strokeLinecap="round" />
  </svg>

export const SortAsc = () => <svg width={15} height={15} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.37213 2.5C4.37213 2.98401 4.66759 4.79609 4.6221 5.27778C4.54875 6.0544 4.27752 6.43702 4.27079 7.22222C4.25964 8.52173 4.24147 8.83498 4.30794 10.1264C4.32329 10.4245 4.34172 10.5514 4.34172 10.8333C4.04932 10.5482 3.68912 10.6282 3.39927 10.3392C2.31388 9.25678 0.405396 7.15407 1.46383 8.26551C2.25549 9.09681 1.74831 8.75456 2.50748 9.61911C3.14927 10.35 3.76816 11.1583 4.27079 12.0028C4.38743 12.1988 4.46617 12.6904 4.6221 12.4214C5.06019 11.6656 5.48364 10.9248 5.99356 10.2186C6.59352 9.38761 6.29291 8.96904 6.87497 8.125" stroke="#000000" strokeLinecap="round" />
  <path d="M8.75 11.4899C9.12781 11.5242 9.35326 11.4686 9.72628 11.3483C9.97231 11.2689 10.2237 11.3724 10.4683 11.3995C10.7384 11.4296 10.9663 11.2702 11.2298 11.2702C11.658 11.2702 12.0725 11.2125 12.4867 11.2922C12.7061 11.3343 12.9431 11.402 13.1652 11.402C13.3552 11.402 13.6794 11.4294 13.8462 11.4996" stroke="#000000" strokeLinecap="round" />
  <path d="M8.75 7.58825C9.24186 7.58825 9.73004 7.54432 10.2217 7.54432C10.4131 7.54432 10.5978 7.49519 10.7953 7.50039C10.965 7.50485 11.1363 7.58417 11.3079 7.58825C11.4565 7.59179 11.5949 7.55793 11.7155 7.65171C11.7843 7.70526 11.8567 7.7539 11.94 7.78595C12.1536 7.86811 12.3684 7.76398 12.5721 7.76398" stroke="#000000" strokeLinecap="round" />
  <path d="M8.75 3.88184C9.08792 3.88184 9.38864 3.90672 9.71652 3.8794C9.98433 3.85708 10.2483 3.75004 10.5073 3.75004" stroke="white" strokeLinecap="round" />
</svg>


// export const Gesture = () => 

export const NotFound = () => {
  return <div className='flex flex-col justify-center items-center gap-y-[20px]'>
    <div className='w-[116.57px] h-[138.45px]'>
      <LottieNotFound />
    </div>
    <div className='typo-ibmplex text-center'>
      <div className='typo-b4 '>ไม่พบสิ่งที่ค้นหา</div>
      <div className='typo-b6'>ลองตรวจสอบตัวสะกด หรือ หาคำใกล้เคียง</div>
    </div>
  </div>
}