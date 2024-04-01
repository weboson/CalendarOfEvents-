//! массив цветов для цветных лекарств в WeekGrid.tsx
import recipesMedications from "./localDataBase/LocalDB_WaysUsing";

 // метод для рандомного цвета
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      // exm: #123456
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  export const arrayColors = ['blue'];
  recipesMedications.map(() => {
    arrayColors.push(getRandomColor())
  })
