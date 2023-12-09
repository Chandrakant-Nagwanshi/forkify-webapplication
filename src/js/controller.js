import * as model from './model.js';
import { MODEL_CLOSE_SEC } from './config.js';
import 'core-js/stable'; //for polyfilling everrything
import 'regenerator-runtime/runtime'; //for pollyfilling async await
import recipeView from './views/recipeViews.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// if (module.hot) {
//   module.hot.accept();
// }
// https://forkify-api.herokuapp.com/v2

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    //0.updte results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    if (!id) return;
    recipeView.renderSpinner();

    // 1).Loading recipe
    await model.loadRecipe(id);

    // 2.rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //1.Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2. Load search results
    await model.loadSearchResults(query);

    //3.render results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4. render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  //1.render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newservings) {
  // 1.update recipe servings (in sate)
  model.updateServings(newservings);

  //update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 0.update/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //1. update recipeView
  recipeView.update(model.state.recipe);

  //2.render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //0 add a spinner
    addRecipeView.renderSpinner();

    // upload new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render new recipe
    recipeView.render(model.state.recipe);

    // sucess message
    addRecipeView.renderMessage();

    // render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('🔥', err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
