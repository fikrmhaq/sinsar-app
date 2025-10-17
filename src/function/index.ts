function findMatchingRecords(array: any, searchString: any) {
  const lowerSearch = searchString.toLowerCase();

  return array.filter((obj: any) =>
    Object.values(obj).some(val =>
      String(val).toLowerCase().includes(lowerSearch)
    )
  );
}

export {
    findMatchingRecords
}