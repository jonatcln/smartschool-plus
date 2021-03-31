(function main() {
    const mainContainer = document.getElementById('smscMain');

    const containerObserver = new MutationObserver(() => {
        const gradeGrid = document.querySelector('.eval_grid');

        if (gradeGrid && !gradeGrid.dataset.customized) {
            gradeGrid.dataset.customized = true;
            customizeGradeGrid(gradeGrid);
        }

        const perCourse = document.querySelector('#perCourse > .evalsPerCourse');

        if (perCourse && !perCourse.dataset.customized) {
            perCourse.dataset.customized = true;
            customizePerCourse(perCourse);
        }
    });

    containerObserver.observe(mainContainer, { childList: true, subtree: true });
})();

function customizePerCourse(perCourse) {
    const courseList = perCourse.querySelector('.courseList');

    const innerCourseList = document.createElement('div');
    innerCourseList.classList.add('splus__inner-course-list');
    
    innerCourseList.append(...courseList.childNodes);
    courseList.appendChild(innerCourseList);
}

function customizeGradeGrid(gradeGrid) {
    gradeGrid.querySelectorAll('.course_eval_row').forEach(rowElem => {
        let totalGrade = 0;
        let totalMax = 0;
        
        rowElem.querySelectorAll('.course_eval_cell.hasGrade').forEach(cell => {
            const [gd, md] = cell.innerText.replace(',', '.').split('/').map(x => parseFloat(x));
            if (md) {
                totalGrade += gd;
                totalMax += md;
            }
        });
        
        const totalCell = document.createElement('div');
        totalCell.classList.add('course_eval_cell', 'splus__grades-total-cell');
        totalCell.innerText = totalMax
          ? String(Math.round(totalGrade * 10) / 10).replace(".", ",") + '/' + totalMax
          : '';
        
        const percentCell = document.createElement('div');
        percentCell.classList.add('course_eval_cell', 'splus__grades-percent-cell');
        percentCell.innerText = totalMax ? Math.round(totalGrade * 100 / totalMax) + ' %' : '';

        rowElem.lastElementChild.style.borderRight = 'none';

        rowElem.append(totalCell, percentCell);
        rowElem.style.width = `calc(150px + ${rowElem.style.width})`;
    });
}
