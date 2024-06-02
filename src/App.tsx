import React, { useState } from "react";
import Calendar from "./Calendar";
import BirthdayList from "./BirthdayList";
import { fetchBirthdays } from "./api";
import "./App.css";

interface Birthday {
  text: string;
}

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedBirthdays, setSelectedBirthdays] = useState<Birthday[]>([]);
  const [favoriteBirthdays, setFavoriteBirthdays] = useState<Birthday[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setCurrentPage(1); // Reset to the first page on date change
    console.log("Selected Date:", date);
    if (date) {
      fetchBirthdays(date).then((birthdays) => setSelectedBirthdays(birthdays));
    }
  };

  const addToFavorites = (birthday: Birthday) => {
    if (!favoriteBirthdays.some((b) => b.text === birthday.text)) {
      console.log("Added to favorites:", birthday.text);
      setFavoriteBirthdays([...favoriteBirthdays, birthday]);
    } else {
      console.log("Birthday already in favorites:", birthday.text);
    }
  };

  const removeFromFavorites = (birthdayToRemove: Birthday) => {
    const updatedFavorites = favoriteBirthdays.filter(
      (birthday) => birthday !== birthdayToRemove
    );
    setFavoriteBirthdays(updatedFavorites);
  };

  return (
    <div className="App">
      <h1>Birthday Calendar</h1>
      <div className="CalendarContainer">
        <Calendar onDateChange={handleDateChange} />
      </div>
      {selectedDate && (
        <div className="BirthdayListContainer">
          <p>Selected Date: {selectedDate.toString()}</p>
          <BirthdayList
            birthdays={selectedBirthdays}
            onAddToFavorites={addToFavorites}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
      {favoriteBirthdays.length > 0 && (
        <div className="FavoriteBirthdaysContainer">
          <h2>Favorite Birthdays</h2>
          {favoriteBirthdays.map((birthday, index) => (
            <div className="Birthday" key={index}>
              <span>{birthday.text}</span>
              <button
                className="DeleteButton"
                onClick={() => removeFromFavorites(birthday)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
