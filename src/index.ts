import filledDocument from "./data/document.json";

export function getDataMember(
  data: any,
  path: string
): { data: any; parentObject: any } {
  const pathName = path.split(/[\.\[\]\'\"]/).filter(Boolean);

  const parentObject = pathName.reduce((acc, curr, index) => {
    if (index === pathName.length - 1) {
      return acc;
    }

    return acc?.[curr];
  }, data);

  const key = pathName.at(-1) ?? "";

  return {
    data: parentObject ? parentObject[key] : undefined,
    parentObject,
  };
}

export function getValue() {
  const filed = "company.address";

  const { data, parentObject } = getDataMember(filledDocument, filed);

  const res = Object.entries(data).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: value,
    };
  }, {});

  console.log(res);
}

console.log("address value", getValue());
