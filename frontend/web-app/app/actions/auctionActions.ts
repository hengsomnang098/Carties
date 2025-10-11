'use server';
export async function getData(pageNumber: number, pageSize: number) {
  const res = await fetch(`http://localhost:6001/search?pageSize=${pageSize}&pageNumber=${pageNumber}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }

  return res.json();
}
