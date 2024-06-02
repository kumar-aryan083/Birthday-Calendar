interface Birthday {
  text: string;
}

export const fetchBirthdays = async (date: Date): Promise<Birthday[]> => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/${month}/${day}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    const birthdays = data.births.map((person: any) => ({
      text: `${person.year}: ${person.text} (${
        person.pages[0]?.title || "Unknown"
      })`,
    }));
    return birthdays;
  } catch (error) {
    console.error("Failed to fetch birthdays:", error);
    return [];
  }
};
