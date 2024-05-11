export async function dataFetch(data) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${data}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log("Fatal error " + err);
  }
}
