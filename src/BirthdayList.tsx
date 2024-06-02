import React from "react";

interface Birthday {
  text: string;
}

interface BirthdayListProps {
  birthdays: Birthday[];
  onAddToFavorites: (birthday: Birthday) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const BirthdayList: React.FC<BirthdayListProps> = ({
  birthdays,
  onAddToFavorites,
  currentPage,
  setCurrentPage,
}) => {
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBirthdays = birthdays.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(birthdays.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {paginatedBirthdays.map((birthday, index) => (
        <div className="Birthday" key={index}>
          <span>{birthday.text}</span>
          <button
            className="AddButton"
            onClick={() => onAddToFavorites(birthday)}
          >
            Add to Favorites
          </button>
        </div>
      ))}
      <div className="Pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(birthdays.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BirthdayList;
