'use client';

import dynamic from 'next/dynamic';
const ModalComponent = dynamic(() => import('antd').then((m) => m.Modal), { ssr: false });
export default ModalComponent;
