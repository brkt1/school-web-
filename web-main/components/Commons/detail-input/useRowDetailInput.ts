import { useDetailInput } from "./useDetailInput";

export const useRowDetailInput = <T extends { detailInput: ReturnType<typeof useDetailInput>; }>(prop: T) => {
    const detailInput = useDetailInput();
    prop.detailInput = detailInput;
    return prop;
};