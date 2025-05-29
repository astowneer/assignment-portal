function mapObjectsToOptions<T>(
  items: T[],
  getValue: (item: T) => string,
  getLabel: (item: T) => string = getValue
) {
  return items.map((item) => ({
    value: getValue(item),
    label: getLabel(item),
  }));
}

export { mapObjectsToOptions };
