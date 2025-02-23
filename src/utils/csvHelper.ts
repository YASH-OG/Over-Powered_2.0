export const parseMenuCSV = (csvText: string): Partial<MenuItem>[] => {
  const lines = csvText.split('\n');
  const items: Partial<MenuItem>[] = [];
  
  // Skip header row
  const headers = lines[0].split(',');
  
  // Process each data row
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    if (row.length < 6) continue; // Skip incomplete rows
    
    const item: Partial<MenuItem> = {
      name: row[0]?.trim(),
      category: row[1]?.trim(),
      subCategory: row[2]?.trim(),
      tax: parseFloat(row[3]?.trim() || '0'),
      packagingCharge: parseFloat(row[4]?.trim() || '0'),
      productCost: parseFloat(row[5]?.trim() || '0'),
    };
    
    // Only add if all required fields are present
    if (item.name && item.category && item.subCategory) {
      items.push(item);
    }
  }
  
  return items;
};