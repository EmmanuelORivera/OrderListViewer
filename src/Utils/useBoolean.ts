import { useState } from 'react';
const useBoolean = (initialValue: boolean) => useState<boolean>(initialValue);
export type UseBooleanValue = ReturnType<typeof useBoolean>[0];
export type UseBooleanSetValue = ReturnType<typeof useBoolean>[1];
export default useBoolean;
