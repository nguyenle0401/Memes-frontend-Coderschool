import * as types from "../constants/meme.constants";
import api from "../api";

let myStorage = window.localStorage;

const memesRequest = (pageNum) => async (dispatch) => {
  dispatch({ type: types.GET_MEMES_REQUEST, payload: null });
  try {
    const res = await api.get(`/memes?page=${pageNum}&perPage=9`);
    dispatch({ type: types.GET_MEMES_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_MEMES_FAILURE, payload: error });
  }
};

const setSelectedMeme = (meme) => (dispatch) => {
  myStorage.setItem('selectedMeme', JSON.stringify(meme))
  dispatch({ type: types.SET_SELECTED_MEME, payload: meme });
};

const setSelectedMemeFromGallery = (meme) => (dispatch) => {
  myStorage.setItem('selectedMeme', JSON.stringify(meme))
  dispatch({ type: types.SET_SELECTED_MEME_FROM_GALLERY, payload: meme });
};

const createMemeRequest = (image) => async (dispatch) => {
  console.log('createMemeRequest')
  dispatch({ type: types.CREATE_MEME_REQUEST, payload: null });
  try {
    const formData = new FormData();
    formData.append("image", image);
    const res = await api.post(`/memes`, formData);
    console.log('res.data.data:', res.data.data)
    dispatch({
      type: types.CREATE_MEME_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_MEME_FAILURE, payload: error });
  }
};

const updateMemeRequest = (texts, memeId) => async (dispatch) => {
  dispatch({ type: types.UPDATE_MEME_REQUEST, payload: null });
  try {
    const body = { texts };
    const res = await api.put(`/memes/${memeId}`, body);
    dispatch({
      type: types.UPDATE_MEME_SUCCESS,
      payload: res.data.data,
    });
    myStorage.removeItem('selectedMeme')
  } catch (error) {
    dispatch({ type: types.UPDATE_MEME_FAILURE, payload: error });
  }
};

export const memeActions = {
  memesRequest, setSelectedMeme, createMemeRequest, updateMemeRequest, setSelectedMemeFromGallery
};