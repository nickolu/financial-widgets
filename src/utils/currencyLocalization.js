export const currencyLocalization = (value, locale) => {
    value = String(value).replace(/\$/g, "");
    value = value.replace(/-/g, "");
    const isNegative = value < 0;

    if (locale === "en-us") {
        value = value.split(".");
        const negativeMark = isNegative ? "-" : "";
        return value.length > 1
            ? `${negativeMark}$${value[0]}.${value[1]}`
            : `${negativeMark}$${value[0]}`;
    }
};
