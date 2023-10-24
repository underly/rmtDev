import {
	sortingBtnRecentEl,
	sortingBtnRelevantEl,
	sortingEl,
	state,
} from '../common.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

const clickHandler = (event) => {
	const clickedButtonEl = event.target.closest('.sorting__button');

	if (!clickedButtonEl) return;

	state.currentPage = 1;

	//check if intention is recent --default is relevant
	const recent = clickedButtonEl.className.includes('--recent') ? true : false;

	if (recent) {
		sortingBtnRecentEl.classList.add('sorting__button--active');
		sortingBtnRelevantEl.classList.remove('sorting__button--active');
	} else {
		sortingBtnRecentEl.classList.remove('sorting__button--active');
		sortingBtnRelevantEl.classList.add('sorting__button--active');
	}

	// sort job items
	if (recent) {
		state.searchJobItems.sort((a, b) => {
			return a.daysAgo - b.daysAgo;
		});
	} else {
		state.searchJobItems.sort((a, b) => {
			return b.relevanceScore - a.relevanceScore;
		});
	}

	// reset pagination buttons
	renderPaginationButtons();

	renderJobList();
};

sortingEl.addEventListener('click', clickHandler);
