import { FilterItem, PatchObject, Sort } from "./types";

export const filtersToAPIFormat = (filters: FilterItem[]) => {
    const processedFilters = filters.filter(
        (filter) => filter.value !== undefined && filter.value !== null
    );
    return JSON.stringify(processedFilters);
};

export const currentPageToAPIRange = (currentPage: number, perPage: number) => {
    const start = currentPage * perPage;
    const end = start + perPage - 1;
    return {
        "range.Start": start,
        "range.End": end,
    };
};

export const sortToAPISort = (sort: Sort) => {
    return {
        "sort.Field": sort.field,
        "sort.IsAscending": sort.isAscending,
    };
};

export const generatePatchObject = (
    initialValues: Record<string, any>,
    newValues: Record<string, any>
): PatchObject[] => {
    const patchObjects: PatchObject[] = [];

    for (const key in newValues) {
        if (newValues.hasOwnProperty(key)) {
            const newValue = newValues[key];
            const initialValue = initialValues[key];

            if (newValue !== initialValue) {
                const patchObject: PatchObject = {
                    path: `/${key}`,
                    op: "replace",
                    value: newValue,
                };
                patchObjects.push(patchObject);
            }
        }
    }

    return patchObjects;
};